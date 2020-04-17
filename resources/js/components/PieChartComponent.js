import React, { Component } from "react";
//import {Bar, Line, Pie} from 'react-chartjs-2';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import listExpenses from "./ListExpenses";
import { Doughnut } from "react-chartjs-2";
/*
class pieChartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: props.p
        };
    }
    componentDidMount() {
        console.log(this.state.chartData);
        var chart = am4core.create("chartdiv", am4charts.PieChart);
        chart.paddingRight = 20;
        chart.data = this.state.chartData;
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "total_sales";
        pieSeries.dataFields.category = "cat_name";
    }
    render() {
        return <div id="chartdiv" style={{ width: "100%", height: "400px" }} />;
    }
}
export default pieChartComponent;
*/

export default class PieChartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: {}
        };
    }

    componentDidMount() {
        axios.get("/expenses").then(res => {
            const dataResponse = res.data;
            let expense = [];
            let categories = [];
            console.log("test", res.data);
            dataResponse.forEach(element => {
                expense.push(element.category_id);
                categories.push(element.amount);
            });
            console.log("test", res);
            this.setState({
                Data: {
                    labels: expense,
                    datasets: [
                        {
                            label: "Champions League 2017/2018 Top Scorer",
                            data: categories,
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
    render() {
        return (
            <div>
                <Pie
                    data={this.state.Data}
                    options={{ maintainAspectRatio: false }}
                />
            </div>
        );
    }
}
