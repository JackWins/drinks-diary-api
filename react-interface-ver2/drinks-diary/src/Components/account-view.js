import React, { Component } from 'react'
import default_pic from '../Images/default_profile.png'
import '../Style/style.css'


class AccountView extends Component {
  render() {
    return (
        <div id="account-view">
            
            <div className="account-col-1">
                <div className="profile-picture">
                    <img src={default_pic} />
                    <div className="profile-picture-edit"><i className="fa fa-pencil-alt"></i> Edit</div>
                </div>
                <h2>John Smith</h2>
            </div>
            
            <div className="account-col-2">
                <div className="account-section">
                    <div className="section-header">
                        <h3 className="section-title">About</h3>
                    </div>
                    
                    <div className="section-info-entry">
                        <h4 className="type">Gender:</h4>
                        <p className="value">Male</p>
                    </div>

                    <div className="section-info-entry">
                        <h4 className="type">Date of Birth:</h4>
                        <p className="value">10/05/1997</p>
                    </div>

                    <div className="section-info-entry">
                        <h4 className="type">Age:</h4>
                        <p className="value">21</p>
                    </div>

                </div>

                <div className="account-section">
                    <div className="section-header">
                        <h3 className="section-title">Account Details</h3>
                        <button className="button button-sm"><i className="fa fa-pencil-alt"></i> Edit</button>
                    </div>

                    <div className="section-info-entry">
                        <h4 className="type">E-mail:</h4>
                        <p className="value">john.smith@example.com</p>
                    </div>

                    <div className="section-info-entry">
                        <h4 className="type">Password:</h4>
                        <p className="value">***********</p>
                    </div>

                </div>
            </div>

        </div>
    );
  }
}

export default AccountView;
