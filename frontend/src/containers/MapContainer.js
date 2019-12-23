import React from 'react';
import MapView from '../components/MapView';
import {searchAction} from '../actions/search';

import { connect } from 'react-redux';

class MapContainer extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        clickedItem: null
      }
    }

    handleFeatureClick(item) {
      
      this.setState({clickedItem: item});
    }

    handleClosePopup() {
      this.setState({clickedItem: null});
    }

    handleMapChange(bounds, center, zoom) {
      this.props.updateMap({northeast: bounds.getNorthEast(), southwest: bounds.getSouthWest()}, [center.lng, center.lat], [zoom]);
    }

    handleMapLoad(map) {
      this.props.setMap(map);
    }

    render() {
        return (<MapView
          volunteerData={this.props.volunteerData}
          meetData={this.props.meetData}
          phonebankData={this.props.phonebankData}
          handleFeatureClick={this.handleFeatureClick.bind(this)}
          clickedItem={this.state.clickedItem}
          handleClosePopup= {this.handleClosePopup.bind(this)}

          eventsData={this.props.eventsData}

          center={this.props.center}
          bounds={this.props.bounds}
          zoom={this.props.zoom}

          initialBounds={[[-74.257159, 40.915568], [-73.699215, 40.495992]]}

          handleMapChange={this.handleMapChange.bind(this)}
          handleMapLoad={this.handleMapLoad.bind(this)}

          history={this.props.history}
          sourceParam={this.props.sourceParam}
          
        />);
    }
}

const mapStateToProps = ({ events, search }) => ({
  eventsData: Object.values(events.eventsData
    .sort((a, b) => new Date(a.datetime_start) - new Date(b.datetime_start))
    .reduce((acc, curr) => {
        const key = `${curr.longitude},${curr.longitude}`;
        if (acc && !acc[key]) {
            acc[key] = [curr];
        } else {
            acc[key] = [...acc[key], curr]
        }
        return acc;
    }, {})
  ),
  activeFilters: search.activeFilters,
  center: search.center,
  bounds: search.bounds,
  zoom: search.zoom,
  chosenZipcode: search.chosenZipcode,
  sourceParam: search.sourceParam
})

const mapDispatchToProps = (dispatch) => ({
  updateMap: (bounds, center, zoom) => {
    dispatch(searchAction.updateMap(bounds, center, zoom))
  },
  setMap: (map) => { dispatch(searchAction.setMap(map))}
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
