import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import L from 'leaflet';
import booleanContains from '@turf/boolean-contains';

import api from './utils/api';
import {chartModelFromState, chartModelToState} from './models/chart';

import MapComponent from './components/map';
import Alert from './components/alert';
import Header from './components/header';
import ChartPanel from './components/chart-panel';

import {AsburyPark} from './constants/asbury-park';
import {AsburyParkSpaces} from './constants/asbury-park-spaces';
import {ChartTypes} from './constants/chart-types';
import initialOccupancy from './constants/initial-occupancy';

const segments = [
  AsburyPark.features
];
let features = segments.reduce((a,b) => a.concat(b), []);

const allSpaces = [].concat(...(features.map(feature => feature.properties.spaces)));
// const allSpaces = features.reduce((map, feature) => {
//     return feature.properties.spaces.reduce((map, space) => {
//       map[space] = true;
//     });
// }, {});
const allCurbs = features.reduce((map, feature) => {
    map[feature.properties.curbline_id] = true;
    return map;
}, {});

const APData = {
  type: "FeatureCollection",
  features: features
};

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChartTypeChanged = this.handleChartTypeChanged.bind(this);
    this.handleChartStartDateChanged = this.handleChartStartDateChanged.bind(this);
    this.handleChartEndDateChanged = this.handleChartEndDateChanged.bind(this);
    this._handleDrawStop = this._handleDrawStop.bind(this);
    this.handleChartSaved = this.handleChartSaved.bind(this);
    this.handleCurbSelected = this.handleCurbSelected.bind(this);
    this.handleSelectAllCurbs = this.handleSelectAllCurbs.bind(this);
    this.handleToggleShowSpaces = this.handleToggleShowSpaces.bind(this);
    // this._getHeatmapIntensityForSpace = this._getHeatmapIntensityForSpace.bind(this);
    this.state = {
      selectedChartType: ChartTypes[0],
      selectedParkingSpaces: allSpaces,
      selectedCurbs: allCurbs,
      maxCurbCount: Object.keys(allCurbs).length,
      geojsonData: APData,
      showSpaces: false,
      chartData: chartModelToState(initialOccupancy.data),
      chartApiResponseData: initialOccupancy,
      startDate: moment('2017-8-1'),
      endDate: moment('2017-8-4'),
      isLoadingChartData: false,
      chartList: [],
      showBanner: false,
      bannerMessage: '',
    }
  }

  _getHeatmapIntensityForSpace(feature) {
    const space = feature.properties.space;
    if (space) {

    }

    return 0;
  }

  _handleDrawStop(e) {
    //iterate over GeoJSON

    // //use booleanContains(feature, e.target) to filter the selected area
    // const parkingSpacesInRegion = this.state.geojsonData.features.map((feature) => {
    //   debugger;
    //   if (e.target.getBounds().contains(L.latLng(feature.geometry.coordinates))) {
    //     debugger;
    //     return feature.properties.space;
    //   }
    // });
    //
    // //update state
    // //retrigger api
    // this.setState({
    //     selectedParkingSpaces: parkingSpacesInRegion,
    //     isLoadingChartData: true,
    //     chartData: {},
    //   },
    //   () => {
    //     //get api model
    //     let chartModel = chartModelFromState(this.state);
    //
    //     //api call
    //     api(this.state.selectedChartType, 'POST', chartModel)
    //     .then((response) => {
    //       //set state
    //       return response.json();
    //     })
    //     .then((payload) => {
    //       let newChartData = chartModelToState(payload.data);
    //       this.setState({
    //         chartApiResponseData: payload,
    //         chartData: newChartData,
    //         isLoadingChartData: false,
    //       });
    //     })
    //     .catch((e) => {
    //     });
    //   }
    // );
  }

  _handleDrawDeleted(e) {

  }

  componentDidMount() {
    // //get api model
    // let chartModel = chartModelFromState(this.state);
    //
    // //api call
    // api(this.state.selectedChartType, 'POST', chartModel)
    // .then((response) => {
    //   //set state
    //   return response.json();
    // })
    // .then((payload) => {
    //   let newChartData = chartModelToState(payload.data);
    //   this.setState({
    //     chartApiResponseData: payload,
    //     chartData: newChartData,
    //     isLoadingChartData: false,
    //   });
    // })
    // .catch((e) => {
    // });
  }

  handleShowBanner(message, duration) {
    if (!duration) {
      duration = 5000;
    }
    // set bannerMessage
    // show banner
    this.setState({
      showBanner: true,
      bannerMessage: message
    });

    // setTimeout, hide banner
    setTimeout(() => {
      this.setState({
        showBanner: false,
        bannerMessage: ''
      })
    }, duration);
  }

  handleSelectAllCurbs() {
    if (this.state.showSpaces) {
      // noop if viewing spaces
      return;
    }

    this.setState({
      selectedParkingSpaces: allSpaces,
      selectedCurbs: allCurbs,
      maxCurbCount: Object.keys(allCurbs).length,
    });
  }

  handleToggleShowSpaces() {
    // hard limit of 500 spaces
    if (this.state.selectedParkingSpaces.length > 500) {
      this.handleShowBanner('Sorry, you can\'t do that right now 😢 We can only show 500 individual spaces, or else things get very slow. ' +
      'Please select fewer curbs and try again?', 10000)
      return;
    }

    // if toggle off, just revert to original
    let newGeoJsonData = Object.assign({}, APData);
    if (!this.state.showSpaces && this.state.selectedParkingSpaces.length > 0) {
      // filter out selected curbs
      newGeoJsonData.features = newGeoJsonData.features.filter((feature) => {
        return !this.state.selectedCurbs[feature.properties.curbline_id];
      });
      // add in selected spaces
      const selectedSpacesFeatures = AsburyParkSpaces.features.filter((feature) => {
        return this.state.selectedParkingSpaces.indexOf(feature.properties.spacename) > 0;
      });

      if (selectedSpacesFeatures.length < 1) {
        this.handleShowBanner('Whoops, couldn\'t find any associated spaces for the curb/curbs you selected. ' +
        'Select some new curbs and try again?');
        return;
      }

      newGeoJsonData.features = newGeoJsonData.features.concat(selectedSpacesFeatures);
    }
    // change geojsonData state
    this.setState({
      geojsonData: newGeoJsonData,
      showSpaces: !this.state.showSpaces
    });
  }

  handleCurbSelected(curb) {
    if (this.state.showSpaces) {
      // noop if viewing spaces
      return;
    }
    // if all selected, deselect all and add the selected curb to selected list
    console.log(curb);
    let newSelectedCurbs = this.state.selectedCurbs;
    const selectedCurbCount = Object.values(this.state.selectedCurbs).reduce((prev, val) => {
      return val ? prev + 1 : prev;
    }, 0);
    if (this.state.maxCurbCount === selectedCurbCount) {
      newSelectedCurbs = Object.keys(this.state.selectedCurbs).reduce((map, curbline_id) => {
          map[curbline_id] = false;
          return map;
      }, {});
      this.setState({
        selectedCurbs: newSelectedCurbs,
      });
    }
    // next add/remove the selected curb to/from selected list
    newSelectedCurbs[curb.properties.curbline_id] = !newSelectedCurbs[curb.properties.curbline_id];

    //recalculate selected parking spaces
    let newSelectedParkingSpaces = [];
    this.state.geojsonData.features.map((feature) => {
      if (newSelectedCurbs[feature.properties.curbline_id]) {
        newSelectedParkingSpaces = [].concat(newSelectedParkingSpaces, feature.properties.spaces);
      }
    });
    this.setState({
      selectedCurbs: newSelectedCurbs,
      selectedParkingSpaces: newSelectedParkingSpaces,
    });
  }

  handleChartTypeChanged(chartTypeIndex) {
    this.setState({
        selectedChartType: ChartTypes[chartTypeIndex],
        isLoadingChartData: true,
        chartData: {},
      },
      () => {
        // //get api model
        // let chartModel = chartModelFromState(this.state);
        //
        // //api call
        // api(this.state.selectedChartType, 'POST', chartModel)
        // .then((response) => {
        //   //set state
        //   return response.json();
        // })
        // .then((payload) => {
        //   let newChartData = chartModelToState(payload.data);
        //   this.setState({
        //     chartApiResponseData: payload,
        //     chartData: newChartData,
        //     isLoadingChartData: false,
        //   });
        // })
        // .catch((e) => {
        // });
      }
    );
  }

  handleChartStartDateChanged(date) {
    this.setState({
      startDate: date,
      isLoadingChartData: true,
      chartData: {},
    },
    () => {
      //get api model
      let chartModel = chartModelFromState(this.state);

      //api call
      api(this.state.selectedChartType, 'POST', chartModel)
      .then((response) => {
        //set state
        return response.json();
      })
      .then((payload) => {
        let newChartData = chartModelToState(payload.data);
        this.setState({
          chartApiResponseData: payload,
          chartData: newChartData,
          isLoadingChartData: false,
        });
      })
      .catch((e) => {
      });
    });
  }

  handleChartEndDateChanged(date) {
    this.setState({
      endDate: date,
      isLoadingChartData: true,
      chartData: {},
    },
    () => {
      //get api model
      let chartModel = chartModelFromState(this.state);

      //api call
      api(this.state.selectedChartType, 'POST', chartModel)
      .then((response) => {
        //set state
        return response.json();
      })
      .then((payload) => {
        let newChartData = chartModelToState(payload.data);
        this.setState({
          chartApiResponseData: payload,
          chartData: newChartData,
          isLoadingChartData: false,
        });
      })
      .catch((e) => {
      });
    });
  }

  handleChartSaved() {
    const newChartList = this.state.chartList;
    newChartList.unshift({
      selectedChartType: this.state.selectedChartType,
      chartData: this.state.chartData,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    });
    this.setState({
      chartList: newChartList
    });
  }

  render() {
    return (
      <div className="PV-Container">
        <Header />
        <Alert
          isClosed={!this.state.showBanner}
          message={this.state.bannerMessage}
        />
        <MapComponent
          geojsonData={this.state.geojsonData}
          selectedCurbs={this.state.selectedCurbs}
          selectedParkingSpaces={this.state.selectedParkingSpaces}
          handleDrawStop={this._handleDrawStop}
          handleCurbSelected={this.handleCurbSelected}
          handleSelectAllCurbs={this.handleSelectAllCurbs}
          handleToggleShowSpaces={this.handleToggleShowSpaces}
          showSpaces={this.state.showSpaces}
        />
        <ChartPanel
          selectedParkingSpaces={this.state.selectedParkingSpaces}
          chartData={this.state.chartData}
          selectedChartType={this.state.selectedChartType}
          handleChartTypeChanged={this.handleChartTypeChanged}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          isLoadingChartData={this.state.isLoadingChartData}
          handleChartStartDateChanged={this.handleChartStartDateChanged}
          handleChartEndDateChanged={this.handleChartEndDateChanged}
          chartList={this.state.chartList}
          handleChartSaved={this.handleChartSaved}
        />
      </div>
    );
  }
}

export default App;
