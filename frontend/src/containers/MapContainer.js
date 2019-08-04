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
      console.log("sourceParam ~~~>", this.props.sourceParam);
        return (<MapView
          volunteerData={this.props.volunteerData}
          meetData={this.props.meetData}
          phonebankData={this.props.phonebankData}
          handleFeatureClick={this.handleFeatureClick.bind(this)}
          clickedItem={this.state.clickedItem}
          handleClosePopup= {this.handleClosePopup.bind(this)}

          showMeet={this.props.activeFilters.includes("Meet Tiffany")}
          showVolunteer={this.props.activeFilters.includes("Volunteer for Tiffany")}
          showPhonebank={this.props.activeFilters.includes("Phonebank/Text for Tiffany")}

          center={this.props.center}
          bounds={this.props.bounds}
          zoom={this.props.zoom}

          handleMapChange={this.handleMapChange.bind(this)}
          handleMapLoad={this.handleMapLoad.bind(this)}

          history={this.props.history}
          sourceParam={this.props.sourceParam}
          
        />);
    }
}

const mapStateToProps = ({ events, search }) => ({
  volunteerData: Object.values(events.eventsData.filter(i => i.event_type == "Volunteer for Tiffany")
        .sort((a, b) => new Date(a.start_datetime) - new Date(b.start_datetime))
        .reduce((acc, curr) => {
            const key = `${curr.lng},${curr.lat}`;
            if (acc && !acc[key]) {
                acc[key] = [curr];
            } else {
                acc[key] = [...acc[key], curr]
            }
            return acc;
        }, {})
    )
  ,
  meetData: Object.values(
            events.eventsData.filter(i => i.event_type == "Meet Tiffany")
              .sort((a, b) => new Date(a.start_datetime) - new Date(b.start_datetime))
              .reduce((acc, curr) => {
                  const key = `${curr.lng},${curr.lat}`;
                  if (acc && !acc[key]) {
                      acc[key] = [curr];
                  } else {
                      acc[key] = [...acc[key], curr]
                  }
                  return acc;
              }, {})
          )
  ,
  phonebankData: Object.values(events.eventsData.filter(i => i.event_type == "Phonebank/Text for Tiffany")
        .sort((a, b) => new Date(a.start_datetime) - new Date(b.start_datetime))
        .reduce((acc, curr) => {
            const key = `${curr.lng},${curr.lat}`;
            if (acc && !acc[key]) {
                acc[key] = [curr];
            } else {
                acc[key] = [...acc[key], curr]
            }
            return acc;
        }, {})
    )
  ,
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
