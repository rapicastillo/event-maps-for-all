import React from 'react';
import './SearchSuggestion.css';

export default ({
  searchResults,
  selectResult
}) => (
    <div className='search-suggestion-container'>
      <div className='search-suggestion-viewport'>
        <ul className='search-suggestion-list'>
          {searchResults.map(item => (
            <li key={item.place_id}>
              <a href='javascript: void(null)' onClick={()=>selectResult(item)}>{item.formatted_address}</a>
            </li>))
          }
        </ul>
      </div>
    </div>
)
