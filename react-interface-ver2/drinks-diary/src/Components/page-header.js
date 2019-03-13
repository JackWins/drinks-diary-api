import React, { Component } from 'react';


class PageHeader extends Component {
  render() {
    return (
        <div className="page-header">
            <div className="page-title">
                <h1>My Drinks Diary</h1>
            </div>

            <div className="page-helper">
                <button className="button button-sm" id="display-help"><i class="fas fa-question"></i></button>
                <button className="button button-sm" id="play-help-message"><i class="fas fa-volume-up"></i></button>
            </div>

        </div>
    );
  }
}

export default PageHeader;
