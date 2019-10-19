import React, {useEffect, useState} from 'react';
import {History} from "history";
import {Info} from "../contexts/searchInfoContext";
import * as rx from '../lib/rx/rx';
import {debounceTime, delay, distinctUntilChanged, map, retry, retryWhen, switchMap, takeWhile} from "rxjs/operators";
import {ajax} from "rxjs/ajax";
import {SEDE_URL} from "../common/constants";
import * as sqlQuery from '../lib/query/query';
import {useLoadingDispatch, useLoadingState} from "../contexts/LoadingContext";
import PieChart from "../components/PieChart";

interface Props {
    history : History
}

type dataObj = {
    columns : Array<any>;
    messagePosition : number;
    rows : Array<any>;
    truncated : boolean;
};

const GraphContainer = ({ history } : Props) => {
    const [data, setData] = useState<dataObj | null>(null);
    const loadingDispatch = useLoadingDispatch();
    const loading = useLoadingState();

    const isSameInfo = (x : Info, y : Info) => x.keyword === y.keyword && x.period === y.period

    const tryGetResult = (response : any) => {
        if(response.captcha) {
            alert('recaptcha 인증이 필요합니다. 아래 사이트에서 인증을 진행해주세요.\n\n ' +
                'https://data.stackexchange.com/stackoverflow/query/new');
        }

        if(response.running) {
            return ajax.get(`${SEDE_URL}/job/${response.job_id}`)
                .pipe(map(r => r.response))
                .pipe(map(response => {
                    if(response.running) throw 'waiting';
                    else return response.resultSets[0];
                }))
                .pipe(retryWhen(errors =>
                    errors
                        .pipe(delay(1000))
                        .pipe(takeWhile(error => error === 'waiting'))))
                .pipe(retry(3))
        }
        else return response.resultSets;
    };

    useEffect(() => {
        const queryPost = (info : Info) => {
            const fd = new FormData();
            fd.append('sql', sqlQuery.query1(info.keyword, info.period));
            // fd.append('g_recaptcha_response', info.g_recaptcha_response);

            return ajax.post(`${SEDE_URL}/save/1`, fd)
                .pipe(map(r => r.response))
                .pipe(switchMap(tryGetResult))
        };

        const onNext = (value : any) => {
            setData(value);
            loadingDispatch({type : "FINISH"});
        };

        rx.infoSbj
            .pipe(debounceTime(200))
            .pipe(distinctUntilChanged(isSameInfo))
            .pipe(switchMap(queryPost))
            .subscribe(onNext)
    }, [loadingDispatch]);

    return <PieChart data={data} loading={loading}/>
};

export default GraphContainer;