import React, {ChangeEvent, useState} from 'react';
import {History} from "history";
import {Button} from 'reactstrap';
import {useInfoDispatch} from "../contexts/searchInfoContext";
import SearchForm from "../common/components/SearchForm";

interface Props {
    history : History
}

const SearchInfoContainer = ({history} : Props) => {
    const [keyword, setKeyword] = useState('');
    const [period, setPeriod] = useState(3);
    const infoDispatch = useInfoDispatch();

    const handleChangeInput = (e : ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const handleChangeOption = (e : ChangeEvent<HTMLSelectElement>) => {
        setPeriod(parseInt(e.target.value));
    };

    const handleClickButton = () => {
        infoDispatch({
            keyword,
            period,
        });

        history.push(`/search`);
    };

    return (
        <div>
            <SearchForm
                handleChangeInput={handleChangeInput}
                handleChangeOption={handleChangeOption}
                handleClickButton={handleClickButton}
                keyword={keyword}
            />
        </div>
    )
};

export default SearchInfoContainer;