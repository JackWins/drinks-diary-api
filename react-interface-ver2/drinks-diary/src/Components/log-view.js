import React, { Component } from 'react';
import '../Style/style.css'

import DrinkLogEntry from './drink-log-entry'


class LogView extends Component {
  render() {
    return (
        <div className="log-view">

            <button className="button scroll" id="scroll-prev"><i class="fas fa-chevron-left"></i></button>

            <table >
                <thead>
                    <th id="date1">10/05</th>
                    <th id="date2">11/05</th>
                    <th id="date3">12/05</th>
                    <th id="date4">13/05</th>
                    <th id="date5">14/05</th>
                </thead>

                <tbody>
                    <tr className="log-contents">
                        <td id="log-col-1"><div className="col-contents"><DrinkLogEntry /></div></td>
                        <td id="log-col-2"></td>
                        <td id="log-col-3"></td>
                        <td id="log-col-4"><DrinkLogEntry /><DrinkLogEntry /></td>
                        <td id="log-col-5"></td>
                    </tr>
                </tbody>

            </table>

            <button className="button scroll" id="scroll-next"><i class="fas fa-chevron-right"></i></button>
    
        </div>
    );
  }
}

export default LogView;
