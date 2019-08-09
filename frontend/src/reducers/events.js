import { EVENTS_LOAD_EVENTS } from '../actions/actionTypes';

const defaultState = {
    eventsData: [],
    eventTypes: []
};

export default function (state=defaultState, action) {

    switch(action.type) {
        case "EVENTS_LOAD_EVENTS":
            // console.log(action);
            return {
                ...state,
            }
        case "EVENTS_LOAD_EVENTS_SUCCESS":
          return {
              ...state,
              eventsData: action.payload.data.events,
              eventTypes: action.payload.data.event_type_mappings
          }
        default:
          return state;
    }
};
