import LineChart from "./chart/LineChart";

export default class Application {
    run() {
        console.log("The application is running now ...");

        const lineChart = new LineChart();
        lineChart.render();
    }
}
