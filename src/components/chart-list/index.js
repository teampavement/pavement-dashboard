import React, { Component } from 'react';
import Chart from '../chart';

class ChartList extends Component {
  render() {
    return (
      <ul className="PV-Chart-List"
        style={{
          textAlign: 'center',
        }}>
        {
          this.props.chartList.length > 0 ?
            <div>
              {
                this.props.chartList.map((item) => {
                  return <li>
                    <Chart
                      key={Math.random()}
                      selectedChartType={item.selectedChartType}
                      startDate={item.startDate}
                      endDate={item.endDate}
                      chartData={item.chartData}/>
                  </li>
                })
              }
            </div>
            :
            <div>
              Create and save a chart above!
            </div>
        }
      </ul>
    );
  }
}

export default ChartList;
