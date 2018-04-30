import React, { Component } from 'react';
import { ExpanderPanel } from 'lucid-ui';

import {ChartTitles} from '../../constants/chart-types';
import ChartBuilder from '../chart-builder';
import ChartList from '../chart-list';

class ChartPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChartBuilderExpanded: true
    };
  }

  render() {
    return (
      <ExpanderPanel className='PV-Chart-Panel' hasPadding={false} style={{
        zIndex: 400,
        position: 'absolute',
        top: 90,
        right: 10,
        maxHeight: '80vh',
        borderColor: '#4A4A4A'
      }}>
        <ExpanderPanel.Header>Chart Builder — {ChartTitles[this.props.selectedChartType]}</ExpanderPanel.Header>
          <ChartBuilder
            selectedParkingSpaces={this.props.selectedParkingSpaces}
            chartData={this.props.chartData}
            selectedChartType={this.props.selectedChartType}
            handleChartTypeChanged={this.props.handleChartTypeChanged}
            handleChartStartDateChanged={this.props.handleChartStartDateChanged}
            handleChartEndDateChanged={this.props.handleChartEndDateChanged}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            isLoadingChartData={this.props.isLoadingChartData}
            handleChartSaved={this.props.handleChartSaved}
          />
          {/* <hr />
          <ChartList
            chartList={this.props.chartList}
          /> */}
      </ExpanderPanel>
    );
  }
}

export default ChartPanel;
