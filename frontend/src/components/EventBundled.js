import React from 'react';
import EventSingle from './EventSingle.js';
import MarkerIcon from '../assets/images/marker.png';
import './EventBundled.css';

export default ({ sourceParam, data }) => {
    
    const venue = data[0].venue.split(".") ;
    if (venue[0] == "TBD") {
        let temp = venue[1];
        venue[0] = venue[1].replace("TBD", "");
        venue[1] = "Location to be announced";
    }
    
    return (
        <div className='event-bundled-cont'>
            <div className='event-bundled-loc'>
                <img src={MarkerIcon} />
                <div>
                    <h1>{venue[0] || data[0].address1 || data[0].city}</h1>
                    <h2>{venue[1] || `${!data[0].address1 ? '' : data[0].city } ${data[0].state}` }</h2>
                </div>
            </div>
            <div className='event-bundled-items'>
            {data.map(item => (
                <EventSingle data={item} key={item.url} sourceParam={sourceParam} bundled={true}/>
            ))}
            </div>
        </div>
    );
};