import React, { Component } from 'react';
import L from 'leaflet';
import Chart from '../chart';

class ChartList extends Component {
  componentDidMount(props) {
    var elem = L.DomUtil.get('chart-list');
    // L.DomEvent.on(elem, 'mousewheel', L.DomEvent.stopPropagation);
    L.DomEvent.disableScrollPropagation(elem);
  }
  render() {
    return (
      <ul id='chart-list' className="PV-Chart-List"
        style={{
          textAlign: 'center',
        }}>
        {
          this.props.chartList.length > 0 &&
            <div>
              {
                this.props.chartList.map((item, index) => {
                  return <li>
                    <Chart
                      key={index}
                      selectedChartType={item.selectedChartType}
                      startDate={item.startDate}
                      endDate={item.endDate}
                      chartData={item.chartData}
                      listView={true}/>
                  </li>
                })
              }
            </div>
        }
      </ul>
    );
  }
}

export default ChartList;
