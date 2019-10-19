import React from 'react';
import SearchInfoContainer from '../containers/SearchInfo/SearchInfoContainer';
import {RouteComponentProps} from "react-router";


const FirstPage = ({ history } : RouteComponentProps) => {
    return(
        <div style={{'position' : 'relative', 'height' : '100vh', 'width' : '100vw'}}>
            <SearchInfoContainer history={history} />
        </div>
    )
};

export default FirstPage;