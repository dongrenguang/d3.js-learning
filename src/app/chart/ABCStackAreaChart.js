import StackAreaChart from "./StackAreaChart";

export default class ABCStackAreaChart extends StackAreaChart {
    constructor(props) {
        super(props);
        this.onSvgClick = props.onSvgClick;
    }

    render() {
        super.render();
        this._renderLabel();
        this._renderIndicator();
    }

    _init() {
        super._init();
        this.svg.on("mousemove", () => {
            const position = d3.mouse(this.svg.node());
            if (position[0] > this.padding.left && position[0] < this.width - this.padding.right &&
                position[1] > this.padding.top && position[1] < this.height - this.padding.bottom)
            {
                this._renderActiveLine(position);
            }
            else
            {
                this._renderActiveLine(null);
            }
        });

        this.svg.on("mousedown", () => {
            const position = d3.mouse(this.svg.node());
            if (position[0] > this.padding.left && position[0] < this.width - this.padding.right &&
                position[1] > this.padding.top && position[1] < this.height - this.padding.bottom)
            {
                this._renderStableLine(position);
                const percents = this._getNearestValue(position);
                if (this.onSvgClick && (typeof this.onSvgClick === "function")) {
                    this.onSvgClick(percents);
                }
            }
        });
    }

    _getNearestValue(position) {
        const xPosition = position[0];
        const xIndex = this.scaleX.invert(xPosition - this.padding.left);
        const nearestX = Math.round(xIndex);
        const result = [];
        for (let strip of this.data) {
            for (let value of strip.values) {
                if (value.x === nearestX) {
                    result.push({
                        name: strip.name,
                        percent: value.y
                    });
                    break;
                }
            }
        }

        return result;
    }

    _renderLabel() {
        if (this.labelGroup === undefined) {
            this.labelGroup = this.bodyGroup.append("g").classed("label-group", true);
        }

        this.labelTexts = this.labelGroup
            .selectAll("text.label")
            .data(this.data);

        this.labelTexts
            .enter()
            .append("text")
                .classed("label", true);

        this.labelTexts.exit().remove();

        const positions = [];
        for (let strip of this.data) {
            positions.push((strip.values[0]["y"] + 2 * strip.values[0]["y0"]) / 2);
        }

        this.labelTexts
            .text(d => d.name)
            .style("font-size", 20)
            .style("stroke", null)
            .style("fill", "white")
            .attr("dy", "0.4em")
            .attr("transform", (d, i) => `translate(10, ${this.scaleY(positions[i])})`);
    }

    _renderActiveLine(position) {
        if (this.activeLine === undefined) {
            this.activeLine = this.indicatorGroup.append("line").classed("active-line", true);
        }

        if (position) {
            this.activeLine
                .attr("x1", position[0] - this.padding.left)
                .attr("y1", this.height - this.padding.bottom - this.padding.top)
                .attr("x2", position[0] - this.padding.left)
                .attr("y2", 0)
                .style("stroke", "white")
                .style("stroke-width", 1)
                .style("opacity", 0.9);
        }
        else {
            this.activeLine
                .style("opacity", 0);
        }
    }

    _renderStableLine(position) {
        if (this.stableLine === undefined) {
            this.stableLine = this.indicatorGroup.append("line").classed("stable-line", true);
        }

        this.stableLine
            .transition()
            .attr("x1", position[0] - this.padding.left)
            .attr("y1", this.height - this.padding.bottom - this.padding.top)
            .attr("x2", position[0] - this.padding.left)
            .attr("y2", 0)
            .style("stroke", "white")
            .style("stroke-width", 2);
    }

    _renderIndicator() {
        if (this.indicatorGroup === undefined) {
            this.indicatorGroup = this.bodyGroup.append("g").classed("indicator-group", true);
        }
    }
}
