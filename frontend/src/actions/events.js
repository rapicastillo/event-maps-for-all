
const loadEvents = () => {
  return {
    type: "EVENTS_LOAD_EVENTS",
    payload: {
      request: {
        url: "/cabanforqueens.json",
        type: "GET"
      }
    }
  };
}

export const eventsAction = {
  loadEvents
};
