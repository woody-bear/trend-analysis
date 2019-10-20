import React, {ChangeEvent, useState, useEffect} from 'react';
import {History} from "history";
import {useInfoDispatch} from "../contexts/searchInfoContext";
import SearchForm from "../common/components/SearchForm";
import * as rx from '../lib/rx/rx';
import {useLoadingDispatch} from "../contexts/LoadingContext";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem} from "reactstrap";

interface Props {
    history : History
}

const SidBarContainer = ({history} : Props) => {
    const [keyword, setKeyword] = useState('');
    const [period, setPeriod] = useState(3);
    const [token, setToken] = useState("");
    const [collapsed, setCollapsed] = useState(true);

    const infoDispatch = useInfoDispatch();
    const loadingDispatch = useLoadingDispatch();

    const { executeRecaptcha } = useGoogleReCaptcha();


    useEffect(() => {
        const initialize = async () => {
            if(!executeRecaptcha) return;
            setToken(await executeRecaptcha("search"));
        };

        initialize();
    }, [executeRecaptcha]);

    const handleChangeInput = (e : ChangeEvent<HTMLSelectElement>) => {
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
        rx.infoSbj.next(info);
    };

    const handleKeyPress = (e : any) => {
        if(e.key === 'Enter') handleClickButton();
    };

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };

    return(
        <div className={"p-3 mb-2 bg-light text-dark"}
            style={{'position' : 'absolute', 'top' : '0', 'width' : '100%'}}
        >
            <Navbar color="faded" light>
                <NavbarBrand className="mr-auto">Search Option</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse isOpen={!collapsed} navbar>
                    <Nav navbar>
                        <NavItem>
                            <SearchForm
                                handleChangeInput={handleChangeInput}
                                handleChangeOption={handleChangeOption}
                                handleClickButton={handleClickButton}
                                handleKeyPress={handleKeyPress}
                                keyword={keyword}/>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
};

export default SidBarContainer;