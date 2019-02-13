import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../Style/style.css'


class DiariesView extends Component {
  render() {
    return (
        <div id="diaries-view">
            
            <table>
                <tr>
                    <td className="diary-title">
                        <h3>My Drinks Diary</h3>
                    </td>
                    <td className="diary-info">
                        <div><span>Total Entries:</span> 12</div>
                        <div><span>Last Entry:</span> 21/01/2019</div>
                        <div><span>Duration:</span> 3 days</div>
                    </td>
                    <td className="diary-status">
                        <div className="status">
                            <div className="status-indicator success"></div>
                            <h5>Active</h5>
                        </div>
                    </td>
                    <td className="diary-action">
                        <Link to="/diary/1" className="button button-sm"><i className="fa fa-search"></i> View</Link>
                    </td>
                </tr>

                <tr>
                    <td className="diary-title">
                        <h3>My Drinks Diary</h3>
                    </td>
                    <td className="diary-info">
                        <div><span>Total Entries:</span> 12</div>
                        <div><span>Last Entry:</span> 21/01/2019</div>
                        <div><span>Duration:</span> 3 days</div>
                    </td>
                    <td className="diary-status">
                        <div className="status">
                            <div className="status-indicator danger"></div>
                            <h5>Complete</h5>
                        </div>
                    </td>
                    <td className="diary-action">
                        <Link to="/diary/1" className="button button-sm"><i className="fa fa-search"></i> View</Link>
                    </td>
                </tr>


                <tr>
                    <td className="diary-title">
                        <h3>My Drinks Diary</h3>
                    </td>
                    <td className="diary-info">
                        <div><span>Total Entries:</span> 12</div>
                        <div><span>Last Entry:</span> 21/01/2019</div>
                        <div><span>Duration:</span> 3 days</div>
                    </td>
                    <td className="diary-status">
                        <div className="status">
                            <div className="status-indicator success"></div>
                            <h5>Active</h5>
                        </div>
                    </td>
                    <td className="diary-action">
                        <Link to="/diary/1" className="button button-sm"><i className="fa fa-search"></i> View</Link>
                    </td>
                </tr>


                <tr>
                    <td className="diary-title">
                        <h3>My Drinks Diary</h3>
                    </td>
                    <td className="diary-info">
                        <div><span>Total Entries:</span> 12</div>
                        <div><span>Last Entry:</span> 21/01/2019</div>
                        <div><span>Duration:</span> 3 days</div>
                    </td>
                    <td className="diary-status">
                        <div className="status">
                            <div className="status-indicator success"></div>
                            <h5>Active</h5>
                        </div>
                    </td>
                    <td className="diary-action">
                        <Link to="/diary/1" className="button button-sm"><i className="fa fa-search"></i> View</Link>
                    </td>
                </tr>

                <tr>
                    <td className="diary-title">
                        <h3>My Drinks Diary</h3>
                    </td>
                    <td className="diary-info">
                        <div><span>Total Entries:</span> 12</div>
                        <div><span>Last Entry:</span> 21/01/2019</div>
                        <div><span>Duration:</span> 3 days</div>
                    </td>
                    <td className="diary-status">
                        <div className="status">
                            <div className="status-indicator success"></div>
                            <h5>Active</h5>
                        </div>
                    </td>
                    <td className="diary-action">
                        <Link to="/diary/1" className="button button-sm"><i className="fa fa-search"></i> View</Link>
                    </td>
                </tr>

                <tr>
                    <td className="diary-title">
                        <h3>My Drinks Diary</h3>
                    </td>
                    <td className="diary-info">
                        <div><span>Total Entries:</span> 12</div>
                        <div><span>Last Entry:</span> 21/01/2019</div>
                        <div><span>Duration:</span> 3 days</div>
                    </td>
                    <td className="diary-status">
                        <div className="status">
                            <div className="status-indicator success"></div>
                            <h5>Active</h5>
                        </div>
                    </td>
                    <td className="diary-action">
                        <Link to="/diary/1" className="button button-sm"><i className="fa fa-search"></i> View</Link>
                    </td>
                </tr>

                <tr>
                    <td className="diary-title">
                        <h3>My Drinks Diary</h3>
                    </td>
                    <td className="diary-info">
                        <div><span>Total Entries:</span> 12</div>
                        <div><span>Last Entry:</span> 21/01/2019</div>
                        <div><span>Duration:</span> 3 days</div>
                    </td>
                    <td className="diary-status">
                        <div className="status">
                            <div className="status-indicator success"></div>
                            <h5>Active</h5>
                        </div>
                    </td>
                    <td className="diary-action">
                        <Link to="/diary/1" className="button button-sm"><i className="fa fa-search"></i> View</Link>
                    </td>
                </tr>

                <tr>
                    <td className="diary-title">
                        <h3>My Drinks Diary</h3>
                    </td>
                    <td className="diary-info">
                        <div><span>Total Entries:</span> 12</div>
                        <div><span>Last Entry:</span> 21/01/2019</div>
                        <div><span>Duration:</span> 3 days</div>
                    </td>
                    <td className="diary-status">
                        <div className="status">
                            <div className="status-indicator success"></div>
                            <h5>Active</h5>
                        </div>
                    </td>
                    <td className="diary-action">
                        <Link to="/diary/1" className="button button-sm"><i className="fa fa-search"></i> View</Link>
                    </td>
                </tr>


                
            </table>

            <div className="diaries-actions">
                <Link to="/create-diary" className="button button-box">
                    <i className="fa fa-plus"></i>
                    <label>Create Diary</label>
                </Link>
            </div>

        </div>
    );
  }
}

export default DiariesView;
