import Chart from "./Chart";

export default class StackAreaChart extends Chart {
    constructor(props) {
        super(props);

        this.render();
    }

    render() {
        this._renderStackAreaChart();
    }

    _init() {
        super._init();
        this.area = d3.svg.area()
            .x(d => this.scaleX(d.x))
            .y0(d => this.scaleY(d.y0))
            .y1(d => this.scaleY(d.y0 + d.y));

        this.areaStack =d3.layout.stack()
            .values(d => d.values);

        this.colorScale = d3.scale.category10();
    }

    _renderStackAreaChart() {
        const formatData = this._dataProcess(this.data);
        if (this.stackPath === undefined) {
            this.stackPath = this.bodyGroup
                .selectAll("path")
                .data(this.areaStack(formatData))
                .enter()
                .append("path")
                    .attr("class", item => `area ${item.name}`);
        }

        this.stackPath
            .attr("d", d => this.area(d.values))
            .style("fill", (d, i) => this.colorScale(i));
    }

    _dataProcess(data) {
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

    _initScales() {
        this.scaleX = d3.scale.linear().domain([0, 12]).range([ 0, this.width - this.margin.right - this.margin.left ]);
        this.scaleY = d3.scale.linear().domain([0, 100]).range([ this.height - this.margin.bottom - this.margin.top, 0 ]);
    }

    _renderAxisX() {
        if (this.axisXGroup === undefined) {
            this.axisXGroup = this.svg.append("g")
                .classed("axis axis-x", true)
                .attr("transform", `translate(${this.margin.left}, ${this.height - this.margin.bottom})`);
        }

        this.axisXGroup.transition().duration(600).call(this.axisX);
    }

    _renderAxisY() {
        if (this.axisYGroup === undefined) {
            this.axisYGroup = this.svg.append("g")
                .classed("axis axis-y", true)
                .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);
        }

        this.axisYGroup.transition().duration(600).call(this.axisY);
    }
}
