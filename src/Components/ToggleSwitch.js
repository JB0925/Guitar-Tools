import React from "react";
import "../CSS/ToggleSwitch.css";

const ToggleSwitch = ({ changeMeter }) => {
    return (
        <div className="ToggleSwitch">
            <label className="switch" htmlFor="slider">
                <input type="checkbox" id="slider" onClick={changeMeter}/>
                <div className="round"></div>
            </label>
        </div>
    );
};

export default ToggleSwitch;