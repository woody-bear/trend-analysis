import React, {ChangeEvent, useState} from 'react';
import {History} from "history";

interface Props {
    history : History
}

const SearchInfoContainer = ({history} : Props) => {
    const [keyword, setKeyword] = useState('');
    const [period, setPeriod] = useState('3');

    const handleChangeInput = (e : ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const handleChangeOption = (e : ChangeEvent<HTMLSelectElement>) => {
        setPeriod(e.target.value);
    };

    return(
        <div>
            <input type={"text"} value={keyword} onChange={(e) => handleChangeInput(e)}/>
            <select onChange={(e) => handleChangeOption(e)}>
                <option value={"1"} >3개월</option>
                <option value={"2"} >6개월</option>
                <option value={"3"} >1년</option>
            </select>
        </div>
    )
};

export default SearchInfoContainer;