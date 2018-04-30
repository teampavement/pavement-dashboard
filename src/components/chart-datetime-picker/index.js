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
            selected={this.props.startDate}
            selectsStart
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            onChange={this.props.handleChartStartDateChanged}
          />

        </div>
        <div>
          <span>To</span>
          <DatePicker
            selected={this.props.endDate}
            selectsEnd
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            onChange={this.props.handleChartEndDateChanged}
          />
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
