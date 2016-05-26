import LineChart from "./chart/LineChart";

export default class Application {
    run() {
        console.log("The application is running now ...");

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
