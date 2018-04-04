import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className="PV-Header">
        <div className="logo">Pavement</div>
        <div className="logo">City of Asbury Park</div>
        <a className="right-buttons">Logout</a>
      </div>
    );
  }
}

export default Header;
