import React, {ChangeEvent} from 'react';
import {Button} from "reactstrap";
import './SearchForm.scss'

interface Props {
    handleChangeInput : (e : ChangeEvent<HTMLInputElement>) => void;
    handleChangeOption : (e : ChangeEvent<HTMLSelectElement>) => void;
    handleKeyPress : (e : any) => void;
    handleClickButton : () => void;
    keyword : string;
}

const SearchForm = ({handleChangeInput, handleChangeOption, handleClickButton, handleKeyPress, keyword} : Props) => {
    return(
        <div className={"search-form-container"}>
            <input
                name={"keyword"}
                type={"text"}
                className={"keyword-input"}
                value={keyword}
                onChange={(e) => handleChangeInput(e)}
                onKeyPress={(e) => handleKeyPress(e)}
            />
            <select className={"period-select"} name={"period"} onChange={(e) => handleChangeOption(e)}>
                <option value={3}>3개월</option>
                <option value={6}>6개월</option>
                <option value={12}>1년</option>
            </select>
            <Button
                onClick={() => handleClickButton()}
                outline color={"primary"}
            >search!</Button>
        </div>
    )
};

export default SearchForm;