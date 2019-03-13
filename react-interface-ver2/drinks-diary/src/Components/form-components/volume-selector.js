import React, { Component } from 'react'


class VolumeSelector extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="volume-selector">
                
                <label className="volume-slelector-label">{this.props.label}</label>
                
                <div className="volume-selector-input">
                    
                    <input type="number" className="form-input" min="1" />
                    
                    <select className="form-input">
                        <option value="cup">Cup(s)</option>
                        <option value="ml">Milliliters</option>
                        <option value="oz">Ounces</option>
                    </select>

                </div>
            </div>
        )
    }

}

export default VolumeSelector