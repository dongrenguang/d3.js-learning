export default class Chart {
    constructor(props) {
        this.width = props.width;
        this.height = props.height;
        this.margin = props.margin;
        this.initData = props.initData;
        this.data = props.data;

        this._init();
        this._renderAxes();
        this._renderBody();
    }

    _init() {
        this._initScales();
        this.axisX = d3.svg.axis()
            .scale(this.scaleX)
            .orient("bottom");
        this.axisY = d3.svg.axis()
            .scale(this.scaleY)
            .orient("left");
        this.line = d3.svg.line()
            .interpolate("cardinal")
            .tension(0.9)
            .x(d => this.scaleX(d[this.xPath]))
            .y(d => this.scaleY(d[this.yPath]));

        this.svg = d3.select("body").append("svg")
            .style("width", this.width)
            .style("height", this.height)
            .style("background-color", "rgba(0, 0, 0, 0.1)");
    }

    _initScales() {
        this.scaleX = d3.scale.linear().domain(d3.extent(this.data, item => item[this.xPath])).range([ 0, this.width - this.margin.right - this.margin.left ]);
        this.scaleY = d3.scale.linear().domain(d3.extent(this.data, item => item[this.yPath])).range([ this.height - this.margin.bottom - this.margin.top, 0 ]);
    }

    _renderAxes() {
        this._renderAxisX();
        this._renderAxisY();
    }

    _renderAxisX() {
        if (this.axisXGroup === undefined) {
            this.axisXGroup = this.svg.append("g")
                .classed("axis axis-x", true)
                .attr("transform", `translate(${this.margin.left}, ${this.height - this.margin.bottom})`);
        }

        this.scaleX.domain(d3.extent(this.data, item => item[this.xPath]));
        this.axisXGroup.transition().duration(600).call(this.axisX);
    }

    _renderAxisY() {
        if (this.axisYGroup === undefined) {
            this.axisYGroup = this.svg.append("g")
                .classed("axis axis-y", true)
                .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);
        }

        this.scaleY.domain(d3.extent(this.data, item => item[this.yPath]));
        this.axisYGroup.transition().duration(600).call(this.axisY);
    }

    _renderBody() {
        this.bodyGroup = this.svg.append("g")
            .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)
            .classed("svg-body", true);
    }
}
