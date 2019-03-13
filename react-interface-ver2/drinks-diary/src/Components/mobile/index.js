import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Index extends Component {

    render() {
        return (
            <div id="index">
            
                <table id="index-nav">
                    <tr>
                        <td><Link to="/my-diaries">
                            <i class="fas fa-book"></i> 
                            <label>My Diaries</label>
                        </Link></td>

                        <td><Link to="/account">
                            <i class="fas fa-user-alt"></i> 
                            <label>My Account</label>
                        </Link></td>
                    </tr>

                    <tr>
                        <td><Link to="/log-out" className="log-out">
                            <i class="fas fa-sign-out-alt"></i>
                            <label>Log Out</label>
                        </Link></td>
                    </tr>


                </table>

            </div>
        )
    }
}

export default Index;