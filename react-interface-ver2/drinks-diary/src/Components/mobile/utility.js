import React, { Component } from 'react'


class Utility extends Component {

    render() {
        return (
            <div id="page-utils">

                <div className="utils-left">
                    <button className="button button-sm"><i className="fa fa-arrow-left"></i></button>
                </div>

                <div className="utils-right">
                    <button className="button button-sm"><i className="fa fa-volume-up"></i></button>
                    <button className="button button-sm"><i className="fa fa-question"></i></button>
                </div>

            </div>
        )
    }
}

export default Utility;