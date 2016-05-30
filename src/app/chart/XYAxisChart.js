import Chart from "./Chart";

export default class XYAxisChart extends Chart {
    constructor(props) {
        super(props);
        this.domainX = props.domainX;
        this.domainY = props.domainY;
    }

    render() {
        super.render();
    }

    _init() {
        super._init();
        this._initScales();
        this._initAxes();
        this._initBody();
    }

    _initScales() {
        this.scaleX = d3.scale.linear().domain(this.domainX).range([ 0, this.width - this.padding.right - this.padding.left ]);
        this.scaleY = d3.scale.linear().domain(this.domainY).range([ this.height - this.padding.bottom - this.padding.top, 0 ]);
    }

    _initAxes() {
        this._initAxisX();
        this._initAxisY();
    }

    _initAxisX() {
        this.axisX = d3.svg.axis()
            .scale(this.scaleX)
            .orient("bottom");
        if (this.axisXGroup === undefined) {
            this.axisXGroup = this.contentGroup.append("g")
                .classed("axis axis-x", true)
                .attr("transform", `translate(0, ${this.height - this.padding.bottom - this.padding.top})`);
        }

        this.axisXGroup.transition().duration(600).call(this.axisX);
    }

    _initAxisY() {
        this.axisY = d3.svg.axis()
            .scale(this.scaleY)
            .orient("left");
        if (this.axisYGroup === undefined) {
            this.axisYGroup = this.contentGroup.append("g")
                .classed("axis axis-y", true);
        }

        this.axisYGroup.transition().duration(600).call(this.axisY);
    }

    _initBody() {
        this.bodyGroup = this.contentGroup.append("g")
            .classed("body-group", true);
    }
}
