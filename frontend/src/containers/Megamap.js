import React from 'react';

import { Router, Route, Link } from "react-router-dom";
import ReactPixel from 'react-facebook-pixel'
import {Helmet} from "react-helmet";

import { connect } from 'react-redux';
import i18n from '../hoc/i18n';

import ListArea from '../components/ListArea';
import MapArea from '../components/MapArea';
import {Page, Viewport} from '../components/Page';
import Navigation from '../components/Navigation';
import MapContainer from './MapContainer';
import ListContainer from './ListContainer';
import SearchContainer from './SearchContainer';

import EventCreationButton from '../components/EventCreationButton'
import history from '../history';
import { eventsAction } from '../actions/events';

import ReactGA from 'react-ga';

ReactGA.initialize('UA-132552842-1');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactPixel.init('424082041730388', null, {autoConfig: true, debug: true});
ReactPixel.track("MapView");
ReactPixel.track("PageView");


class Megamap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isMobileNavVisible: false
        }


    }

    componentDidMount() {
      this.props.loadEvents();
    }
    
    handleNavClose() {
        // document.getElementsByTagName("html")[0].style.overflow = 'auto';
        // document.getElementsByTagName("body")[0].style.overflow = 'auto';
        this.setState({ isMobileNavVisible: false });
    }

    handleNavOpen() {
        // document.getElementsByTagName("html")[0].style.overflow = 'hidden';
        // document.getElementsByTagName("body")[0].style.overflow = 'hidden';
        this.setState({ isMobileNavVisible: true });
    }

    //
    // <EventCreationButton />
    render() {
        return (
            <Router history={history}>
                <Route exact path="/" render={props => (

                    <Page>
                        <Helmet>
                            <meta charSet="utf-8" />
                            <title>Maps for all</title>
                            <link rel="shortcut icon" type="image/x-icon" />
                        </Helmet>
                        <Viewport>
                            <ListArea>
                                <SearchContainer history={history} />
                                <ListContainer />
                            </ListArea>
                            <MapArea>
                                <MapContainer history={history}  />
                            </MapArea>
                        </Viewport>
                    </Page>
                )} />
            </Router>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadEvents: () => {
      dispatch(eventsAction.loadEvents());
    }
});

export default connect(null, mapDispatchToProps)(Megamap);
