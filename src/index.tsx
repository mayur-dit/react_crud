import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Hello from './containers/Hello';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {StoreState} from './types';
import {enthusiasm} from './reducers';
import './index.css';

// @ts-ignore
const store = createStore<StoreState>(enthusiasm, {
    enthusiasmLevel: 1,
    languageName: 'TypeScript',
});

ReactDOM.render(
    <Provider store={store}>
        <Hello/>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
