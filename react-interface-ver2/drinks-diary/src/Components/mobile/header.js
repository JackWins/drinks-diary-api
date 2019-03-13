import React, { Component } from 'react'
import Logo from '../../Images/beverage.svg'


class Header extends Component {

    render() {
        return (
            <div id="page-header">

                <img className="header-logo" src={Logo}></img>

            </div>
        )
    }
}

export default Header;