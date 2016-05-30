export default class Chart {
    constructor(props) {
        this.id = props.id;
        this.width = props.width;
        this.height = props.height;
        this.padding = props.padding;
    }

    render() {
        this._init();
    }

    _init() {
        this.$element = $(`<div id=${this.id} class=chart />`);
        const $svg = $(`<svg width=${this.width} height=${this.height} />`);
        this.$element.append($svg);
        this.svg = d3.select($svg[0]);

        this._initContentGroup();
    }

    _initContentGroup() {
        this.contentGroup = this.svg.append("g")
            .attr("transform", `translate(${this.padding.left}, ${this.padding.top})`)
            .classed("content-group", true);
    }
}
