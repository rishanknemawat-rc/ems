import React from "react";
import { createRoot, Root } from 'react-dom/client';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";

import App from "./components/App";
import { reducers } from "./reducers/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const container = document.getElementById('root') as HTMLElement | null;

let root: Root;
if(container !== null){
    root = createRoot(container);

    root.render(
        <Provider store={createStore(reducers, composeEnhancers(applyMiddleware()))}>
            <App />
        </Provider>
    );
}
