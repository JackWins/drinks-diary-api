import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LogView from './log-view'
import '../Style/style.css'


class DiaryView extends Component {
  render() {
    return (
        <div id="diary-view">
            
            <div className="diary-view-header">
                
                <h4>Diary: My Drinks Diary</h4>

                <Link to="/diary/1/create-entry" className="button button-sm"><i class="fas fa-plus"></i> New Entry</Link>
                <Link to="/diary/1/exercise-log" className="button button-sm"><i class="fas fa-book"></i> Exercise Log</Link>

                <div className="status">
                    <div className="status-indicator success"></div>
                    <h4>Active</h4>
                </div>

            </div>

            <LogView />

        </div>
    );
  }
}

export default DiaryView;
