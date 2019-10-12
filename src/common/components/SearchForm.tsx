import React, {ChangeEvent} from 'react';
import {Button} from "reactstrap";

interface Props {
    handleChangeInput : (e : ChangeEvent<HTMLInputElement>) => void;
    handleChangeOption : (e : ChangeEvent<HTMLSelectElement>) => void;
    handleClickButton : () => void;
    keyword : string;
}

const SearchForm = ({handleChangeInput, handleChangeOption, handleClickButton, keyword} : Props) => {
    return(
        <div>
            <input name={"keyword"} type={"text"} value={keyword} onChange={(e) => handleChangeInput(e)}/>
            <select name={"period"} onChange={(e) => handleChangeOption(e)}>
                <option value={3}>3개월</option>
                <option value={6}>6개월</option>
                <option value={12}>1년</option>
            </select>
            <Button
                onClick={() => handleClickButton()}
            >search!</Button>
        </div>
    )
};

export default SearchForm;