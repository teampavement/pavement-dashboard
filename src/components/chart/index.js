import React, { Component, createRef } from 'react';
import { Resizer, LineChart, BarChart, Legend, chartConstants, LoadingIndicator } from 'lucid-ui';
import '../../../node_modules/lucid-ui/dist/index.css';

import COLORS from '../../constants/colors';
import {
	ChartTypeMap,
	ChartAxes,
	ChartTitles
} from '../../constants/chart-types';

const xAxisField = 'timestamp';
const yAxisFields = ['value'];

const percentFormatter = new Intl.NumberFormat('en-US', {
	style: 'percent',
});

const currencyFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2,
});

class Chart extends Component {
	constructor(props) {
		super(props);

		this.yAxisFormatter = this.yAxisFormatter.bind(this);
	}

	componentDidUpdate = () => {
		console.log(this.props.children);
	}

	handleRefCallback = (ref) => {
		this.props.handleSetChartRef(ref);
	}

	yAxisFormatter(value) {
		if (this.props.selectedChartType === ChartTypeMap.PARKING_OCCUPANCY) {
			return percentFormatter.format(value);
		} else if (this.props.selectedChartType === ChartTypeMap.PARKING_REVENUE) {
				return currencyFormatter.format(value);
		}
		return value;
	}

	renderChart(width) {
		if (this.props.selectedDay) {
			return <BarChart
				ref={this.handleRefCallback}
				width={width}
				height={300}
				data={this.props.chartData ? this.props.chartData : []}
				xAxisField={xAxisField}
				yAxisFields={yAxisFields}
				yAxisFormatter={this.yAxisFormatter}
				yAxisTitle={ChartAxes[this.props.selectedChartType]}
				colorMap={{
					value: COLORS.BLUE
				}}
			/>;
		} else {
			return <LineChart
					ref={this.handleRefCallback}
					width={width}
					height={300}
					data={this.props.chartData ? this.props.chartData : []}
					xAxisField={xAxisField}
					yAxisFields={yAxisFields}
					yAxisFormatter={this.yAxisFormatter}
					yAxisTitle={ChartAxes[this.props.selectedChartType]}
					colorMap={{
						value: COLORS.BLUE
					}}
				/>;
		}
	}

	render() {
		return (
			<LoadingIndicator isLoading={this.props.isLoadingChartData} className="PV-Chart">
				{
					this.props.listView && this.props.selectedChartType &&
					<div>
						{ChartTitles[this.props.selectedChartType]}
					</div>
				}
				{
					this.props.listView && this.props.startDate &&
					<div>
						From {this.props.startDate.format("MM/DD/YYYY")} to {this.props.endDate.format("MM/DD/YYYY")}
					</div>
				}

				<Resizer>
					{(width) => (this.renderChart(width))}
				</Resizer>

				{
					this.props.listView &&
					<div className="PV-Chart-Footer">
						<button className="PV-Save-Button">View</button>
					</div>
				}

				{/* <Legend style={{ verticalAlign: 'bottom' }}>
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
				</Legend> */}
			</LoadingIndicator>
		);
	}
};

export default Chart;
