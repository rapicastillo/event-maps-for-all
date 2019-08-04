import React from 'react';
import MapPopupItem from './MapPopupItem';
import EventCreationButton from './EventCreationButton';
import './MapView.css';


const ReactMapboxGl = require("react-mapbox-gl");

const {Layer, Feature, Popup, ZoomControl}  = ReactMapboxGl;



const Map = ReactMapboxGl.Map({
  accessToken:
    "pk.eyJ1IjoicmNzY2FzdGlsbG8iLCJhIjoiY2pseDZ2bmp0MDcwYzNwcGp1bjBqNHo4aSJ9.3bD8gQrMAIEqV6yyS-__vg"
});

class MapView extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
    }

    handleStyleLoad(map) {
       this.map = map;
      //  map.setCenter({ lng: -73.834, lat: 40.676 });
      //  map.setZoom(10);

       map.on('moveend', (event) => {
        this.props.handleMapChange(map.getBounds(), map.getCenter(), map.getZoom())
      });

      this.map = map;

      this.props.handleMapLoad(map);

      this.props.center && map.setCenter({ lng: this.props.center[0], lat: this.props.center[1] });
      this.props.center && map.setZoom(14);
    }

    renderPopup () {
      console.log(this.props.sourceParam , "ZZZ ", this.props);
      const popup = this.props.clickedItem;
      return (
        <Popup coordinates={[popup[0].lng, popup[0].lat]}>
          <MapPopupItem
            popup={popup}
            handleClosePopup={this.props.handleClosePopup}
            sourceParam={this.props.sourceParam}
          />
        </Popup>
      )
    }

    render() {
        return (<div className='map-area'>
          <Map
            ref={e => {
              this.map = e
            }}
            onStyleLoad={this.handleStyleLoad.bind(this)}
            style="mapbox://styles/rcscastillo/cjskbazaf34171gnxi5qfdeli"
            className='map-view-container'

            zoom={this.props.zoom || [10]}
            interactive={true}
            center={this.props.center || [ -73.834, 40.676]}
            movingMethod={'easeTo'}

            containerStyle={{
              height: "100%",
              width: "100%"
            }}>
              <ZoomControl position='top-left'/>
              <Layer
                  type="circle"
                  id="volunteerData"
                  layout={{
                    'visibility': this.props.showVolunteer ? 'visible' : 'none',
                  }}
                  paint={{
                    "circle-radius": 5,
                    "circle-color": "#440099",
                    "circle-stroke-width": 2,
                    "circle-stroke-color": "#ffb900"
                  }}>
                {
                  this.props.volunteerData.map((data, ind) => (
                      <Feature key={ind}
                        coordinates={[data[0].lng, data[0].lat]}
                        onClick={(e)=>{ this.props.handleFeatureClick(data); }}/>
                  ))
                }
              </Layer>

              <Layer
                  type="circle"
                  id="meetData"
                  layout={{
                    'visibility': this.props.showMeet ? 'visible' : 'none',
                  }}
                  paint={{
                    "circle-radius": 5,
                    "circle-color": "#c4b4dd",
                    "circle-stroke-width": 2,
                    "circle-stroke-color": "#5e2ba6"
                  }}>
                {
                  this.props.meetData.map((data, ind) => (
                      <Feature key={ind}
                        coordinates={[data[0].lng, data[0].lat]}
                        onClick={(e)=>{ this.props.handleFeatureClick(data); }}/>
                  ))
                }
              </Layer>

              <Layer
                  type="circle"
                  id="phonebankData"
                  layout={{
                    'visibility': this.props.showPhonebank ? 'visible' : 'none',
                  }}
                  paint={{
                    "circle-radius": 5,
                    "circle-color": "#440099",
                    "circle-stroke-width": 2,
                    "circle-stroke-color": "#ffb900"
                  }}>
                {
                  this.props.phonebankData.map((data, ind) => (
                      <Feature key={ind}
                        coordinates={[data[0].lng, data[0].lat]}
                        onClick={(e)=>{ this.props.handleFeatureClick(data); }}/>
                  ))
                }
              </Layer>

            { this.props.clickedItem &&
              this.renderPopup()
            }
          </Map>
        </div>);
    }
}

export default MapView;
