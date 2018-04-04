import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import MapComponent from '../components/map';
import Header from '../components/header';
import Chart from '../components/chart';
import LucidChart from '../components/chart/lucid-chart';
import ChartTypePicker from '../components/chart-type-picker';

import '../../node_modules/lucid-ui/dist/index.css';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Chart Type Picker', module)
  .add('default', () => <ChartTypePicker />);

storiesOf('Chart', module)
  .add('default', () => <Chart/>)
  .add('lucid', () => <LucidChart/>);

storiesOf('Header', module).add('w/ carto basemap', () => <Header />);
storiesOf('MapComponent', module).add('w/ carto basemap', () => <MapComponent />);
