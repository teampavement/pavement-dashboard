import midpoint from '@turf/midpoint';
import { point } from '@turf/helpers';

const midPointFromCurb = (curb) => {
  const long = point(curb.geometry.coordinates[0][0]);
  const lat = point(curb.geometry.coordinates[0][1]);

  return midpoint(long, lat);
  debugger;
}

export const getLongitudeFromCurb = (curb) => {
  return midPointFromCurb(curb)[0];
}

export const getLatitudeFromCurb = (curb) => {
  return midPointFromCurb(curb)[1];
}
