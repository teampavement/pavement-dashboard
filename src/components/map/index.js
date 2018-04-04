import React, { Component } from 'react';
import {
  Map,
  Marker,
  Popup,
  TileLayer,
  GeoJSON,
  Polyline
} from 'react-leaflet';
// import GeoJsonCluster from 'react-leaflet-geojson-cluster';

const DEFAULT_CENTER = {
  lat: 40.220121,
  lng: -74.006390,
};

const DEFAULT_ZOOM = 16;

const DEFAULT_VIEWPORT = {
  center: [DEFAULT_CENTER.lat, DEFAULT_CENTER.lng],
  zoom: DEFAULT_ZOOM
};

class MapComponent extends Component {
  render() {
    return (
      <Map
        id="mapid"
        ref="map"
        className="PV-map"
        draggable={true}
        viewport={DEFAULT_VIEWPORT}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />
        <GeoJSON key={Math.random()}
                 data={this.props.geojsonData}
        />
      </Map>
    );
  }
}

export default MapComponent;
