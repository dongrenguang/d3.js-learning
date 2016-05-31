import StackAreaChart from "./StackAreaChart";

export default class ABCStackAreaChart extends StackAreaChart {
    constructor(props) {
        super(props);
        this.onSvgClick = props.onSvgClick;
    }

    render() {
        super.render();
        this._renderLabels();
    }

    _init() {
        super._init();
        this.svg.on("mousemove", () => {
            const position = d3.mouse(this.svg.node());
            if (position[0] > this.padding.left && position[0] < this.width - this.padding.right &&
                position[1] > this.padding.top && position[1] < this.height - this.padding.bottom)
            {
                this._renderActiveLine(position);

                const [values, positions] = this._getNearestValue(position);
                this._renderActiveTips([values, positions]);
            }
            else
            {
                this._renderActiveLine(null);
                this._renderActiveTips([null, null]);
            }
        });

        this.svg.on("mousedown", () => {
            const position = d3.mouse(this.svg.node());
            if (position[0] > this.padding.left && position[0] < this.width - this.padding.right &&
                position[1] > this.padding.top && position[1] < this.height - this.padding.bottom)
            {
                this._renderStableLine(position);

                const [values, positions] = this._getNearestValue(position);
                this._renderStableTips([values, positions]);
                if (this.onSvgClick && (typeof this.onSvgClick === "function")) {
                    this.onSvgClick(values);
                }
            }
        });
    }

    _getNearestValue(position) {
        const xPosition = position[0];
        const xIndex = this.scaleX.invert(xPosition - this.padding.left);
        const nearestX = Math.round(xIndex);
        const values = [];
        const positions = [];
        for (let strip of this.data) {
            for (let value of strip.values) {
                if (value.x === nearestX) {
                    values.push(value.y);
                    positions.push({
                        x: xIndex,
                        y: (value.y + 2 * value.y0) / 2
                    });
                    break;
                }
            }
        }

        return [values, positions];
    }

    _renderLabels() {
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
        if (this.activeGroup === undefined) {
            this.activeGroup = this.bodyGroup.append("g").classed("active-group", true);
            this.activeLine = this.activeGroup.append("line").classed("active-line", true);
        }

        if (position) {
            this.activeLine
                .attr("x1", position[0] - this.padding.left)
                .attr("y1", this.height - this.padding.bottom - this.padding.top)
                .attr("x2", position[0] - this.padding.left)
                .attr("y2", 0)
                .style("stroke", "white")
                .style("stroke-width", 2)
                .style("opacity", 0.7);
        }
        else {
            this.activeLine
                .style("opacity", 0);
        }
    }

    _renderStableLine(position) {
        if (this.stableGroup === undefined) {
            this.stableGroup = this.bodyGroup.append("g").classed("stable-group", true);
            this.stableLine = this.stableGroup.append("line").classed("stable-line", true);
        }

        this.stableLine
            .style("stroke", "white")
            .style("stroke-width", 2)
            .transition()
            .attr("x1", position[0] - this.padding.left)
            .attr("y1", this.height - this.padding.bottom - this.padding.top)
            .attr("x2", position[0] - this.padding.left)
            .attr("y2", 0);
    }

    _renderActiveTips([values, positions]) {
        if (this.activeGroup && values && positions) {
            this.activeTipTexts = this.activeGroup
                .selectAll("text.tip")
                .data(this.data);

            this.activeTipTexts
                .enter()
                .append("text")
                .classed("tip", true);

            this.activeTipTexts
                .text((d, i) => `${values[i]}%`)
                .style("font-size", 16)
                .style("stroke", null)
                .style("fill", "black")
                .style("opacity", 0.7)
                .attr("dx", "0.2em")
                .attr("dy", "0.4em")
                .attr("transform", (d, i) => `translate(${this.scaleX(positions[i]["x"])}, ${this.scaleY(positions[i]["y"])})`);
        }
        else if (this.activeTipTexts){
            this.activeTipTexts
                .style("opacity", 0);
        }
    }

    _renderStableTips([values, positions]) {
        if (this.stableGroup && values && positions) {
            this.stableTipTexts = this.stableGroup
                .selectAll("text.tip")
                .data(this.data);

            this.stableTipTexts
                .enter()
                .append("text")
                .classed("tip", true);

            this.stableTipTexts
                .text((d, i) => `${values[i]}%`)
                .style("font-size", 16)
                .style("stroke", null)
                .style("fill", "black")
                .attr("dx", "0.2em")
                .attr("dy", "0.4em")
                .transition()
                .attr("transform", (d, i) => `translate(${this.scaleX(positions[i]["x"])}, ${this.scaleY(positions[i]["y"])})`);
        }
    }
}
