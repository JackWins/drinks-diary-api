import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../Images/beverage.svg'
import profile from '../Images/default_profile.png'
import '../Style/style.css'


class Header extends Component {
  
  static contextTypes = {
    router: () => true,
  }
  
  render() {
    return (
      <div className="header">

          <div className="header-back">
              <button className="button button-box" onClick={this.context.router.history.goBack}>
                <i class="fas fa-long-arrow-alt-left"></i> Back
              </button>
          </div>

          <img className="header-logo" src={logo} />

          <div className="header-right">
              <Link to="/account" className="header-account">
                  <img className="header-account-profile" src={profile} />
                  
                  <div className="header-account-info">
                    <h5 className="header-account-greeeting">Welcome User</h5>
                    <h6 className="header-account-settings"><i class="fas fa-cog"></i> My Account</h6>
                  </div>

                  <i class="fas fa-chevron-right"></i>
              </Link>

              <div className="header-helper">
                  <button className="button button-lg" id="display-help"><i class="fas fa-question"></i></button>
                  <button className="button button-lg" id="play-help-message"><i class="fas fa-volume-up"></i></button>
              </div>
          </div>

      </div>
    );
  }
}

export default Header;
