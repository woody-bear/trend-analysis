import React from 'react';
import SearchInfoContainer from '../containers/SearchInfoContainer';
import {RouteComponentProps} from "react-router";


const FirstPage = ({ history } : RouteComponentProps) => {
    return(
        <div>
            <SearchInfoContainer history={history} />
        </div>
    )
};

export default FirstPage;