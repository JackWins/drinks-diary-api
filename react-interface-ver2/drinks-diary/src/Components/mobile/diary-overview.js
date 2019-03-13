import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class DiaryOverview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            displayedDate: "current-date"
        }
    }

    render() {
        return (
            <div id="diary-overview">
                
                <div className="date-navigation">
                    <button className="button button-xs"><i className="fa fa-arrow-left"></i> Prev</button>
                    <button className="button button-xs">Next <i className="fa fa-arrow-right"></i> </button>
                </div>

                <div className="date-log-header">
                    <div className="date-info">
                        <h5>My Diary</h5>
                        <p>Day 1 (Today)</p>
                    </div>

                    <div className="key">
                        <label>Key:</label>
                        <p><i className="fa fa-cocktail"></i>: Alcoholic | <i className="fa fa-coffee"></i>: Caffeinated </p>
                    </div>
                </div>

                <div className="date-log">

                    <div className="diary-entry">

                        <div className="entry-main">
                            <img />

                            <div className="entry-info">
                                <h5 className="drink-title">Black Coffee</h5>
                                <div className="drink-info">
                                    <p>1 Cup</p>
                                    
                                    <i className="alcohol-status fa fa-cocktail"></i>
                                    <i className="caffeine-status fa fa-coffee"></i>
                                    
                                </div>
                            </div>                                           
                        </div>

                        <div className="entry-footer">
                            <button className="button button-xs"><i className="fa fa-pencil-alt"></i> Edit</button>
                            <p>15:15</p>
                        </div>

                    </div>

                    <Link to="01/create" className="date-log-create">
                        <i className="fa fa-plus"></i>
                        <label>Create Entry</label>
                    </Link>

                </div>

            </div>
        )
    }
}

export default DiaryOverview;