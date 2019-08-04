
const loadEvents = () => {
  return {
    type: "EVENTS_LOAD_EVENTS",
    payload: {
      request: {
        url: "/events/list",
        type: "GET",
        params: {
          format: "json"
        }
      }
    }
  };
}

export const eventsAction = {
  loadEvents
};
