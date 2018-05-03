// import { getLongitudeFromCurb, getLatitudeFromCurb } from '../utils/heatmap';
// import {AsburyPark} from './constants/asbury-park';
import {AsburyParkSpaces} from '../constants/asbury-park-spaces';

//api => state
export const heatmapModelToState = (payload) => {
  // debugger;
  const unfilteredOutput = payload.map(obj => {
    if (!obj.space) {
      return;
    }
    const matchedFeature = AsburyParkSpaces.features.find((feature) => {
      return feature.properties.spacename === obj.space;
    });

    return [
      //latitude
      matchedFeature.geometry.coordinates[0][1],
      //longitude
      matchedFeature.geometry.coordinates[0][0],
      //intesity
      obj.value
    ];
  });

  return unfilteredOutput.filter(el => el !== undefined);
}

//state => api
export const heatmapModelFromState = (state) => {
  const {
    startDate,
    endDate,
    selectedParkingSpaces,
    selectedCurbs,
    showSpaces,
    geojsonData,
  } = state;

  let parkingSpaces = [];
  parkingSpaces = selectedParkingSpaces.map(space => {
    if (space) {
      return `${space}`;
    }
  });

  // TODO - fix
  // if (showSpaces) {
  //   parkingSpaces = selectedParkingSpaces.map(space => {
  //     if (space) {
  //       return `${space}`;
  //     }
  //   });
  // } else {
  //   geojsonData.features.map((feature) => {
  //     if (selectedCurbs[feature.properties.curbline_id]) {
  //       if (feature.properties.spaces) {
  //         parkingSpaces.push(feature.properties.spaces);
  //       }
  //     }
  //   });
  // }


  return {
    datetime_range: {
      start: startDate.utc().format(),
      end: endDate.utc().format(),
    },
    parking_spaces: parkingSpaces,
  }
}
