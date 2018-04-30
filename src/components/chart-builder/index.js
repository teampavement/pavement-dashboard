import React, { Component } from 'react';
import Chart from '../chart';
import ChartDateTimePicker from '../chart-datetime-picker';
import ChartChooser from '../chart-chooser';
import { Panel } from 'lucid-ui';

import {
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
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="PV-Chart-Builder">
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
        <div className="PV-Chart-Footer">
          {/* <button className="PV-Save-Button" onClick={this.props.handleChartSaved}>Add new chart</button> */}
          <ChartChooser
            selectedChartType={this.props.selectedChartType}
            handleChartTypeChanged={this.props.handleChartTypeChanged}
          />
          <Button className='PV-Right-Button'>Export chart and map</Button>
        </div>
      </div>
    );
  }
}

export default ChartBuilder;
