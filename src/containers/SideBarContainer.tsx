import React, {ChangeEvent, useState} from 'react';
import {History} from "history";
import {useInfoDispatch} from "../contexts/searchInfoContext";
import SearchForm from "../common/components/SearchForm";
import * as rx from '../lib/rx/rx';
import {useLoadingDispatch} from "../contexts/LoadingContext";

interface Props {
    history : History
}

const SidBarContainer = ({history} : Props) => {
    const [keyword, setKeyword] = useState('');
    const [period, setPeriod] = useState(3);

    const infoDispatch = useInfoDispatch();
    const loadingDispatch = useLoadingDispatch();

    const handleChangeInput = (e : ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const handleChangeOption = (e : ChangeEvent<HTMLSelectElement>) => {
        setPeriod(parseInt(e.target.value));
    };

    const handleClickButton = () => {
        const info = { keyword, period };

        infoDispatch(info);

        loadingDispatch({type : 'START'});
        rx.infoSbj.next(info);
    };

    return(
        <div>
            <SearchForm
                handleChangeInput={handleChangeInput}
                handleChangeOption={handleChangeOption}
                handleClickButton={handleClickButton}
                keyword={keyword}/>
        </div>
    )
};

export default SidBarContainer;