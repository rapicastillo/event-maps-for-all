import React from 'react';
import ListView from '../components/ListView';
import { connect } from 'react-redux';

const inBounds = (ne, sw, lnglat) =>{
    const lng = (lnglat.lng - ne.lng) * (lnglat.lng - sw.lng) < 0;
    const lat = (lnglat.lat - ne.lat) * (lnglat.lat - sw.lat) < 0;
    return lng && lat;
  }

class ListContainer extends React.Component {
    render() {
        return (
        <ListView
            activeFilters={this.props.activeFilters}
            eventsData={this.props.eventsData}
            eventTypes={this.props.eventTypes}
            sourceParam={this.props.sourceParam}
        />
        );
    }
}

const mapStateToProps = ({ events, search }) => {
    return {
        activeFilters: search.activeFilters,
        eventsData: Object.values(
            events.eventsData.filter(item => {
                const show =
                  !item.event_type && search.activeFilters.includes("0") ||
                  (!!item.event_type && !!item.event_type.event_type_mapping && search.activeFilters.includes(item.event_type.event_type_mapping.id.toString())
                )

                if (!search.bounds) {
                    return show;
                }

                return show && inBounds(
                        search.bounds.northeast,
                        search.bounds.southwest,
                        {lng: item.longitude, lat: item.latitude});

            })
            .sort((a, b) => new Date(a.datetime_start) - new Date(b.datetime_start))
        ),
        eventTypes: events.eventTypes,
        sourceParam: search.sourceParam,
        
        
    };
}


export default connect(mapStateToProps)(ListContainer);
