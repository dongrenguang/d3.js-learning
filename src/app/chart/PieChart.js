import Chart from "./Chart";

export default class PieChart extends Chart {
    constructor(props) {
        super(props);
        this.data = props.data;
        this.labelPath = props.labelPath;
        this.valuePath = props.valuePath;
    }

    _init() {
        super._init();

        this.contentWidth = this.width - this.padding.left - this.padding.right;
        this.contentHeight = this.height - this.padding.top - this.padding.bottom;

        this.radius = Math.min(this.contentWidth, this.contentHeight) / 2;
        this.colorScale = d3.scale.category10();
        this.arc = d3.svg.arc()
            .outerRadius(this.radius)
            .innerRadius(this.radius * 0.5);
        this.pie = d3.layout.pie()
            .sort(null)
            .value(d => d[this.valuePath]);

    }

    render() {
        super.render();
        this._renderPie();
        this._renderLabel();
    }

    _renderPie() {
        if (this.pieGroup === undefined) {
            this.pieGroup = this.contentGroup
                .append("g")
                    .classed("pie-group", true)
                    .attr("transform", `translate(${(this.width - this.padding.left - this.padding.right) / 2}, ${(this.height - this.padding.top - this.padding.bottom) / 2})`);
        }

        this.arcPaths = this.pieGroup
            .selectAll("path.arc")
            .data(this.pie(this.data), d => d.data[this.labelPath]);

        this.arcPaths
            .enter()
            .append("path")
                .classed("arc", true);

        this.arcPaths.exit().remove();

        const self = this;
        this.arcPaths
            .style("fill", (d, i) => this.colorScale(i))
            .transition()
            .attrTween("d", function(d) {
                this._current = this._current || d;
    			var interpolate = d3.interpolate(this._current, d);
    			this._current = interpolate(0);
    			return function(t) {
    				return self.arc(interpolate(t));
    			};
            });
    }

    _renderLabel() {
        if (this.labelGroup === undefined) {
            this.labelGroup = this.contentGroup
                .append("g")
                .classed("label-group", true)
                .attr("transform", `translate(${(this.width - this.padding.left - this.padding.right) / 2}, ${(this.height - this.padding.top - this.padding.bottom) / 2})`);
        }

        this.texts = this.labelGroup
            .selectAll("text.label")
            .data(this.pie(this.data), d => d.data[this.labelPath]);

        this.texts
            .enter()
            .append("text")
                .classed("label", true);

        this.texts.exit().remove();

        this.texts
            .style("fill", "white")
            .transition()
            .attr("transform", d => `translate(${this.arc.centroid(d)})`)
            .attr("dy", ".35em")
            .style("font-size", "20px")
            .text(d => d.data[this.labelPath]);
    }
}
