import PieChart from "./PieChart";

export default class ABCPieChart extends PieChart {
    constructor(props) {
        super(props);
    }

    _renderLabels() {
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
            .attr("text-anchor", "middle")
            .attr("dy", "0.4em")
            .style("font-size", "18px")
            .text(d => `${d.data[this.labelPath]}, ${d.data[this.valuePath]}%`);
    }
}
