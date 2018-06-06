import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import L from 'leaflet';
import booleanContains from '@turf/boolean-contains';

import api, { abortController } from './utils/api';
import DownloadChart from './utils/download-chart';
import {chartModelFromState, chartModelToState} from './models/chart';
import {heatmapModelFromState, heatmapModelToState} from './models/heatmap';
import {spaceModelFromState, spaceModelToState} from './models/space';

import MapComponent from './components/map';
import Alert from './components/alert';
import Header from './components/header';
import ChartPanel from './components/chart-panel';

import {AsburyPark} from './constants/asbury-park';
import {AsburyParkSpaces} from './constants/asbury-park-spaces';
import {ChartTypes, ChartTypeMap} from './constants/chart-types';
import Days from './constants/days';
import initialOccupancy from './constants/initial-occupancy';

const segments = [
  AsburyPark.features
];
let features = segments.reduce((a,b) => a.concat(b), []);

const allSpaces = [].concat(...(features.map(feature => feature.properties.spaces)));
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
    this.handleToggleAllCurbs = this.handleToggleAllCurbs.bind(this);
    this.handleToggleShowSpaces = this.handleToggleShowSpaces.bind(this);
    this.handleShowHeatMap = this.handleShowHeatMap.bind(this);
    this.handleCreateChart = this.handleCreateChart.bind(this);
    this.handleDayChanged = this.handleDayChanged.bind(this);
    // this._getHeatmapIntensityForSpace = this._getHeatmapIntensityForSpace.bind(this);
    this.state = {
      selectedChartType: ChartTypes[0],
      selectedParkingSpaces: [], //allSpaces,
      selectedCurbs: [], //allCurbs,
      maxCurbCount: Object.keys(allCurbs).length,
      geojsonData: APData,
      showSpaces: false,
      spaceHovered: null,
      spaceRevenue: null,
      isLoadingSpaceRevenue: false,
      // chartData: chartModelToState(initialOccupancy.data),
      // chartApiResponseData: initialOccupancy,
      chartData: [],
      chartApiResponseData: null,
      heatmapData: [],
      heatmapApiResponseData: null,
      showHeatmap: false,
      startDate: moment('2017-08-01 09:00:00'),
      endDate: moment('2017-08-02 02:00:00'),
      isLoadingChartData: false,
      isLoadingHeatmapData: false,
      chartList: [],
      showBanner: false,
      bannerMessage: '',
      chartRef: null,
      selectedDay: null,
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
    //get api model
    // let chartModel = chartModelFromState(this.state);

    //api call
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
  // FOR USE WITH HEATMAP LAYER
  // handleShowHeatMap() {
  //   if (this.state.showHeatmap) {
  //     this.setState({
  //       showHeatmap: false,
  //       heatmapData: [],
  //     });
  //     return;
  //   }
  //   this.setState({
  //       isLoadingHeatmapData: true,
  //       heatmapData: [],
  //       showHeatmap: true,
  //     },
  //     () => {
  //       //TODO - UNCOMMENT
  //       //get api model
  //       let heatmapModel = heatmapModelFromState(this.state);
  //
  //       //api call
  //       api(this.state.selectedChartType, 'POST', heatmapModel, {'heatmap': true})
  //       .then((response) => {
  //         //set state
  //         return response.json();
  //       })
  //       .then((payload) => {
  //         let newHeatmapModel = heatmapModelToState(payload.data);
  //         const maxHeatmapValue = newHeatmapModel.reduce((a, b) => {
  //           if (Array.isArray(a)) {
  //             return Math.max(a[2], b[2])
  //           } else {
  //             return Math.max(a, b[2])
  //           }
  //         });
  //         this.setState({
  //           // heatmapApiResponseData: payload,
  //           heatmapData: newHeatmapModel,
  //           maxHeatmapValue,
  //           isLoadingHeatmapData: false,
  //         });
  //       })
  //       .catch((e) => {
  //       });
  //     }
  //   );
  // }

  handleCreateChart() {
    this.setState({
      isLoadingChartData: true,
    },
    () => {
      let chartModel = chartModelFromState(this.state);
      let queryParams = this.state.selectedDay ?
        {'day': this.state.selectedDay}
        : undefined;
      //api call
      api(this.state.selectedChartType, 'POST', chartModel, queryParams)
      .then((response) => {
        //set state
        return response.json();
      })
      .then((payload) => {
        let newChartData = chartModelToState(payload.data, queryParams);
        this.setState({
          chartApiResponseData: payload,
          chartData: newChartData,
          isLoadingChartData: false,
        });
      })
      .catch((e) => {
        this.setState({
          chartData: [],
          isLoadingChartData: false,
        });
      });
    });
  }

  handleShowHeatMap() {
    if (this.state.showHeatmap) {
      this.setState({
        showHeatmap: false,
        heatmapData: [],
      });
      return;
    }
    this.setState({
        isLoadingHeatmapData: true,
        heatmapData: [],
        showHeatmap: true,
      },
      () => {
        //TODO - UNCOMMENT
        //get api model
        let heatmapModel = heatmapModelFromState(this.state);

        //api call
        api(this.state.selectedChartType, 'POST', heatmapModel, {'heatmap': true})
        .then((response) => {
          //set state
          return response.json();
        })
        .then((payload) => {
          const newHeatmapModel = payload.data;
          const maxHeatmapValue = newHeatmapModel.reduce((a, b) => {
            return Math.max(a.value, b.value)
          }, 0);
          this.setState({
            // heatmapApiResponseData: payload,
            heatmapData: newHeatmapModel,
            maxHeatmapValue,
            isLoadingHeatmapData: false,
          }, () => {
            // start - change markers

            let newGeoJsonData = Object.assign({}, APData);

            // add in selected spaces
            let selectedSpacesFeatures = AsburyParkSpaces.features.filter((feature) => {
              return this.state.selectedParkingSpaces.indexOf(feature.properties.spacename) > 0;
            });

            // modify selected spaces to include heatmap value
            selectedSpacesFeatures = selectedSpacesFeatures.map((feature) => {
              const matched = this.state.heatmapData.find((element) => {
                return element.space === feature.properties.spacename;
              });

              if (matched) {
                let newFeature = feature;
                newFeature.properties.heatmapValue = matched.value;
                return newFeature;
              }
              return feature;
            });

            newGeoJsonData.features = newGeoJsonData.features.concat(selectedSpacesFeatures);
            // change geojsonData state
            this.setState({
              geojsonData: newGeoJsonData,
            });
            // end - change markers
          });
        })
        .catch((e) => {
        });
      }
    );
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

  handleToggleAllCurbs() {
    if (this.state.showSpaces) {
      // noop if viewing spaces
      return;
    }

    if (abortController !== undefined) {
      abortController.abort();
    }

    if (this.state.selectedCurbs === allCurbs) {
      // select none
      this.setState({
        chartData: [],
        selectedParkingSpaces: [],
        selectedCurbs: [],
        maxCurbCount: 0,
      });
    } else {
      this.setState({
        chartData: [],
        selectedParkingSpaces: allSpaces,
        selectedCurbs: allCurbs,
        maxCurbCount: Object.keys(allCurbs).length,
      });
    }
  }

  handleToggleShowSpaces() {
    // if toggle off, just revert to original
    if (this.state.showSpaces) {
      let newGeoJsonData = Object.assign({}, APData);
      // change geojsonData state
      this.setState({
        geojsonData: newGeoJsonData,
        showSpaces: !this.state.showSpaces
      });
      return;
    }

    if (!this.state.showSpaces && this.state.selectedParkingSpaces.length > 0) {
      this.setState({
        isLoadingHeatmapData: true,
      },
        () => {
          // this.handleShowBanner('Loading spaces can take some time so please wait if you don\'t see anything.');
          let heatmapModel = heatmapModelFromState(this.state);

          //api call
          api(this.state.selectedChartType, 'POST', heatmapModel, {'heatmap': true})
          .then((response) => {
            //set state
            return response.json();
          })
          .then((payload) => {
            const newHeatmapModel = payload.data;
            // const maxHeatmapValue = newHeatmapModel.reduce((a, b) => {
            //   if (typeof a === 'object') {
            //     return Math.max(a.value, b.value);
            //   } else {
            //     return Math.max(a, b.value);
            //   }
            // }, {value: 0});

            let heatmapValues = newHeatmapModel.map(h => h.value);
            heatmapValues.sort(function(a, b){return a-b});

            this.setState({
              // heatmapApiResponseData: payload,
              heatmapData: newHeatmapModel,
              heatmapValues,
              isLoadingHeatmapData: false,
            }, () => {
              // filter out selected curbs
              let newGeoJsonData = Object.assign({}, APData);
              newGeoJsonData.features = newGeoJsonData.features.filter((feature) => {
                return !this.state.selectedCurbs[feature.properties.curbline_id];
              });
              // add in selected spaces
              let selectedSpacesFeatures = AsburyParkSpaces.features.filter((feature) => {
                return this.state.selectedParkingSpaces.indexOf(feature.properties.spacename) > 0;
              });

              if (selectedSpacesFeatures.length < 1) {
                this.handleShowBanner('Whoops, couldn\'t find any associated spaces for the curb/curbs you selected. ' +
                'Select some new curbs and try again?');
                return;
              }

              // modify selected spaces to include heatmap value
              selectedSpacesFeatures = selectedSpacesFeatures.map((feature) => {
                const matched = this.state.heatmapData.find((element) => {
                  return element.space === feature.properties.spacename;
                });

                if (matched) {
                  let newFeature = feature;
                  newFeature.properties.heatmapValue = matched.value;
                  return newFeature;
                }
                return feature;
              });

              newGeoJsonData.features = newGeoJsonData.features.concat(selectedSpacesFeatures);
              // change geojsonData state
              this.setState({
                geojsonData: newGeoJsonData,
                showSpaces: !this.state.showSpaces
              });
            });
          });
        }
      );
    }

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

    if (abortController !== undefined) {
      abortController.abort();
    }

    this.setState({
      selectedCurbs: newSelectedCurbs,
      selectedParkingSpaces: newSelectedParkingSpaces,
      chartData: [],
      heatmapData: [],
    });
  }

  handleChartTypeChanged(chartTypeIndex) {
    if (this.state.showSpaces) {
      this.handleToggleShowSpaces();
    }
    if (abortController !== undefined) {
      abortController.abort();
    }
    this.setState({
      selectedChartType: ChartTypes[chartTypeIndex],
      chartData: [],
      showHeatmap: false,
      heatmapData: [],
    });
  }

  handleDayChanged(day) {
    if (abortController !== undefined) {
      abortController.abort();
    }
    this.setState({
      selectedDay: Days[day],
      chartData: [],
      showHeatmap: false,
      heatmapData: [],
    });
  }

  handleChartStartDateChanged(date) {
    if (this.state.showSpaces) {
      this.handleToggleShowSpaces();
    }
    if (abortController !== undefined) {
      abortController.abort();
    }

    if (date > this.state.endDate) {
      // delete endDate
      this.setState({
        startDate: date,
        endDate: null,
        chartData: [],
        showHeatmap: false,
        heatmapData: [],
      });
    } else {
      this.setState({
        startDate: date,
        chartData: [],
        showHeatmap: false,
        heatmapData: [],
      });
    }
  }

  handleChartEndDateChanged(date) {
    if (this.state.showSpaces) {
      this.handleToggleShowSpaces();
    }
    if (abortController !== undefined) {
      abortController.abort();
    }

    if (date < this.state.startDate) {
      this.setState({
        startDate: null,
        endDate: date,
        chartData: [],
        showHeatmap: false,
        heatmapData: [],
      });
    } else {
      this.setState({
        endDate: date,
        chartData: [],
        showHeatmap: false,
        heatmapData: [],
      });
    }

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

  handleDownloadChart = () => {
    DownloadChart(this.state.chartRef, "Pavement_Exported_Chart");
    return;
  }

  handleSetChartRef = (chartRef) => {
    this.setState({
      chartRef: chartRef,
    });
  }

  handleSpaceMouseover = (spacename) => {
    if (this.state.selectedChartType !== ChartTypeMap.PARKING_REVENUE) {
      return;
    }
    this.setState({
      spaceHovered: spacename,
      isLoadingSpaceRevenue: true,
    },
      () => {
        if (abortController !== undefined) {
          abortController.abort();
        }
        setTimeout(() => {
          // call api
          let spaceModel = spaceModelFromState(this.state);
          //api call
          api(this.state.selectedChartType, 'POST', spaceModel, {'sum': true})
          .then((response) => {
            //set state
            return response.json();
          })
          .then((payload) => {
            let spaceRevenueData = spaceModelToState(payload);
            this.setState({
              spaceRevenue: spaceRevenueData.value,
              isLoadingSpaceRevenue: false,
            });
          })
          .catch((e) => {
            this.setState({
              spaceRevenue: null,
              isLoadingSpaceRevenue: false
            });
          });
        }, 1000)
      }
    );
  }

  handleSpaceMouseout = () => {
    this.setState({
      spaceRevenue: null,
      spaceHovered: null,
      isLoadingSpaceRevenue: false
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
          handleToggleAllCurbs={this.handleToggleAllCurbs}
          allCurbsSelected={this.state.selectedCurbs === allCurbs}
          handleToggleShowSpaces={this.handleToggleShowSpaces}
          showSpaces={this.state.showSpaces}
          showHeatmap={this.state.showHeatmap}
          heatmapData={this.state.heatmapData}
          isLoadingHeatmapData={this.state.isLoadingHeatmapData}
          heatmapValues={this.state.heatmapValues}
          handleChartTypeChanged={this.handleChartTypeChanged}
          selectedChartType={this.state.selectedChartType}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          handleChartStartDateChanged={this.handleChartStartDateChanged}
          handleChartEndDateChanged={this.handleChartEndDateChanged}
          selectedDay={this.props.selectedDay}
          handleDayChanged={this.handleDayChanged}
          handleShowHeatMap={this.handleShowHeatMap}
          spaceHovered={this.state.spaceHovered}
          spaceRevenue={this.state.spaceRevenue}
          isLoadingSpaceRevenue={this.state.isLoadingSpaceRevenue}
          handleSpaceMouseout={this.handleSpaceMouseout}
          handleSpaceMouseover={this.handleSpaceMouseover}
        />
        <ChartPanel
          showSpaces={this.state.showSpaces}
          selectedDay={this.state.selectedDay}
          handleDownloadChart={this.handleDownloadChart}
          handleSetChartRef={this.handleSetChartRef}
          selectedParkingSpaces={this.state.selectedParkingSpaces}
          chartData={this.state.chartData}
          selectedChartType={this.state.selectedChartType}
          isLoadingChartData={this.state.isLoadingChartData}
          handleCreateChart={this.handleCreateChart}
          chartList={this.state.chartList}
          handleChartSaved={this.handleChartSaved}
          showHeatmap={this.state.showHeatmap}
        />
      </div>
    );
  }
}

export default App;
