import Chart from "./Chart";

export default class PieChart extends Chart {
    constructor(props) {
        super(props);
        this.data = props.data;
    }

    _init() {
        super._init();

        // TODO
        this.svg.style("background", "rgba(0, 0, 0, 0.2)");
    }

    render() {
        super.render();
        this._renderPie();
    }

    _renderPie() {
        
    }
}
