import React from "react";
import { createRoot, Root } from 'react-dom/client';
import { Provider } from "react-redux";
import { createStore } from "redux";

import App from "./components/App";
import { reducers } from "./reducers/index";

const container = document.getElementById('root') as HTMLElement | null;

let root: Root;
if(container !== null){
    root = createRoot(container);

    root.render(
        <Provider store={createStore(reducers)}>
            <App />
        </Provider>
    );
}
