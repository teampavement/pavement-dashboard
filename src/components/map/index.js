import React, { Component } from 'react';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import {
  Map,
  Marker,
  CircleMarker,
  Popup,
  TileLayer,
  GeoJSON,
  Polyline,
  FeatureGroup,
} from 'react-leaflet';
import Control from 'react-leaflet-control';
import { EditControl } from "react-leaflet-draw"
import PrintControl from 'react-leaflet-easyprint';

import {
  ToolTipDumb,
  Banner,
  Button,
  LoadingIndicator,
  Panel,
  LoadingIcon,
} from 'lucid-ui';

import COLORS from '../../constants/colors';
import { ChartTitles, ChartTypeMap, ChartAxes } from '../../constants/chart-types';
import Chart from '../chart';
import {
  getLatitudeFromCurb,
  getLongitudeFromCurb
} from '../../utils/heatmap';
import ChartChooser from '../chart-chooser';
import DayChooser from '../day-chooser';
import ChartDateTimePicker from '../chart-datetime-picker';

// import GeoJsonCluster from 'react-leaflet-geojson-cluster';
import HeatmapLayer from 'react-leaflet-heatmap-layer';

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
    this.generateKey = this.generateKey.bind(this);
    this.heatmapIntensityExtractor = this.heatmapIntensityExtractor.bind(this);
    this.generateCircleMarker = this.generateCircleMarker.bind(this);
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
    if (e.target.feature.geometry.type !== 'MultiPoint') {
      this.props.handleCurbSelected(e.target.feature);
    }
  }

  handleCurbMouseout(e) {
    this.setStyle({
      "weight": 3,
    });
  }

  handleCurbMouseover(e) {
    // mouseover for 650ms
    // must be selected
    // console.log(e.target.feature.properties.spaces);
    this.setStyle({
      "weight": 9,
    });
  }

  generateKey(obj) {
    const objJsonStr = JSON.stringify(obj);
    return Buffer.from(objJsonStr).toString("base64");
  }

  heatmapIntensityExtractor(marker) {

  }

  generateFilename() {
    //Pavement-<Date Range>-<Type>-<# Spaces>.<ext>
    return `Pavement_${this.props.startDate.format("YYYY-MM-DD")}-to-${this.props.endDate.format("YYYY-MM-DD")}_`
    +`${ChartTitles[this.props.selectedChartType]}_${this.props.selectedParkingSpaces.length}-spaces`;
  }

  generateCircleMarker(point, latlng) {

    let circleColor = COLORS.BLUE;
    if (this.props.heatmapValues) {
      // find the right color
      // iterate until first nonzero number
      // start bucketing from there — all zeroes go in the first bucket
      const startingPoint = this.props.heatmapValues.findIndex((el) => el > 0);
      const slicedHeatmapList = this.props.heatmapValues.slice(startingPoint)
      const len = slicedHeatmapList.length;
      const per20 = slicedHeatmapList[Math.floor(len*.2) - 1];
      const per40 = slicedHeatmapList[Math.floor(len*.4) - 1];
      const per60 = slicedHeatmapList[Math.floor(len*.6) - 1];
      const per80 = slicedHeatmapList[Math.floor(len*.8) - 1];

      if (point.properties.heatmapValue <= per20) {
        circleColor = COLORS.BLUE;
      } else if (point.properties.heatmapValue <= per40) {
        circleColor = COLORS.GREEN;
      } else if (point.properties.heatmapValue <= per60) {
        circleColor = COLORS.BRIGHT_YELLOW;
      } else if (point.properties.heatmapValue <= per80) {
        circleColor = COLORS.ORANGE;
      } else if (point.properties.heatmapValue > per80) {
        circleColor = COLORS.RED;
      }
    }

    return L.circleMarker(latlng, {
      radius: 4,
      fillColor: circleColor,
      fillOpacity: 1,
      borderColor: circleColor,
      weight: 3,
      opacity: 0.6,
    }).bindPopup(<div id="popup">point.properties.spacename</div>);
  }

  renderHeatmapLegend() {
    if (this.props.heatmapValues && this.props.selectedChartType !== ChartTypeMap.PARKING_REVENUE) {
      // find the right color
      const startingPoint = this.props.heatmapValues.findIndex((el) => el > 0);
      const slicedHeatmapList = this.props.heatmapValues.slice(startingPoint)
      const len = slicedHeatmapList.length;
      const per20 = slicedHeatmapList[Math.floor(len*.2) - 1];
      const per40 = slicedHeatmapList[Math.floor(len*.4) - 1];
      const per60 = slicedHeatmapList[Math.floor(len*.6) - 1];
      const per80 = slicedHeatmapList[Math.floor(len*.8) - 1];

      return <div className="PV-Heatmap-Legend">
        {ChartAxes[this.props.selectedChartType]}
        <div style={{
          color: COLORS.TAN,
          backgroundColor: COLORS.BLUE
        }}>
          0-{per20}
        </div>
        <div style={{
          backgroundColor: COLORS.GREEN
        }}>
          {per20}-{per40}
        </div>
        <div style={{
          backgroundColor: COLORS.BRIGHT_YELLOW
        }}>
          {per40}-{per60}
        </div>
        <div style={{
          backgroundColor: COLORS.ORANGE
        }}>
          {per60}-{per80}
        </div>
        <div style={{
          backgroundColor: COLORS.RED
        }}>
          {per80}-{slicedHeatmapList[len-1]}
        </div>
      </div>
    }
    return null;
  }

  render() {
    return (
      <Map
        id="mapid"
        ref="map"
        className="PV-map"
        draggable={true}
        // preferCanvas={true}
        viewport={DEFAULT_VIEWPORT}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />
        <GeoJSON key={this.generateKey(this.props.geojsonData)}
                 data={this.props.geojsonData}
                 style={this.getStyle}
                 pointToLayer={this.generateCircleMarker}
                 onEachFeature={(feature,
                   layer) => {
                   layer.on('mouseover', this.handleCurbMouseover);
                   layer.on('mouseout', this.handleCurbMouseout);
                   layer.on('mouseover', (e) => {
                     if (e.target.feature.geometry.type === 'MultiPoint') {
                       this.props.handleSpaceMouseover(e.target.feature.properties.spacename);
                     }
                   }, this);
                   layer.on('mouseout', (e) => {
                     if (e.target.feature.geometry.type === 'MultiPoint') {
                       this.props.handleSpaceMouseout();
                     }
                   }, this);
                   layer.on({
                     click: this.handleCurbClick,
                   });
                 }}
        />
        <Control position="bottomleft">
          <Panel>
            <div className="PV-Map-Control-Revenue">
              {this.props.spaceHovered &&
                <div>Space: {this.props.spaceHovered}</div>
              }
              {this.props.isLoadingSpaceRevenue &&
                <div>Revenue: Loading...</div>
              }
              {this.props.spaceRevenue &&
                <div>Revenue: ${this.props.spaceRevenue}</div>
              }
            </div>
            {this.props.showSpaces && this.renderHeatmapLegend()}
            <div>
              <Button className="PV-Map-Control-Button"
                isDisabled={this.props.isLoadingHeatmapData}
                onClick={this.props.handleToggleShowSpaces}>
                {this.props.isLoadingHeatmapData ? <LoadingIcon /> : null}
                {this.props.showSpaces ? 'Show curbs' : 'Show spaces'}
              </Button>
            </div>
            {!this.props.showSpaces &&
              <div>
                <Button className="PV-Map-Control-Button"
                  onClick={this.props.handleToggleAllCurbs}>
                  {this.props.allCurbsSelected ? 'Deselect all curbs' : 'Select all curbs'}
                </Button>
              </div>
            }
          </Panel>
        </Control>
        <Control position="bottomright">
          <Panel className="PV-Chart-Tools">
            <Panel.Header>Pavement | Visualization Builder</Panel.Header>
            <ChartChooser
              selectedChartType={this.props.selectedChartType}
              handleChartTypeChanged={this.props.handleChartTypeChanged}
            />
            <ChartDateTimePicker
              startDate={this.props.startDate}
              endDate={this.props.endDate}
              handleChartStartDateChanged={this.props.handleChartStartDateChanged}
              handleChartEndDateChanged={this.props.handleChartEndDateChanged}
            />
            <DayChooser
              selectedDay={this.props.selectedDay}
              handleDayChanged={this.props.handleDayChanged}
            />
          </Panel>
        </Control>
        <FeatureGroup>
          {/* <EditControl
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
          /> */}
          <PrintControl filename={'Pavement Export'} ref={(ref) => { this.printControl = ref; }} position="topleft" sizeModes={['Current', 'A4Portrait', 'A4Landscape']} hideControlContainer={false} />
          <PrintControl filename={'Pavement Export'} position="topleft" sizeModes={['Current', 'A4Portrait', 'A4Landscape']} hideControlContainer={false} title="Export as PNG" exportOnly />
        </FeatureGroup>
          {/* <Circle center={[51.51, -0.06]} radius={200} /> */}
        {/* {this.props.showHeatmap &&
          <LoadingIndicator isLoading={this.props.isLoadingHeatmapData} >
            <HeatmapLayer
              max={this.props.maxHeatmapValue}
              blur={1}
              radius={2}
              points={this.props.heatmapData}
              latitudeExtractor={m => m[0]}
              longitudeExtractor={m => m[1]}
              intensityExtractor={m => m[2]} />
          </LoadingIndicator>
          } */}
      </Map>
    );
  }
}

export default MapComponent;
