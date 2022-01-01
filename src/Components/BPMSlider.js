import React from "react";
import "../CSS/BPMSlider.css";

/** 
 * BPMSlider Component
 * 
 * Props:
 *    - handleChange: updates the Metronome's BPM in state
 *    - tempo: the current metronome value; sets the slider's position
 * 
 * Returns:
 *    - A range input that is used to change the speed of the Metronome,
 *      as well as two buttons that can be used to update the Metronome
 *      one at a time.
 * 
 */
const BPMSlider = ({ handleChange, tempo }) => {
    return (
        <div className="BPMSlider">
            <i data-testid="minusButton" className="fas fa-minus-circle" onClick={handleChange}></i>
            <input
                data-testid="slider"
                type="range"
                min="40"
                max="240"
                value={tempo}
                onChange={handleChange}
            />
            <i data-testid="plusButton" className="fas fa-plus-circle" onClick={handleChange}></i>
        </div>
    );
};

export default BPMSlider;