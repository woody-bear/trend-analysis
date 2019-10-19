import React, {ChangeEvent, useState} from 'react';
import {History} from "history";
import {useInfoDispatch, useInfoState} from "../../contexts/searchInfoContext";
import SearchForm from "../../common/components/SearchForm";
import Guide from "../../components/Guide";
import './SearchInfoContainer.scss';
import * as rx from "../../lib/rx/rx";
import {useLoadingDispatch} from "../../contexts/LoadingContext";

interface Props {
    history : History
}

const SearchInfoContainer = ({history} : Props) => {
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
        const info = {
            keyword,
            period,
        };

        infoDispatch(info);

        loadingDispatch({type : 'START'});
        history.push(`/search`);

        setTimeout(() => {
            rx.infoSbj.next(info);
        }, 500);
    };

    const handleKeyPress = (e : any) => {
        if(e.key === 'Enter') handleClickButton();
    };

    return (
        <div className={"guide-and-search-container"}>
            <Guide
            />
            <div className={"search-info-wide-container"}>
                <div className={"search-info-container"}>
                    <SearchForm
                        handleChangeInput={handleChangeInput}
                        handleChangeOption={handleChangeOption}
                        handleClickButton={handleClickButton}
                        handleKeyPress={handleKeyPress}
                        keyword={keyword}
                    />
                </div>
            </div>
        </div>
    )
};

export default SearchInfoContainer;