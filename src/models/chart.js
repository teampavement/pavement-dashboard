//api => state
export const chartModelToState = (payload, queryParams) => {
  if (queryParams === undefined) {
    // assume if no query params, then we're just doing barebones chart
    return payload.map(datum => {
      return {
        timestamp: new Date(datum.timestamp),
        value: datum.value
      };
    });
  } else {
    // if have query params at a chart endpoint, assume day-of-week chart
    return payload.map(datum => {
      return {
        timestamp: datum.timestamp.split("-")[0],
        value: datum.value
      };
    });
  }
}

//state => api
export const chartModelFromState = (state) => {
  const {
    startDate,
    endDate,
    selectedParkingSpaces,
  } = state;

  let parkingSpaces = selectedParkingSpaces.map(space => {
    if (space) {
      return `${space}`;
    }
  });

  return {
    datetime_range: {
      start: startDate.utc().format(),
      end: endDate.utc().format(),
    },
    parking_spaces: parkingSpaces,
  }
}
