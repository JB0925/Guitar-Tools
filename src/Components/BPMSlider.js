import React from "react";
import "../CSS/BPMSlider.css";

const BPMSlider = ({ handleChange, tempo }) => {
    return (
        <div className="BPMSlider">
            <i className="fas fa-minus-circle" onClick={handleChange}></i>
            <input
                type="range"
                min="40"
                max="240"
                value={tempo}
                onChange={handleChange}
            />
            <i className="fas fa-plus-circle" onClick={handleChange}></i>
        </div>
    );
};

export default BPMSlider;