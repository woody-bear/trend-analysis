import React, {useEffect} from 'react';
import {History} from "history";
import {Info, useInfoDispatch, useInfoState} from "../contexts/searchInfoContext";
import * as rx from '../lib/rx/rx';
import {debounceTime, delay, distinctUntilChanged, map, retry, retryWhen, switchMap, takeWhile} from "rxjs/operators";
import {ajax} from "rxjs/ajax";
import {SEDE_URL} from "../common/constants";
import * as sqlQuery from '../lib/query/query';

interface Props {
    history : History
}

const GraphContainer = ({history} : Props) => {
    const info = useInfoState();
    const infoDispatch = useInfoDispatch();

    const onNext = (value : Info) => {
        infoDispatch(value);
        console.log(value);
    };

    const isSameInfo = (x : Info, y : Info) => x.keyword === y.keyword && x.period === y.period

    useEffect(() => {
        rx.infoSbj
            .pipe(debounceTime(200))
            .pipe(distinctUntilChanged(isSameInfo))
            .pipe(switchMap(((value : Info) => {
                const fd = new FormData();
                fd.append('sql', sqlQuery.query1(value.keyword, value.period));

                return ajax.post(`${SEDE_URL}/save/1`, fd)
                    .pipe(map(r => r.response))
                    .pipe(switchMap(response => {
                        if(response.running) {
                            return ajax.get(`${SEDE_URL}/job/${response.job_id}`)
                                .pipe(map(r => r.response))
                                .pipe(map(response => {
                                    if(response.running) throw 'waiting'
                                    else return response.resultSets[0];
                                }))
                                .pipe(retryWhen(errors =>
                                    errors
                                        .pipe(delay(1000))
                                        .pipe(takeWhile(error => error === 'waiting'))))
                        }
                        else return response.resultSets;
                    }))
            })))
            .subscribe((value => console.log(value)))
    }, []);

    return(
        <div>{info.keyword} </div>
    )
};

export default GraphContainer;