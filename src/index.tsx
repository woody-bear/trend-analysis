import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import {InfoContextProvider} from "./contexts/searchInfoContext";
import {LoadingContextProvider} from "./contexts/LoadingContext";

ReactDOM.render(
    <InfoContextProvider>
        <LoadingContextProvider>
            <App />
        </LoadingContextProvider>
    </InfoContextProvider>,
    document.getElementById('root'));
