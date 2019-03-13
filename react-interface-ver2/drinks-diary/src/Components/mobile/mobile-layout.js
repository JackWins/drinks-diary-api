import React, { Component } from 'react'
import Header from './header'
import Utility from './utility'


class MobileLayout extends Component {

    render() {
        return (
            <div id="mobile-layout">
                <Header />
                <Utility />

                <div className="page-main">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default MobileLayout;