import React, { Component } from 'react';
import { Banner } from 'lucid-ui';

class Alert extends Component {
  render() {
    return (
      <div className="PV-Banner-Container">
        <Banner
          kind='danger'
          className='PV-Banner'
          isCloseable={false}
          isClosed={this.props.isClosed}>
            {this.props.message}
        </Banner>
      </div>
    );
  }
}

export default Alert;
