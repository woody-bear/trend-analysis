import React, {ChangeEvent, useState, useEffect} from 'react';
import {History} from "history";
import {useInfoDispatch} from "../contexts/searchInfoContext";
import SearchForm from "../common/components/SearchForm";
import * as rx from '../lib/rx/rx';
import {useLoadingDispatch} from "../contexts/LoadingContext";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";

interface Props {
    history : History
}

const SidBarContainer = ({history} : Props) => {
    const [keyword, setKeyword] = useState('');
    const [period, setPeriod] = useState(3);
    const [token, setToken] = useState("");

    const infoDispatch = useInfoDispatch();
    const loadingDispatch = useLoadingDispatch();

    const { executeRecaptcha } = useGoogleReCaptcha();

    useEffect(() => {
        initialize();
    }, [executeRecaptcha]);

    const initialize = async () => {
        if(!executeRecaptcha) return;
        setToken(await executeRecaptcha("search"));
    };

    const handleChangeInput = (e : ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const handleChangeOption = (e : ChangeEvent<HTMLSelectElement>) => {
        setPeriod(parseInt(e.target.value));
    };

    const handleClickButton = () => {
        const info = {
            keyword,
            period,
            g_recaptcha_response: token,
        };

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