import React, { Component } from 'react'


class DiariesView extends Component {

    render() {
        return (
            <div id="diaries-view">
                
                <div className="header">
                    <h2>My Diaries</h2>
                    <button className="button button-sm"><i className="fa fa-plus"></i> Create</button>
                </div>

                <table>
                    <tbody>
                        <tr className="entry">
                            <td>
                                <div className="entry-main">
                                    <h3>My Diary</h3>

                                    <div className="entry-info">
                                        <div className="entry-info-item"><label>Total Entries:</label> 24</div> 
                                        <div className="entry-info-item"><label>Last Entry:</label> 21/01/2019</div> 
                                        <div className="entry-info-item"><label>Duration:</label> 3 days</div> 
                                    </div>

                                </div>

                                <div className="entry-footer">
                                    <button className="button button-sm"><i className="fa fa-search"></i> View</button>
                                    
                                    <div className="status">
                                        <label>Complete</label>
                                        <div className="status-indicator danger"></div>
                                    </div>
                                </div>

                            </td>
                        </tr>

                        <tr className="entry">
                            <td>
                                <div className="entry-main">
                                    <h3>My Diary</h3>

                                    <div className="entry-info">
                                        <div className="entry-info-item"><label>Total Entries:</label> 24</div> 
                                        <div className="entry-info-item"><label>Last Entry:</label> 21/01/2019</div> 
                                        <div className="entry-info-item"><label>Duration:</label> 3 days</div> 
                                    </div>

                                </div>

                                <div className="entry-footer">
                                    <button className="button button-sm"><i className="fa fa-search"></i> View</button>
                                    
                                    <div className="status">
                                        <label>Active</label>
                                        <div className="status-indicator success"></div>
                                    </div>
                                </div>

                            </td>
                        </tr>

                        <tr className="create-entry">
                            <td><a href="tset">
                                <i className="fa fa-plus"></i>
                                <label>Create</label>
                            </a></td>
                        </tr>
                    </tbody>
                </table>

            </div>
        )
    }
}

export default DiariesView;