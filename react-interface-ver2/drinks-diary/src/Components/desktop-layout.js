import React, { Component } from 'react'
import Header from './header'


class DesktopLayout extends Component {

    render() {
        return (
            <div id="desktop-layout">
                <Header />

                <div className="page-main">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default DesktopLayout;