import Chart from "./chart/Chart";
import LineChart from "./chart/LineChart";
import StackAreaChart from "./chart/StackAreaChart";
import XYAxisChart from "./chart/XYAxisChart";

export default class Application {
    constructor(props) {
        this._init();
    }

    _init() {
        const width = 600;
        const height = 700;
        this.$tile = $(`<div class=tile width=${width} height=${height} />`);
        this.$top = $(`<div class=top />`);
        this.$bottom = $(`<div class=bottom />`);
        $("body").append(this.$tile);
        this.$tile.append(this.$top);
        this.$tile.append(this.$bottom);
    }

    run() {
        console.log("The application is running now ...");

        // this._displayLineChart();
        this._displayStackAreaChart();

    }

    _displayLineChart() {
        const data = [
            { month: 0, value: 2 },
            { month: 1, value: 4 },
            { month: 2, value: 5 },
            { month: 3, value: 6 },
            { month: 4, value: 6 },
            { month: 5, value: 9 },
            { month: 6, value: 6 },
            { month: 7, value: 4 },
            { month: 8, value: 3 },
            { month: 9, value: 0 },
            { month: 10, value: 4 },
            { month: 11, value: 6 },
            { month: 12, value: 3 }
        ];

        const lineChart = new LineChart({
            id: "xyAxisChart",
            width: 600,
            height: 350,
            padding: {
                top: 20,
                right: 20,
                bottom: 30,
                left: 30
            },
            domainX: [0, 12],
            domainY: [0, 10],
            data,
            xPath: "month",
            yPath: "value"
        });

        lineChart.render();
        this.$top.append(lineChart.$element);

        setTimeout(() => {
            data[5]["value"] = 6;
            data[9]["value"] = 2;

            lineChart.render();
        }, 1000);
    }

    _displayStackAreaChart() {
        const rawData = [
            { month: 0, a: 10, b: 50, c: 40 },
            { month: 1, a: 20, b: 40, c: 40 },
            { month: 2, a: 40, b: 10, c: 50 },
            { month: 3, a: 30, b: 30, c: 40 },
            { month: 4, a: 20, b: 50, c: 30 },
            { month: 5, a: 25, b: 45, c: 30 },
            { month: 6, a: 45, b: 20, c: 35 },
            { month: 7, a: 20, b: 55, c: 25 },
            { month: 8, a: 10, b: 45, c: 45 },
            { month: 9, a: 30, b: 30, c: 40 },
            { month: 10, a: 35, b: 20, c: 45 },
            { month: 11, a: 30, b: 20, c: 50 },
            { month: 12, a: 35, b: 20, c: 45 }
        ];
        const data = this._dataPreprocess(rawData);
        const stackAreaChart = new StackAreaChart({
            id: "xyAxisChart",
            width: 600,
            height: 350,
            padding: {
                top: 20,
                right: 20,
                bottom: 30,
                left: 30
            },
            domainX: [0, 12],
            domainY: [0, 100],
            data,
        });

        stackAreaChart.render();
        this.$top.append(stackAreaChart.$element);
    }

    _dataPreprocess(data) {
        const aPath = "a";
        const bPath = "b";
        const cPath = "c";
        const result = [
            {
                name: aPath,
                values: [],
            },
            {
                name: bPath,
                values: [],
            },
            {
                name: cPath,
                values: [],
            }
        ];
        data.forEach(item => {
            result[0].values.push({
                x: item.month,
                y: item[aPath]
            });
            result[1].values.push({
                x: item.month,
                y: item[bPath]
            });
            result[2].values.push({
                x: item.month,
                y: item[cPath]
            });
        });

        return result;
    }
}
