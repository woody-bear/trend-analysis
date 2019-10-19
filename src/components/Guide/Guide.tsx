import React from 'react';
import './Guide.scss';

const Guide = () => {
    return(
        <div className={"guide-container"}>
            <h2 className={"header"}> Dev Trend </h2>
            <hr />
            <div className={"message-container"}>
                <div className={"guide-message"}>
                    This page is for developers who want to learn about recent technology.
                </div>
                <div className={"guide-message"}>
                    if you type keyword and select certain period, then this may show you some graphs
                    and table about recent trend based on what you inserted as search information.
                </div>
            </div>
        </div>
    )
};

export default Guide;