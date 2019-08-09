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
                <ListItem data={item} sourceParam={sourceParam} key={`${item.longitude}-${item.latitude}-${item.url}`}/>
            )}
        </ul>
    </div>
)}