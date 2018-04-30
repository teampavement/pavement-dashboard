import React, { Component } from 'react';
import { ButtonGroup } from 'lucid-ui';

import {ChartTypes} from '../../constants/chart-types';


class ChartChooser extends Component {
  constructor(props) {
    super(props);

    const selectedIndex = ChartTypes.findIndex((type) => type === this.props.selectedChartType);
    this.state = {
      selectedIndices: [selectedIndex]
    };
    this.handleChartTypeChanged = this.handleChartTypeChanged.bind(this);
  }

  handleChartTypeChanged(index) {
    const newSelectedIndices = [];
    newSelectedIndices.push(index);
    this.setState({
      selectedIndices: newSelectedIndices
    });

    this.props.handleChartTypeChanged(index);
  }
  render() {
    return (
      <ButtonGroup className='PV-Chart-Footer-Left-Button'
        onSelect={this.handleChartTypeChanged}
        selectedIndices={this.state.selectedIndices}>
        <ButtonGroup.Button>Occupancy</ButtonGroup.Button>
        <ButtonGroup.Button>Revenue</ButtonGroup.Button>
        <ButtonGroup.Button>Time</ButtonGroup.Button>
      </ButtonGroup>
    );
  }
}

export default ChartChooser;
