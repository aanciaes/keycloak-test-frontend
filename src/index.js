import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {Route, Router, Switch} from "react-router-dom";
import {routerMiddleware} from "react-router-redux";
import thunk from "redux-thunk";
import createHistory from 'history/createBrowserHistory';
import rootReducer from "./modules";
import KeycloakTester from "./components/KeycloakTester";
import Keycloak from "keycloak-js";
import axios from "axios";

const history = createHistory();
const middleware = [
    thunk,
    routerMiddleware(history),
];
const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

const app = (
    <Provider store={store}>
        <Router history={history}>
            <div className="container">
                <Switch>
                    <Route exact path="/" component={KeycloakTester}/>
                </Switch>
            </div>
        </Router>
    </Provider>
);

const kc = new Keycloak('/keycloak.json');
kc.init({onLoad: "login-required", promiseType: 'native'})
    .then((authenticated) => {
        if (authenticated) {
            store.getState().keycloak = kc;
            ReactDOM.render(app, document.getElementById("app"));
        }
    }).catch(() => {
        kc.logout()
    }
);

axios.interceptors.request.use((config) => (
    kc.updateToken(5)
        .then((refreshed) => {
            if (refreshed){
                // This is just to force the component to refresh so we can see the tokens on screen, no need for it in production
                store.dispatch({
                    type: "REFRESH",
                    payload: (store.getState().refresh + 1)
                });
            }
            config.headers.Authorization = 'Bearer ' + kc.token;
            return Promise.resolve(config)
        })
        .catch(kc.login)
));
