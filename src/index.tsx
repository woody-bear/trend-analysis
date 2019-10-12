import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import {InfoContextProvider} from "./contexts/searchInfoContext";

ReactDOM.render(
    <InfoContextProvider>
        <App />
    </InfoContextProvider>,
    document.getElementById('root'));
