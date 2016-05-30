import StackAreaChart from "./StackAreaChart";

export default class ABCStackAreaChart extends StackAreaChart {
    constructor(props) {
        super(props);
    }

    render() {
        super.render();
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
            console.log("mousedown");
            const position = d3.mouse(this.svg.node());
            if (position[0] > this.padding.left && position[0] < this.width - this.padding.right &&
                position[1] > this.padding.top && position[1] < this.height - this.padding.bottom)
            {
                this._renderStableLine(position);
            }
        });
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
