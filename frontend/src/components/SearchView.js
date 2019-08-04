import React from 'react';
import Icon from 'react-fontawesome';

import SearchSuggestion from './SearchSuggestion';
import './SearchView.css';
export default ({
  activeFilters,
  eventTypes,
  handleFilterChange,
  handleKeyPress,
  handleSearch,
  searchQuery,
  searchResults,
  selectResult,
}) => (
    <div className='search-container'>
        <div className='search-viewport'>
            <form className='search-form' onSubmit={() => { return false; }}>
                <input type='number'
                    className='search-text'
                    placeholder='Enter Zip Code'
                    onChange={handleSearch}
                    onKeyPress={handleKeyPress}
                    value={searchQuery}
                    maxLength={5}
                />
            </form>

            <form className='filter-form'>
                <ul>
                    {
                        eventTypes.map(eventType => (
                            <li>
                                <input type="checkbox" name='f[]' value={eventType.id} 
                                    id={eventType.slug} onChange={handleFilterChange} 
                                    checked={activeFilters.includes(eventType.id.toString()) ? "checked" : false}/>
                                <label htmlFor={eventType.slug}>
                                    {<Icon name='check' color='white' className='event-check' />}
                                    <span>{eventType.title}</span>
                                </label>
                            </li>
                        ))
                    }
                </ul>
            </form>
            {searchResults && <SearchSuggestion selectResult={selectResult} searchResults={searchResults}/>}
        </div>
    </div>
)
