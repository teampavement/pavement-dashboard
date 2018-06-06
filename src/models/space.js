//api => state
export const spaceModelToState = (payload) => {
    return {
      space: Object.keys(payload)[0],
      value: payload[Object.keys(payload)[0]]
    };
}

//state => api
export const spaceModelFromState = (state) => {
  const {
    startDate,
    endDate,
    spaceHovered,
  } = state;

  return {
    datetime_range: {
      start: startDate.utc().format(),
      end: endDate.utc().format(),
    },
    parking_spaces: [spaceHovered],
  }
}
