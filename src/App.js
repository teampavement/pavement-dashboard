import React, { Component } from 'react';
import moment from 'moment';
import logo from './logo.svg';
import './App.css';

import api from './utils/api';
import {chartModelFromState, chartModelToState} from './models/chart';

import MapComponent from './components/map';
import Header from './components/header';
import ChartPanel from './components/chart-panel';

import {AsburyParkDemo} from './constants/asbury-park-demo';
import {ChartTypes} from './constants/chart-types';

const segments = [
  AsburyParkDemo.features
];
let features = segments.reduce((a,b) => a.concat(b), []);

const spaces = features.map(feature => feature.properties.space);

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
    this.state = {
      selectedChartType: ChartTypes[0],
      selectedParkingSpaces: spaces,
      geojsonData: APData,
      chartData: {},
      startDate: moment('2017-12-30'),
      endDate: moment('2017-12-31'),
      isLoadingChartData: true,
    }
  }

  componentDidMount() {
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
        chartData: newChartData,
        isLoadingChartData: false,
      });
    })
    .catch((e) => {
    });
  }

  handleChartTypeChanged(chartTypeIndex) {
    this.setState({
        selectedChartType: ChartTypes[chartTypeIndex],
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
            chartData: newChartData,
            isLoadingChartData: false,
          });
        })
        .catch((e) => {
        });
      }
    );
    // api call
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
          chartData: newChartData,
          isLoadingChartData: false,
        });
      })
      .catch((e) => {
      });
    });
  }

  handleChartSaved() {

  }

  render() {
    return (
      <div className="PV-Container">
        <Header />
        <MapComponent geojsonData={this.state.geojsonData} />
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
        />
      </div>
    );
  }
}

export default App;
