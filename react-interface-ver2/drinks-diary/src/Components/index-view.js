import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class IndexView extends Component {
  render() {
    return (
        <div id="index-view">
            
            <table className="nav-menu">

                <tr className="menu-row">

                    <td className="menu-option"><Link to="/my-diaries">
                        <i class="fas fa-book"></i> 
                        <label>My Diaries</label>
                    </Link></td>

                    <td className="menu-option"><Link to="/account">
                        <i class="fas fa-user-alt"></i> 
                        <label>My Account</label>
                    </Link></td>

                    <td className="menu-option"><Link to="/settings">
                        <i class="fas fa-cog"></i> 
                        <label>Settings</label>
                    </Link></td>

                    <td className="menu-option log-out"><Link to="/log-out">
                        <i class="fas fa-sign-out-alt"></i>
                        <label>Log Out</label>
                    </Link></td>

                </tr>

            </table>
  
        </div>
    );
  }
}

export default IndexView;
