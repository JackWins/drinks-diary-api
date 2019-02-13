import React, { Component } from 'react';
import DefaultDrinkImage from '../Images/default_drink.svg'
import '../Style/style.css'


class DrinkLogEntry extends Component {
  
    render() {
    return (
        <div className="drink-log-entry">
            
            <div className="entry-main">
                <img className="entry-thumbnail"  src={DefaultDrinkImage} />
                <h5 className="drink-name">Black Coffee</h5>
            </div>

            <div className="entry-footer">
                <h5 class="entry-time">15:15</h5>

                <div className="entry-content-indicators">
                    <i class="drink-alcohol-status fas fa-cocktail"></i>    
                    <i class="drink-caffiene-status fas fa-coffee"></i>
                </div>
            </div>


            <div className="drink-log-entry-expand">
                <div className="entry-main">
    
                    <img className="entry-thumbnail" src={DefaultDrinkImage} />
             

                    <div className="entry-info">
                        <h4 className="drink-name">Matcha Tea</h4>
                        <h5 className="drink-volume">50ml</h5>
                    </div>      

                    <div className="entry-content-indicators">
                        <i class="drink-alcohol-status fas fa-cocktail"></i>
                        <i class="drink-caffiene-status fas fa-coffee"></i>
                    </div>
                </div>

                <div className="entry-footer">
                    <button className="button button-sm button-inverse"><i class="fas fa-pencil-alt"></i> Edit</button>
                    <h5 class="entry-time">15:15</h5>
                </div>
            </div>
            
        </div>
    );
  }
}

export default DrinkLogEntry;

