import StackAreaChart from "./StackAreaChart";

export default class ABCStackAreaChart extends StackAreaChart {
    constructor(props) {
        super(props);
        this.onSvgClick = props.onSvgClick;
    }

    render() {
        super.render();
        // this._renderTitles();
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

    _renderTitles() {
        if (this.titleGroup === undefined) {
            this.titleGroup = this.contentGroup.append("g").classed("title-group", true);
        }

        this.titleTexts = this.titleGroup
            .selectAll("text.title")
            .data(this.data);

        this.titleTexts
            .enter()
            .append("text")
                .classed("title", true);

        this.titleTexts.exit().remove();

        this.titleTexts
            .text(d => d.name)
            .style("font-size", 20)
            .style("stroke", null)
            .style("fill", "white")
            .attr("transform", (d, i) => `translate(20, 50)`);
    }

    _renderActiveLine(position) {
        if (this.activeLine === undefined) {
            this.activeLine = this.contentGroup.append("line").classed("active-line", true);
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
            this.stableLine = this.contentGroup.append("line").classed("stable-line", true);
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
}
