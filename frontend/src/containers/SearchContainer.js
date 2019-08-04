import React from 'react';

import SearchView from '../components/SearchView';
import { connect } from 'react-redux';
import {searchAction} from '../actions/search';
import history from '../history';

class SearchContainer extends React.Component {

  constructor(props) {
    super(props);
    this.geocodeTimeout = null;
    this.state = {
      searchQuery: ''
    }
  }

  componentDidMount() {
    this.props.history.listen((location, action) => {
      if (action == "POP") {
        this.handleHistoryChange(location);
      }
    });

    if (this.props.history.location.search !== "") {
      this.handleHistoryChange(this.props.history.location);
    }
  }

  handleHistoryChange(location) {
    const query = new URLSearchParams(location.search);
    
    if (query.get("source")) {
      this.props.updateSourceParam(query.get("source"));
    }

    if (!query.get("zipcode") && !query.get("types")) {
      console.log("TEST");;
      // this.props.updateMap(null, [ -73.834, 40.676], [10]);
    }

    if (query.get("zipcode") && query.get("zipcode").length == 5) {
      this.setState({searchQuery: query.get("zipcode")})
      this.props.searchZipcode(query.get("zipcode"));
    }

    if (query.get('types')) {
      this.props.setFilters(query.get('types').split(","));
    } else if (query.get("zipcode")) {
      this.props.resetFilters();
    }
  }

  handleSearch(event) {
    this.props.clearSearchResults();
    this.setState({
      searchQuery: event.target.value
    }, () => {
      if ( this.state.searchQuery.length == 5 ) {
        this.props.searchZipcode(this.state.searchQuery);
        this.handleHistoryPush(this.props.activeFilters);
      }
    })
  }

  handleHistoryPush(types){
    const source = this.props.source;
    console.log(types);
    history.push(`?q=${this.state.searchQuery?`&zipcode=${this.state.searchQuery}`:''}${types&&types.length>0?`&types=${types.join(',')}`:''}${source?`&source=${source}`:''}`);
  }

  handleKeyPress(event) {
    if (event.key == "Enter") {
      if (this.props.searchResults !== undefined &&
          this.props.searchResults &&
          this.props.searchResults.length > 0) {
          this.props.selectResult(this.props.searchResults[0]);
          this.setState({searchQuery: this.props.searchResults[0].formatted_address});
          this.props.clearSearchResults();
          event.preventDefault();
          return false;
      }

      event.preventDefault();
      return false;
    }
    // return false;
  }

  handleSelect(item) {
    this.props.selectResult(item);
  }

  handleFilterChange(event) {
    const filter = event.target.value;

    if ( this.props.activeFilters.includes(filter) ) {
      //remove filter
      this.props.setFilters(this.props.activeFilters.filter(i => i !== filter));
      this.handleHistoryPush(this.props.activeFilters.filter(i => i !== filter));
    } else { // add filter
      this.props.setFilters([...this.props.activeFilters, filter]);
      this.handleHistoryPush([...this.props.activeFilters, filter]);
    }
  }

  render() {
      return <SearchView
        searchQuery={this.state.searchQuery}
        activeFilters={this.props.activeFilters}
        zoomLevel={this.props.zoomLevel}
        center={this.props.center}
        handleSearch={this.handleSearch.bind(this)}
        handleKeyPress={this.handleKeyPress.bind(this)}
        searchResults={this.props.searchResults}
        selectResult={this.handleSelect.bind(this)}
        showMeet={this.props.activeFilters.includes("Meet Tiffany")}
        showVolunteer={this.props.activeFilters.includes("Volunteer for Tiffany")}
        handleFilterChange={this.handleFilterChange.bind(this)}
      />;
  }
}

const mapStateToProps = ({ search }) => ({
    searchQuery: search.searchQuery,
    activeFilters: search.activeFilters,
    zoomLevel: search.zoomLevel,
    center: search.center,
    searchResults: search.searchResults.results,
    chosenResult: search.chosenResult,
    bounds: search.bounds,

    chosenZipcode: search.chosenZipcode,
    zipcodes: search.zipcodes,
    source: search.sourceParam
  });

const mapDispatchToProps = (dispatch) => ({
    updateSourceParam: (source) => dispatch(searchAction.updateSourceParam(source)),
    updateMap: (bounds, center, zoom) => {
      dispatch(searchAction.updateMap(bounds, center, zoom))
    },
    searchZipcode: (text) => {
      dispatch(searchAction.search(text));
    },
    clearSearchResults: () => {
      dispatch(searchAction.clearSearchResults())
    },
    selectResult: (item) => {
      dispatch(searchAction.selectResult(item))
    },
    setFilters: (filters) => {
      dispatch(searchAction.setFilters(filters))
    },
    resetFilters: () => {
      dispatch(searchAction.resetFilters())
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
