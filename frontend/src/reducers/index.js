import { combineReducers } from 'redux';

import languageReducer from './language';
import searchReducer from './search';
import eventsReducer from './events';

const rootReducer = combineReducers({
    language: languageReducer,
    search: searchReducer,
    events: eventsReducer
});

export default rootReducer;
