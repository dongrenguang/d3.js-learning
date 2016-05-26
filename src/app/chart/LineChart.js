export default class LineChart {
    constructor(props) {
        this.width = props.width;
        this.height = props.height;
        this.margin = props.margin;
        this.initData = props.initData;
        this.data = props.data;
        this.xPath = props.xPath;
        this.yPath = props.yPath;

        this._init();
        this._renderAxes();
        this._renderBody();
        this.render();
    }

    render() {
        this._renderLine();
    }

    _init() {
        this.scaleX = d3.scale.linear().domain(d3.extent(this.data, item => item[this.xPath])).range([ 0, this.width - this.margin.right - this.margin.left ]);
        this.scaleY = d3.scale.linear().domain(d3.extent(this.data, item => item[this.yPath])).range([ this.height - this.margin.bottom - this.margin.top, 0 ]);
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

    _renderAxes() {
        this._renderAxisX();
        this._renderAxisY();
    }

    _renderAxisX() {
        this.scaleX.domain(d3.extent(this.data, item => item[this.xPath]));
        if (this.axisXGroup === undefined) {
            this.axisXGroup = this.svg.append("g")
                .classed("axis axisX", true)
                .attr("transform", `translate(${this.margin.left}, ${this.height - this.margin.bottom})`);
        }

        this.axisXGroup.transition().duration(600).call(this.axisX);
    }

    _renderAxisY() {
        this.scaleY.domain(d3.extent(this.data, item => item[this.yPath]));
        if (this.axisYGroup === undefined) {
            this.axisYGroup = this.svg.append("g")
                .classed("axis axisY", true)
                .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);
        }

        this.axisYGroup.transition().duration(600).call(this.axisY);
    }

    _renderBody() {
        this.bodyGroup = this.svg.append("g")
            .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)
            .classed("svg-body", true);
    }

    _renderLine() {
        if (this.linePath === undefined) {
            this.linePath = this.bodyGroup.append("path")
                .classed("line", true)
                .datum(this.data)
                .attr("d", this.line(this.initData));
        }

        this._renderAxisX();
        this._renderAxisY();

        this.linePath
            .transition()
            .duration(600)
                .attr("d", this.line);
    }
}
