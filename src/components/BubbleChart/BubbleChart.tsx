import React from 'react';
import {Spinner} from "reactstrap";

const _ = require('underscore');
const d3 = require('d3');

interface Props {
    data : Array<any>;
    width : number;
    height : number;
    useLabels : boolean;
}

interface State {
    data : Array<any>;
    minValue : number;
    maxValue : number;
    mounted : boolean;
}

type itemObj = {
    v : number;
    x : number;
    y : number;
    label : string;
}

class BubbleChart extends React.Component<Props, State> {
    simulation : any;
    static defaultProps = {
        data: [],
        useLabels: false,
        width: 600,
        height: 400
    };

    constructor(props : any) {
        super(props);

        this.state = {
            data: [],
            minValue : 1,
            maxValue : 100,
            mounted : false
        };

        this.radiusScale = this.radiusScale.bind(this);
        this.simulatePositions = this.simulatePositions.bind(this);
        this.renderBubbles = this.renderBubbles.bind(this);
    }

    componentWillMount() {
        this.setState({
            mounted : true,
        })
    }

    componentDidMount() {
        if (this.props.data.length > 0) {
            this.setState({
                minValue : 0.95 *
                    d3.min(this.props.data, (item : any) => {
                        return item.v;
                    }),
                maxValue : 1.05 *
                    d3.max(this.props.data, (item : any) => {
                        return item.v;
                    }),
            })
            this.simulatePositions(this.props.data);
        }
    }

    componentWillUnmount() {
        this.setState({
            mounted: false,
        })
    }

    radiusScale = (value : any) => {
        const fx = d3
            .scaleSqrt()
            .range([1, 50])
            .domain([this.state.minValue, this.state.maxValue]);

        return fx(value);
    };

    simulatePositions = (data : any) => {
        this.simulation = d3
            .forceSimulation()
            .nodes(data)
            .velocityDecay(0.5)
            .force("x", d3.forceX().strength(0.05))
            .force("y", d3.forceY().strength(0.05))
            .force(
                "collide",
                d3.forceCollide((d : any) => {
                    return this.radiusScale(d.v) + 2;
                })
            )
            .on("tick", () => {
                if (this.state.mounted) {
                    this.setState({ data });
                }
            });
    };

    renderBubbles = (data:any) => {
        const minValue =
            0.95 *
            d3.min(data, (item : any) => {
                return item.v;
            });

        const maxValue =
            1.05 *
            d3.max(data, (item : any) => {
                return item.v;
            });

        const color = d3
            .scaleLinear()
            .domain([minValue, maxValue])
            .interpolate(d3.interpolateHcl)
            .range(["#eb001b", "#f79e1b"]);

        // render circle and text elements inside a group
        const texts = _.map(data, (item : itemObj, index : any) => {
            const props = this.props;
            const fontSize = this.radiusScale(item.v) / 2.5;
            return (
                <g
                    key={index}
                    transform={`translate(${props.width / 2 +
                    1.2*item.x}, ${props.height / 2 + 1.2*item.y})`}
                >
                    <circle
                        r={this.radiusScale(item.v)}
                        fill={color(item.v)}
                        stroke={d3.rgb(color(item.v)).brighter(2)}
                        strokeWidth="2"
                    />
                    <text
                        dy="6"
                        fill="#fff"
                        textAnchor="middle"
                        fontSize={`${fontSize}px`}
                        fontWeight="bold"
                    >
                        {item.label}
                    </text>
                </g>
            );
        });

        return texts;
    };

    render() {
        if (this.state.data.length) {
            return (
                <svg width={this.props.width} height={this.props.height}>
                    {this.renderBubbles(this.state.data)}
                </svg>
            );
        }

        return <div><Spinner /></div>;
    }
}

export default BubbleChart