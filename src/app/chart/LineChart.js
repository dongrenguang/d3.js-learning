export default class LineChart {
    constructor(props) {

    }

    render() {
        const margin = { top: 20, right: 20, bottom: 30, left: 50 };
        const width = 960 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        const x = d3.scale.linear().range([0, width]);
        const y = d3.scale.linear().range([height, 0]);

        const xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        const yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        const line = d3.svg.line()
            .x(d => x(d.month))
            .y(d => y(d.value));

        const svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .attr("class", "line-chart");

        const data = [
            { month: 0, value: 2},
            { month: 1, value: 4},
            { month: 2, value: 5},
            { month: 3, value: 6},
            { month: 4, value: 7},
            { month: 5, value: 9},
            { month: 6, value: 6},
            { month: 7, value: 4},
            { month: 8, value: 3},
            { month: 9, value: 1},
            { month: 10, value: 4},
            { month: 11, value: 6},
            { month: 12, value: 3}
        ];

        x.domain([0, 12]);
        y.domain([10, 0]);

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

        svg.append("path")
          .datum(data)
          .attr("class", "line")
          .attr("d", line);
    }
}
