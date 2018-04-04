import React, { Component } from 'react';
import Chart from '../chart';
import ChartDateTimePicker from '../chart-datetime-picker';
import ChartChooser from '../chart-chooser';

import { DateSelect, DropMenu, Button } from 'lucid-ui';

const { Control, Option } = DropMenu;

class ChartBuilder extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="PV-Chart-Builder">
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
        <Chart
          selectedChartType={this.props.selectedChartType}
          selectedParkingSpaces={this.props.selectedParkingSpaces}
          chartData={this.props.chartData}
          isLoadingChartData={this.props.isLoadingChartData}
        />
        <div className="PV-Chart-Builder-Footer">
          <button className="PV-Save-Button">Save chart</button>
        </div>
      </div>
    );
  }
}

export default ChartBuilder;
