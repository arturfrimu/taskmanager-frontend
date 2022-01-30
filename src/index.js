import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {persistedStore} from './component/redux/Store'
import {PersistGate} from 'redux-persist/integration/react';
import {AuthContextProvider} from "./context/auth-context";

ReactDOM.render(
    <React.StrictMode>
        <AuthContextProvider>
            <PersistGate loading={null} persistor={persistedStore}>
                <App/>
            </PersistGate>
        </AuthContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
