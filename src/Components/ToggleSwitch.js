import React from "react";
import "../CSS/ToggleSwitch.css";

/**
 * ToggleSwitch Component
 * 
 * Purpose: Allow a user to toggle the metronome between 4/4 and 6/8 time.
 * 
 * Params: changeMeter: Sets the type of meter (4/4 or 6/8) in the parent's state,
 *                      which allows the metronome to click differently for 6/8 time.
 * 
 * Returns: A toggle switch that is used to toggle the metronome's meter value.
 * 
 */
const ToggleSwitch = ({ changeMeter }) => {
    return (
        <div className="ToggleSwitch">
            <label className="switch" htmlFor="slider">
                <input data-testid="toggle" type="checkbox" id="slider" onClick={changeMeter}/>
                <div className="round"></div>
            </label>
        </div>
    );
};

export default ToggleSwitch;