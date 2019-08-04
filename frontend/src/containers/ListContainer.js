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
            eventsData={this.props.eventsData}
            sourceParam={this.props.sourceParam}
        />
        );
    }
}

const mapStateToProps = ({ events, search }) => {
    return {
        sourceParam: search.sourceParam,
        eventsData: events.eventsData
    };
}


export default connect(mapStateToProps)(ListContainer);
