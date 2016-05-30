import LineChart from "./chart/LineChart";
import StackAreaChart from "./chart/StackAreaChart";

export default class Application {
    run() {
        console.log("The application is running now ...");

        this._displayStackAreaChart();
    }

    _displayStackAreaChart() {
        const data = [
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
        const stackAreaChart = new StackAreaChart({
            width: 700,
            height: 400,
            margin: { top: 20, right: 20, bottom: 30, left: 50 },
            data,
        });
    }

    _displayLineChart() {
        const initData = [
            { month: 0, value: 5 },
            { month: 1, value: 5 },
            { month: 2, value: 5 },
            { month: 3, value: 5 },
            { month: 4, value: 5 },
            { month: 5, value: 5 },
            { month: 6, value: 5 },
            { month: 7, value: 5 },
            { month: 8, value: 5 },
            { month: 9, value: 5 },
            { month: 10, value: 5 },
            { month: 11, value: 5 },
            { month: 12, value: 5 }
        ];
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
            width: 700,
            height: 400,
            margin: { top: 20, right: 30, bottom: 20, left: 30 },
            initData,
            data,
            xPath: "month",
            yPath: "value"
        });

        setTimeout(() => {
            data[5]["value"] = 6;
            data[9]["value"] = 2;

            lineChart.render();
        }, 1000);
    }
}
