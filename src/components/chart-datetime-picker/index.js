import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

class ChartDateTimePicker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="PV-Chart-Date-Time-Picker">
        <div className="PV-Chart-Date-Time-Picker-Half">
          From
          <DatePicker
            selected={this.props.startDate}
            selectsStart
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            onChange={this.props.handleChartStartDateChanged}
          />

          </div>
        <div className="PV-Chart-Date-Time-Picker-Half">
          To
          <DatePicker
            selected={this.props.endDate}
            selectsEnd
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            onChange={this.props.handleChartEndDateChanged}
          />
        </div>
      </div>
    );
  }
}

export default ChartDateTimePicker;
