import React, {useEffect, useState} from 'react';
import CanvasJSReact from '../../canvasjs-2.3.2/canvasjs.react';
import {toPresentableData, toDetailData} from "../../common/utils";
import {dataObj} from "../../common/type";
import DataTable from '../DataTable';
import {Spinner, Button} from "reactstrap";
import './PieChart.scss';
import BubbleChart from "../BubbleChart";
import {useInfoState} from "../../contexts/searchInfoContext";

interface Props {
    data : dataObj | null;
    loading : boolean;
}

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const CanvasJS = CanvasJSReact.CanvasJS;


const PieChart = ({ data, loading } : Props) => {
    const [viewMode, setViewMode] = useState(0);
    const [detailData, setDetailData] = useState<Array<any>>([]);
    const infoState = useInfoState();

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

        setViewMode(0);
    }, [infoState]);
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

    const handleClickDetail = (e : any) => {
        setDetailData(toDetailData(data.rows, e.target.name));
        setViewMode(1);
    };

    const handleClickGoBack = () => {
        setDetailData([]);
        setViewMode(0);
    };

    if(loading) {
        return (
            <div className={"spinner-wide-container"}>
                <div className={"spinner-container"}>
                    <div className={"spinner"}>
                        <Spinner />
                    </div>
                </div>
            </div>
        )
    }

    if(viewMode === 0) {
        return(
            <div className={"piechart-container"}>
                <div style={{'width' : '50%', 'display' : 'inline-block'}}>
                    <CanvasJSChart options={overall}
                    />
                    <Button name={"overall"} onClick={(e) => handleClickDetail(e)}>show Detail</Button>
                </div>
                <div style={{'width' : '50%', 'display' : 'inline-block'}}>
                    <CanvasJSChart options={recent}
                    />
                    <Button name={"recent"} onClick={(e) => handleClickDetail(e)}>show Detail</Button>
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
    }
    else {
        return(
            <div className={"bubblechart-container"}>
                <Button onClick={() => handleClickGoBack()}>go back</Button>
                <BubbleChart
                    data={detailData}
                    height={'100vh'}
                    width={'100vw'}
                    useLabels={true}
                />
            </div>
        )
    }
};

export default PieChart;