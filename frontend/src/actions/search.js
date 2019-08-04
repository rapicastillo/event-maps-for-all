import {
  SEARCH_SET_FILTERS,
  SEARCH_SET_QUERY,
  SEARCH_SET_RESULTS,
  SEARCH_ERROR_RESULTS,
  SEARCH_SET_SELECTED_RESULT } from './actionTypes';

import Geocode from 'react-geocode';

const GOOGLE_API_KEY = "AIzaSyCW2bP6hUaZLATaAX-7Nfj5r4ISVsj99j8";
Geocode.setApiKey(GOOGLE_API_KEY);
Geocode.enableDebug();


const updateSourceParam = (source) => ({
  type: "UPDATE_SOURCE_PARAM", 
  data: { source }
});

const setFilters = (filters) => {

    return {
        type: SEARCH_SET_FILTERS,
        data: { filters }
    };
}

const clearSearchResults = ()=> {
  return {
    type: SEARCH_SET_RESULTS,
    data: {}
  };
}

const selectResult = (item) => {
  
  return {
    type: SEARCH_SET_SELECTED_RESULT,
    data: item
  }
}

const search = (zipcode) => {
  return {
    type: "SEARCH_SELECT_ZIPCODE",
    zipcode
  }
}

const resetFilters = () => {
  return {
    type: "SEARCH_RESET_FILTERS"
  }
}

const updateMap = (bounds = null, center = null, zoom = null) => {
  return {
    type: "SEARCH_UPDATE_MAP_INFORMATION",
    data: {
      bounds, center, zoom
    }
  }
}

const setMap = (map) => {
  return {
    type: "SEARCH_MAP_IS_LOADED",
    data: map
  }
}


export const searchAction = {
    setFilters,
    search,
    clearSearchResults,
    selectResult,
    updateMap,
    setMap,
    resetFilters,
    updateSourceParam
};
