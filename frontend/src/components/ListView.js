import React from 'react';
import ListItem from './ListItem';
import './ListView.css';


export default ({ 
    activeFilters,
    eventsData,
    eventTypes,
    sourceParam, 
}) => {
    return (
    <div className='event-list-container'>
        <ul className='event-list'>
            {!!activeFilters && eventsData.map((item) => 
                (!item.event_type && activeFilters.includes("0") || item.event_type&&activeFilters.includes(item.event_type.id.toString())) 
                && 
                (
                    <ListItem data={item} sourceParam={sourceParam} key={`${item.longitude}-${item.latitude}-${item.url}`}/>
                )
            )}
        </ul>
    </div>
)}