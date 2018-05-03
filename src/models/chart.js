//api => state
export const chartModelToState = (payload) => {
  // debugger;
  return payload.map(datum => {
    return {
      timestamp: new Date(datum.timestamp),
      value: datum.value
    };
  });
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
