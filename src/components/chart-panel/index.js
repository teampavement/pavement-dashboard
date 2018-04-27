import React, { Component } from 'react';
import ChartBuilder from '../chart-builder';
import ChartList from '../chart-list';

class ChartPanel extends Component {
  render() {
    return (
      <div className="PV-Right-Panel">
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
          <ChartList
            chartList={this.props.chartList}
          />
      </div>
    );
  }
}

export default ChartPanel;
