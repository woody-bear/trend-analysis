import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import {InfoContextProvider} from "./contexts/searchInfoContext";
import {LoadingContextProvider} from "./contexts/LoadingContext";
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";

ReactDOM.render(
    <GoogleReCaptchaProvider
        reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
    >
        <InfoContextProvider>
            <LoadingContextProvider>
                <App />
            </LoadingContextProvider>
        </InfoContextProvider>
    </GoogleReCaptchaProvider>,
    document.getElementById('root'));
