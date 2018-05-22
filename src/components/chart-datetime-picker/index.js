import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

import { ButtonGroup } from 'lucid-ui';

import 'react-datepicker/dist/react-datepicker.css';

class ChartDateTimePicker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="PV-Chart-Date-Time-Picker">

        <div>
          <span>From</span>
          <DatePicker
            ref={this.startPicker}
            selected={this.props.startDate}
            selectsStart
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            onChange={this.props.handleChartStartDateChanged}
            withPortal
          >
            <div className="PV-Date-Time-Picker-Subtitle">Select the beginning of the date range</div>
            <div className="PV-Date-Time-Picker-Subtitle">(Press escape to close)</div>
          </DatePicker>

        </div>
        <div>
          <span>To</span>
          <DatePicker
            ref={this.endPicker}
            selected={this.props.endDate}
            selectsEnd
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            onChange={this.props.handleChartEndDateChanged}
            withPortal
          >
            <div className="PV-Date-Time-Picker-Subtitle">Select the end of the date range</div>
            <div className="PV-Date-Time-Picker-Subtitle">(Press escape to close)</div>
          </DatePicker>
        </div>

        {/* <ButtonGroup>
          <ButtonGroup.Button>F</ButtonGroup.Button>
          <ButtonGroup.Button>Sa</ButtonGroup.Button>
          <ButtonGroup.Button>Su</ButtonGroup.Button>
        </ButtonGroup> */}
      </div>
    );
  }
}

export default ChartDateTimePicker;
