import React, { Component } from 'react';
import { Resizer, LineChart, Legend, chartConstants, LoadingIndicator } from 'lucid-ui';
import '../../../node_modules/lucid-ui/dist/index.css';

import COLORS from '../../constants/colors';
import {ChartAxes} from '../../constants/chart-types';

const data = [
	{ timestamp: new Date("2018-02-01T05:00:00.000Z"), value: 2 },
	{ timestamp: new Date(2018, 1, 1,  1), value: 2 },
	{ timestamp: new Date(2018, 1, 1, 2), value: 3 },
	{ timestamp: new Date(2018, 1, 1, 3), value: 5 },
	{ timestamp: new Date(2018, 1, 1, 4), value: 14 },
	{ timestamp: new Date(2018, 1, 1, 5), value: 7 },
	{ timestamp: new Date(2018, 1, 1, 6), value: 7 },
	{ timestamp: new Date(2018, 1, 1, 7), value: 7 },
	{ timestamp: new Date(2018, 1, 1, 8), value: 7 },
	{ timestamp: new Date(2018, 1, 1, 9), value: 7 },
	{ timestamp: new Date(2018, 1, 1, 10), value: 7 },
	{ timestamp: new Date(2018, 1, 1, 11), value: 7 },
	{ timestamp: new Date(2018, 1, 1, 12), value: 7 },
	{ timestamp: new Date(2018, 1, 1, 13), value: 7 },
	{ timestamp: new Date(2018, 1, 1, 14), value: 7 },
	{ timestamp: new Date(2018, 1, 1, 15), value: 7 },
	{ timestamp: new Date(2018, 1, 1, 16), value: 7 },
	{ timestamp: new Date(2018, 1, 1, 17), value: 7 },
	{ timestamp: new Date(2018, 1, 1, 18), value: 7 },
	{ timestamp: new Date(2018, 1, 1, 19), value: 7 },
	{ timestamp: new Date(2018, 1, 1, 20), value: 7 },
	{ timestamp: new Date(2018, 1, 1, 21), value: 7 },
	{ timestamp: new Date(2018, 1, 1, 22), value: 7 },
	{ timestamp: new Date(2018, 1, 1, 23), value: 7 },
];
const xAxisField = ['timestamp'];
const yAxisFields = ['value'];

class Chart extends Component {
	render() {
		return (
			<LoadingIndicator isLoading={this.props.isLoadingChartData} className="PV-Chart">
				<Resizer>
					{(width) => (
						<LineChart
							width={width}
							height={300}
							data={this.props.chartData ? this.props.chartData : data}
							xAxisField={xAxisField}
							yAxisFields={yAxisFields}
							yAxisTitle={ChartAxes[this.props.selectedChartType]}
							colorMap={{
								value: COLORS.BLUE
							}}
						/>
				)}
				</Resizer>

				<Legend style={{ verticalAlign: 'bottom' }}>
					{yAxisFields.map((field, i) => {
						return <Legend.Item
							key={field}
							hasPoint
							hasLine
							color={COLORS.BLUE}
							pointKind={i}
						>
							{field}
						</Legend.Item>
					})}
				</Legend>
			</LoadingIndicator>
		);
	}
};

export default Chart;
