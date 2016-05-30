import LineChart from "./chart/LineChart";
import PieChart from "./chart/PieChart";
import StackAreaChart from "./chart/StackAreaChart";

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

        this._displayPieChart();
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
            id: "lineChart",
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
            { month: 0, A: 10, B: 50, C: 40 },
            { month: 1, A: 20, B: 40, C: 40 },
            { month: 2, A: 40, B: 10, C: 50 },
            { month: 3, A: 30, B: 30, C: 40 },
            { month: 4, A: 20, B: 50, C: 30 },
            { month: 5, A: 25, B: 45, C: 30 },
            { month: 6, A: 45, B: 20, C: 35 },
            { month: 7, A: 20, B: 55, C: 25 },
            { month: 8, A: 10, B: 45, C: 45 },
            { month: 9, A: 30, B: 30, C: 40 },
            { month: 10, A: 35, B: 20, C: 45 },
            { month: 11, A: 30, B: 20, C: 50 },
            { month: 12, A: 35, B: 20, C: 45 }
        ];
        const data = this._dataPreprocess(rawData);
        const stackAreaChart = new StackAreaChart({
            id: "stackAreaChart",
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
        const aPath = "A";
        const bPath = "B";
        const cPath = "C";
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

    _displayPieChart() {
        const data = [
            {
                name: "A",
                percent: 50
            },
            {
                name: "B",
                percent: 20
            },
            {
                name: "C",
                percent: 30
            }
        ];
        const pieChart = new PieChart({
            id: "pieChart",
            width: 600,
            height: 350,
            padding: {
                top: 20,
                right: 20,
                bottom: 30,
                left: 30
            },
            data,
            titlePath: "name",
            valuePath: "percent"
        });

        pieChart.render();
        this.$bottom.append(pieChart.$element);

        setTimeout(() => {
            data[0]["percent"] = 40;
            data[1]["percent"] = 40;
            data[2]["percent"] = 20;

            pieChart.render();
        }, 1000);
    }
}
