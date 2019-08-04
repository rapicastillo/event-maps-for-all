import { createStore, applyMiddleware, compose } from 'redux';

import reducers from './reducers';
import thunkMiddleware from "redux-thunk";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";


const client = axios.create({
  baseURL: "/api",
  // responseType: "json"
});
// client.defaults.headers.common["Cache-Control"] = "no-cache";
// client.defaults.headers.common["Access-Control-Allow-Origin"] = "*";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const error = ({ getSourceAction }, error) => {
  const action = getSourceAction(error.config);
  const is401 = error.response && error.response.status === 401;
  // if (action.errorMessage && !(action.allow401 && is401)) console.log("TODO");
  return Promise.reject(error);
};

const success = ({ getSourceAction }, res) => {
  const action = getSourceAction(res.config);
  // if (action.successMessage) console.log("todo");
  return Promise.resolve(res);
};

export default createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(
          thunkMiddleware,
          axiosMiddleware(client, {
            interceptors: { response: [{ error, success }] },
            returnRejectedPromiseOnError: true
          })
        )
    )
);
