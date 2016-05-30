import XYAxisChart from "./XYAxisChart";

export default class LineChart extends XYAxisChart {
    constructor(props) {
        super(props);
        this.data = props.data;
        this.xPath = props.xPath;
        this.yPath = props.yPath;
    }

    render() {
        super.render();
        this._renderLine();
    }

    _init() {
        super._init();

        this.line = d3.svg.line()
            .interpolate("cardinal")
            .tension(0.9)
            .x(d => this.scaleX(d[this.xPath]))
            .y(d => this.scaleY(d[this.yPath]));

    }

    _renderLine() {
        if (this.linePath === undefined) {
            this.linePath = this.bodyGroup.append("path")
                .classed("line", true)
                .datum(this.data);
        }

        this.linePath
            .transition()
            .duration(600)
                .attr("d", this.line);
    }
}
