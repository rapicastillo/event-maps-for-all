import React from 'react';
import Moment from 'react-moment';
import ReactMarkdown from 'react-markdown';
import ClockIcon from '../assets/images/clock.png';
import MarkerIcon from '../assets/images/marker.png';
import './EventSingle.css';

export default ({ bundled = false, sourceParam, data :
    {title, url, venue, event_type, information, description, location,
    datetime_start, address1, address2, city, state, zipcode, 
    name, website, group, group_url}
}) => (
    <div className={`${bundled && 'event-bundled-item'} event-list-item-container`}>

        <div className='event-list-item-date'>
            <div className='event-list-date-view'>
                <Moment className='event-list-day-data' format="ddd" >{ datetime_start }</Moment>
                <Moment className='event-list-date-data' format="DD" >{ datetime_start }</Moment>
                <Moment className='event-list-month-data' format="MMM" >{ datetime_start }</Moment>
            </div>

        </div>
        <div className='event-list-item-info'>
            <h2 className='event-list-item-title'>
                <a href={`${url || website}${ sourceParam ? `?source=${sourceParam}` : ''}`} target='_blank'>{name || title}</a>
            </h2>
            <div className='event-list-item-desc event-list-item-event-type'>
                {event_type && event_type.event_type_mapping && event_type.event_type_mapping.display_name || "Event"}
            </div>
            <div className='event-list-item-desc'>
                <div className='event-information'>
                    <ReactMarkdown source={information} />
                </div>
            </div>
            <div className='event-list-item-desc'>
                <img src={ClockIcon} className='event-list-icon' /> <Moment className='event-list-time-data' format="h:mm a" >{ datetime_start }</Moment>
            </div>
            {!bundled && <div className='event-list-item-desc'>
                <img src={MarkerIcon} className='event-list-icon' />
                <div>  
                    <span>{venue}</span> {venue && address1 && (<br/>)}
                    <span>{[address1, address2, city, state, zipcode].filter(x => x).join(' ')}</span>
                </div>
            </div>}

           
        </div>
    </div>
)