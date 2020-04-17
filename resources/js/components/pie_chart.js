import React, { Component } from "react";
//import {Bar, Line, Pie} from 'react-chartjs-2';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

class pie_chart extends Component {
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
export default pie_chart;
