import React, { Component } from 'react';
import { ButtonGroup } from 'lucid-ui';

import {Days} from '../../constants/days';


class DayChooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndices: []
    };

    this.handleDayChanged = this.handleDayChanged.bind(this);
  }

  handleDayChanged(index) {
    const newSelectedIndices = [];
    if (this.state.selectedIndices.indexOf(index) >= 0) {
      // clicked the same day? toggle off
      newSelectedIndices.shift();
      this.props.handleDayChanged(null);
    } else {
      newSelectedIndices.push(index);
      this.props.handleDayChanged(index);
    }

    this.setState({
      selectedIndices: newSelectedIndices
    });
  }
  render() {
    return (
      <ButtonGroup className='PV-Chart-Footer-Left-Button'
        onSelect={this.handleDayChanged}
        selectedIndices={this.state.selectedIndices}>
        <ButtonGroup.Button>M</ButtonGroup.Button>
        <ButtonGroup.Button>Tu</ButtonGroup.Button>
        <ButtonGroup.Button>W</ButtonGroup.Button>
        <ButtonGroup.Button>Th</ButtonGroup.Button>
        <ButtonGroup.Button>F</ButtonGroup.Button>
        <ButtonGroup.Button>Sa</ButtonGroup.Button>
        <ButtonGroup.Button>Su</ButtonGroup.Button>
      </ButtonGroup>
    );
  }
}

export default DayChooser;
