import React, { Component } from 'react';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import {
  Map,
  Marker,
  Popup,
  TileLayer,
  GeoJSON,
  Polyline,
  FeatureGroup,
} from 'react-leaflet';
import Control from 'react-leaflet-control';
import { EditControl } from "react-leaflet-draw"
import {
  ToolTipDumb,
  Banner,
  Button
} from 'lucid-ui';

import COLORS from '../../constants/colors';
import Chart from '../chart';

// import GeoJsonCluster from 'react-leaflet-geojson-cluster';
// import HeatmapLayer from 'react-leaflet-heatmap-layer';

const DEFAULT_CENTER = {
  lat: 40.220121,
  lng: -74.006390,
};

const DEFAULT_ZOOM = 16;

const DEFAULT_VIEWPORT = {
  center: [DEFAULT_CENTER.lat, DEFAULT_CENTER.lng],
  zoom: DEFAULT_ZOOM
};


const REGULAR_STYLE = {
    "color": COLORS.DARK_GREY,
    "weight": 3,
    "opacity": 0.45,
    "transition": "all .2s ease-in-out"
}

const HIGHLIGHTED_STYLE = {
    "color": COLORS.BLUE,
    "weight": 3,
    "opacity": 1,
    "transition": "all .2s ease-in-out"
}

class MapComponent extends Component {
  constructor(props) {
    super(props);

    this.getStyle = this.getStyle.bind(this);
    this.handleCurbClick = this.handleCurbClick.bind(this);
    this.handleCurbClick = this.handleCurbClick.bind(this);
    this.generateKey = this.generateKey.bind(this);
  }

  getStyle(geoJsonFeature) {
    if (this.props.selectedCurbs[geoJsonFeature.properties.curbline_id]) {
      return HIGHLIGHTED_STYLE;
    }
    return REGULAR_STYLE;
  }

  handleToggleSpaces() {
    alert('toggled');
  }

  handleCurbClick(e) {
    this.props.handleCurbSelected(e.target.feature);
  }

  handleCurbMouseout(e) {
    this.setStyle({
      "weight": 3
    });
  }

  handleCurbMouseover(e) {
    // mouseover for 650ms
    // must be selected
    // console.log(e.target.feature.properties.spaces);
    this.setStyle({
      "weight": 9
    });
  }

  generateKey(obj) {
    const objJsonStr = JSON.stringify(obj);
    return Buffer.from(objJsonStr).toString("base64");
  }

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
        <GeoJSON key={this.generateKey(this.props.geojsonData)}
                 data={this.props.geojsonData}
                 style={this.getStyle}
                 onEachFeature={(feature, layer) => {
                   // layer.bindPopup('hello');
                   layer.on({
                     click: this.handleCurbClick,
                     mouseover: this.handleCurbMouseover,
                     mouseout: this.handleCurbMouseout,
                   });
                 }}
        />
        <Control position="bottomleft">
          <Button className="PV-Map-Control-Button"
            onClick={this.props.handleToggleShowSpaces}>
            {this.props.showSpaces ? 'Show curbs' : 'Show spaces'}
          </Button>
        </Control>
        <Control position="bottomleft">
          <Button className="PV-Map-Control-Button"
            onClick={this.props.handleSelectAllCurbs}>
            Select all curbs
          </Button>
        </Control>
        <FeatureGroup>
          <EditControl
            position='topleft'
            onEdited={this._onEditPath}
            onCreated={this._onCreate}
            onDeleted={this._onDeleted}
            draw={{
              marker: false,
              circle: false,
              circlemarker: false,
            }}
            onDrawStop={this.props.handleDrawStop}
          />
        </FeatureGroup>
          {/* <Circle center={[51.51, -0.06]} radius={200} /> */}
        {/* <HeatmapLayer
            fitBoundsOnLoad
            fitBoundsOnUpdate
            points={this.props.geojsonData.features}
            longitudeExtractor={m => m.geometry.coordinates[0]}
            latitudeExtractor={m => m.geometry.coordinates[1]}
            intensityExtractor={this.props.getHeatmapIntensityForSpace} /> */}
      </Map>
    );
  }
}

export default MapComponent;
