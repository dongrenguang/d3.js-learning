import Chart from "./Chart";

export default class LineChart extends Chart {
    constructor(props) {
        super(props);

        this.xPath = props.xPath;
        this.yPath = props.yPath;
        this.render();
    }

    render() {
        this._renderLine();
    }

    _renderLine() {
        if (this.linePath === undefined) {
            this.linePath = this.bodyGroup.append("path")
                .classed("line", true)
                .datum(this.data);
        }

        super._renderAxisX();
        super._renderAxisY();

        this.linePath
            .transition()
            .duration(600)
                .attr("d", this.line);
    }
}
