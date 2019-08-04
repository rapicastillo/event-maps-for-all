import React from 'react';
import connect, { Provider } from 'react-redux';
import Megamap from './containers/Megamap';
import store from './store';

import './_fonts.css';
import './_variable.css';
export default class MainApp extends React.Component {

    render() {
        return(
            <Provider store={store}>
                <Megamap />
            </Provider>
        )
    }

};