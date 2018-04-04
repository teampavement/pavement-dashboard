import React, { Component } from 'react';
import { Tabs } from 'lucid-ui';

class ChartChooser extends Component {
  render() {
    return (
      <Tabs className="PV-Chart-Chooser"
        isNavigation={true}
        onSelect={this.props.handleChartTypeChanged}>
        <Tabs.Tab Title="Occupancy" className="PV-Chart-Option" />
        <Tabs.Tab Title="Revenue" className="PV-Chart-Option" />
        <Tabs.Tab Title="Time" className="PV-Chart-Option" />
      </Tabs>
    );
  }
}

export default ChartChooser;
