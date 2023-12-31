import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./Redux/redux-store";
import App from './App';
import reportWebVitals from './reportWebVitals';

import './Styles/base.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
     <BrowserRouter >
        <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
