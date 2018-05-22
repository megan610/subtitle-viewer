import React from 'react';
import ReactDOM from 'react-dom';
import {
    compose,
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {Route} from 'react-router-dom';
import {
    ConnectedRouter,
    routerReducer,
    routerMiddleware,
    push
} from 'react-router-redux';
import thunk from 'redux-thunk';
import {apiMiddleware} from 'redux-api-middleware';
import registerServiceWorker from './registerServiceWorker';
import * as reducers from './reducers';
import 'normalize.css';

import Entry from 'app/entry';
import Preview from 'app/preview';

const history = createHistory();
const router = routerMiddleware(history);

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable no-underscore-dangle */

const store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer
    }),
    composeEnhancers(
        applyMiddleware(thunk, apiMiddleware, router)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route exact path="/" component={Entry} />
                <Route path="/preview" component={Preview} />
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
