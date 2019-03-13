import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import VolumeSelector from './form-components/volume-selector'

class CreateDiaryEntry extends Component {

    constructor(props) {
        super(props)
        this.currentDate = new Date()
    }

    render() {
        return (
            <div id="create-diary-entry">

                <h2>New Diary Entry</h2>

                <form> 
                    <div className="input-row">

                        <div className="input-group">
                            <label for="consumption-date">Date of consumption:</label>
                            <input type="date" id="consumption-date" className="form-input" value={this.currentDate.toISOString().substr(0, 10)} />
                        </div>

                        <div className="input-group">
                            <label for="consumption-time">Time of consumption:</label>
                            <input type="time" id="consumption-time" className="form-input" value={this.currentDate.getHours()+":"+this.currentDate.getMinutes()} />
                        </div>

                    </div>


                    <div className="input-group">
                        <label for="drink-type">Drink:</label>
                        <input type="text" id="drink-type" className="form-input" placeholder="example: black coffee" />
                    </div>

                    <VolumeSelector label={"Volume:"}/>

                    <div className="input-row">

                        <div className="input-group">
                            <label for="alcohol-status">Does it contain alcohol:</label>
                            <select id="alcohol-status" className="form-input" >
                                <option value="" disabled selected>- Choose an option -</option>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label for="caffeine-status">Does it contain caffeine:</label>
                            <select id="caffeine-status" className="form-input" >
                                <option value="" disabled selected>- Choose an option -</option>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>

                    </div>

                    <div className="form-actions">
                        <Link to="/diary/1" className="button button-warning"><i className="fa fa-times"></i> Cancel</Link>
                        <button type="submit" className="button button-success"><i className="fa fa-check"></i> Submit</button>
                    </div>
                </form>

            </div>
        )
    }
}

export default CreateDiaryEntry