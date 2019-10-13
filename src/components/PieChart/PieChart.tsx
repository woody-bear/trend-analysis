import React, {useEffect} from 'react';
import CanvasJSReact from '../../canvasjs-2.3.2/canvasjs.react';
import {toPresentableData} from "../../common/utils";
import {dataObj} from "../../common/type";
import DataTable from '../DataTable';
import {Spinner} from "reactstrap";
import './PieChart.scss';

interface Props {
    data : dataObj | null;
    loading : boolean;
}

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const CanvasJS = CanvasJSReact.CanvasJS;


const PieChart = ({ data, loading } : Props) => {
    useEffect(() => {
        CanvasJS.addColorSet("custom",
            [
                '#FF9AA2',
                '#FFB7B2',
                '#FFDAC1',
                '#E2F0CB',
                '#B5EAD7',
                '#C7CEEA',
            ]);
    });
    if(!data) return <div>there is no data</div>

    const overallData = toPresentableData(data.rows, "overall");
    const recentData = toPresentableData(data.rows, "recent");
    const risingData = toPresentableData(data.rows, "rising");

    const overall = {
        colorSet : "custom",
        title: {
            text: "Overall Popularity"
        },
        data: [{
            type: "pie",
            toolTipContent: "{label}: <strong>{y}%</strong>",
            indexLabelPlacement: "inside",
            dataPoints: overallData
        }]
    };

    const recent = {
        colorSet : "custom",
        title: {
            text: "Recent Popularity"
        },
        data: [{
            type: "pie",
            toolTipContent: "{label}: <strong>{y}%</strong>",
            indexLabelPlacement: "inside",
            dataPoints: recentData
        }]
    };

    const rising = {
        colorSet : "custom",
        title: {
            text: "Rising Keywords"
        },
        data: [{
            type: "pie",
            toolTipContent: "{label}: <strong>{y}%</strong>",
            indexLabelPlacement: "inside",
            dataPoints: risingData
        }]
    };

    if(loading) {
        return (
            <div className={"spinner-container"}>
                <div className={"spinner"}>
                    <Spinner />
                </div>
            </div>
        )
    }

    return(
        <div>
            <div style={{'width' : '50%', 'display' : 'inline-block'}}>
                <CanvasJSChart options={overall}
                />
            </div>
            <div style={{'width' : '50%', 'display' : 'inline-block'}}>
                <CanvasJSChart options={recent}
                />
            </div>
            <div style={{'width' : '50%', 'display' : 'inline-block'}}>
                <CanvasJSChart options={rising}
                />
            </div>
            <div style={{'width' : '50%', 'display' : 'inline-block'}}>
                <DataTable data={data} />
            </div>
        </div>
    )
};

export default PieChart;