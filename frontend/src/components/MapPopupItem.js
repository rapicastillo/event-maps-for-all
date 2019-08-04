import React from 'react';
import Icon from 'react-fontawesome';
import EventBundled from './EventBundled';
import './MapPopupItem.css';

export default ({ sourceParam, popup, handleClosePopup }) => (
  
  <div className='popup-item'>
    <a href="javascript: void(null)" className={'popup-close'} onClick={handleClosePopup}>
      <Icon name='close' style={{color: 'black'}} />
    </a>
    <EventBundled data={popup} sourceParam={sourceParam} />
  </div>
)
