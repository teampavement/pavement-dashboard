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
      <ExpanderPanel className='PV-Chart-Panel' hasPadding={false}>
        <ExpanderPanel.Header>
          Chart
          {this.props.selectedChartType &&
            <span> - {ChartTitles[this.props.selectedChartType]}</span>
          }
          {this.props.selectedDay &&
            <span> - Average {this.props.selectedDay}</span>
          }
        </ExpanderPanel.Header>
          <ChartBuilder
            selectedDay={this.props.selectedDay}
            selectedParkingSpaces={this.props.selectedParkingSpaces}
            chartData={this.props.chartData}
            selectedChartType={this.props.selectedChartType}
            handleChartTypeChanged={this.props.handleChartTypeChanged}
            handleChartStartDateChanged={this.props.handleChartStartDateChanged}
            handleChartEndDateChanged={this.props.handleChartEndDateChanged}
            handleCreateChart={this.props.handleCreateChart}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            isLoadingChartData={this.props.isLoadingChartData}
            handleChartSaved={this.props.handleChartSaved}
            handleShowHeatMap={this.props.handleShowHeatMap}
            showHeatmap={this.props.showHeatmap}
            showSpaces={this.props.showSpaces}
            handleDownloadChart={this.props.handleDownloadChart}
            handleSetChartRef={this.props.handleSetChartRef}
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
