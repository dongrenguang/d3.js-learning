import XYAxisChart from "./XYAxisChart";

export default class StackAreaChart extends XYAxisChart {
    constructor(props) {
        super(props);
        this.data = props.data;
    }

    render() {
        super.render();
        this._renderStackAreaChart();
    }

    _init() {
        super._init();
        this.area = d3.svg.area()
            .interpolate("cardinal")
            .tension(0.5)
            .x(d => this.scaleX(d.x))
            .y0(d => this.scaleY(d.y0))
            .y1(d => this.scaleY(d.y0 + d.y));

        this.areaStack =d3.layout.stack()
            .values(d => d.values);

        this.colorScale = d3.scale.category10();
    }

    _renderStackAreaChart() {
        if (this.stackPath === undefined) {
            this.stackPath = this.bodyGroup
                .selectAll("path")
                .data(this.areaStack(this.data))
                .enter()
                .append("path")
                    .attr("class", item => `area ${item.name}`);
        }

        this.stackPath
            .attr("d", d => this.area(d.values))
            .style("fill", (d, i) => this.colorScale(i));
    }
}
