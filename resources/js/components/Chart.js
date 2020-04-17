import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: [],
            datasets: [],

            chartData: {
                // labels: ["tsets", "yui", "fgh", "hjl", "asd"],
                // datasets: [
                //     {
                //         //label: "Population",
                //         data: [32123, 35435, 35413, 54254, 32156]
                //         // backgroud: [
                //         //     "rgba(255,99,132,0.6)",
                //         //     "rgba(54,63,54,0.6)",
                //         //     "rgba(75,05,11,0.6)",
                //         //     "rgba(153,102,134,0.6)",
                //         //     "rgba(255,44,147,0.6)"
                //         // ]
                //     }
                // ]
            }
        };
    }

    getExpenses() {
        axios.get("/pie").then(response => {
            const expenseCategory = response.data.pie;
            let cat_name = [];
            let total_sales = [];
            console.log(expenseCategory);
            expenseCategory.forEach(element => {
                cat_name.push(element.cat_name);
                total_sales.push(element.total_sales);
            });
            this.setState({
                chartData: {
                    labels: cat_name,
                    datasets: [
                        {
                            label: "Champions League 2017/2018 Top Scorer",
                            data: total_sales,
                            backgroundColor: [
                                "rgba(255,105,145,0.6)",
                                "rgba(155,100,210,0.6)",
                                "rgba(90,178,255,0.6)",
                                "rgba(240,134,67,0.6)",
                                "rgba(120,120,120,0.6)",
                                "rgba(250,55,197,0.6)"
                            ]
                        }
                    ]
                }
            });
        });
    }

    refreshTable() {
        this.componentDidMount();
    }
    // lifecycle method
    componentDidMount() {
        this.getExpenses();
    }

    render() {
        return (
            <div className="chart">
                <Pie
                    data={this.state.chartData}
                    width={100}
                    height={50}
                    options={{
                        title: {
                            display: true,
                            text: "Largests test"
                        },
                        legend: {
                            display: true,
                            position: "right"
                        }
                    }}
                />
            </div>
        );
    }
}

export default Chart;
