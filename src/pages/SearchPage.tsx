import React from 'react';
import {RouteComponentProps} from "react-router";
import GraphContainer from '../containers/GraphContainer';
import SideBarContainer from '../containers/SideBarContainer';

const SearchPage = ({history, location} : RouteComponentProps) => {
    return(
        <div>
            <GraphContainer history={history}/>
            <SideBarContainer history={history} />
        </div>
    )
};

export default SearchPage;