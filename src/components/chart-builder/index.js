import React, { Component } from 'react';
import Chart from '../chart';
import ChartDateTimePicker from '../chart-datetime-picker';
import ChartChooser from '../chart-chooser';
import DownloadChart from '../../utils/download-chart';

import {
  Panel,
  DateSelect,
  DropMenu,
  Button,
  SplitButton,
  ButtonGroup
} from 'lucid-ui';

const {
  Control,
  Option
} = DropMenu;

class ChartBuilder extends Component {
  render() {
    return (
      <div className="PV-Chart-Builder">
        {/* <ChartDateTimePicker
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          handleChartStartDateChanged={this.props.handleChartStartDateChanged}
          handleChartEndDateChanged={this.props.handleChartEndDateChanged}
        /> */}
        {/* {(this.props.chartData.length > 0 || this.props.isLoadingChartData) && */}
        {
          <Chart
            selectedDay={this.props.selectedDay}
            selectedChartType={this.props.selectedChartType}
            selectedParkingSpaces={this.props.selectedParkingSpaces}
            chartData={this.props.chartData}
            isLoadingChartData={this.props.isLoadingChartData}
            handleSetChartRef={this.props.handleSetChartRef}
          />
        }
        <div className="PV-Chart-Footer">
          {/* <button className="PV-Save-Button" onClick={this.props.handleChartSaved}>Add new chart</button> */}
          <Button
            className='PV-Right-Button'
            kind='primary'
            isDisabled={this.props.isLoadingChartData || this.props.chartData.length !== 0}
            onClick={this.props.handleCreateChart}>
              Generate chart
          </Button>
          <Button
            className='PV-Right-Button'
            onClick={this.props.handleDownloadChart}
            // isDisabled={this.props.chartData.length === 0}>
            isDisabled={true}>
            Download Chart
          </Button>
        </div>
      </div>
    );
  }
}

export default ChartBuilder;
