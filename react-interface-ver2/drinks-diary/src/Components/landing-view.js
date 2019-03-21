import React, { Component } from 'react'
import logo from '../Images/beverage.svg'


class LandingView extends Component {
  render() {
    return (
        <div id="unauthorized-layout">

            <img src={logo} />

            <div className="main">
                {this.props.children}
            </div>

        </div>
    );
  }
}

export default LandingView;