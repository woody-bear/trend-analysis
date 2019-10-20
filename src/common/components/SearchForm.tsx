import React, {ChangeEvent} from 'react';
import {Button} from "reactstrap";
import {languageList} from "../constants";
import './SearchForm.scss'

interface Props {
    handleChangeInput : (e : ChangeEvent<HTMLSelectElement>) => void;
    handleChangeOption : (e : ChangeEvent<HTMLSelectElement>) => void;
    handleKeyPress : (e : any) => void;
    handleClickButton : () => void;
    keyword : string;
}

const SearchForm = ({handleChangeInput, handleChangeOption, handleClickButton, handleKeyPress, keyword} : Props) => {
    return(
        <div className={"search-form-container"}>
            <select className={"language-select"} value={keyword} name={"keyword"} onChange={(e) => handleChangeInput(e)}>
                <option value={''}>선택안함</option>
                {
                    languageList.map((language, index) =>
                        <option key={index} value={language}>{language}</option>
                    )
                }
            </select>
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