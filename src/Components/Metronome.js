import React from "react";
import "../CSS/Metronome.css";
import useUpdateMetronome from "../Hooks/useMetronomeHook";
import BPMSlider from "./BPMSlider";
import ToggleSwitch from "./ToggleSwitch";

/**
 * Metronome Component
 * 
 * Purpose: Create a metronome that a guitarist can practice with by keeping a sense of time.
 * 
 * Props: None
 * 
 * Returns: A metronome that can be controlled via a range input / slider, an "increment"
 *          button, a "decrement" button, and a toggle switch that allows the user to 
 *          switch between 4/4 and 6/8 time.
 * 
 */
const Metronome = () => {
    const [isPlaying, tempo, circleDiv, handleClick, handleChange, changeMeter] = useUpdateMetronome();
    
    const btnText = isPlaying ? "Stop" : "Play";
    return (
        <div className="parent2">
            <div className="directions2">
                <h1>How to Use:</h1>
                <p>All guitarists should have a good time feel and practicing with
                    a metronome can greatly help! Use the metronome to help you practice
                    playing beat subdivisions and / or keep your strumming in time.
                    If you are trying to play a fast part, set the metronome to a slow tempo.
                    As you get better at playing that part, gradually increase the speed until
                    you can play it up to tempo!
                </p>
                <p><b>NOTE: </b>Use the toggle switch to toggle between 6/8 and 4/4 time.</p>
            </div>
            <div className="Metronome">
                <ToggleSwitch changeMeter={changeMeter} />
                <div data-testid="displayCircle" className="Metronome-circle" ref={circleDiv}>
                    <h1>{tempo} BPM</h1>
                </div>
                <audio preload="auto"></audio>
                <button type="button" data-testid="metronomeStartButton" className="Metronome-btn" onClickCapture={handleClick}>{btnText}</button>
                <BPMSlider handleChange={handleChange} tempo={tempo} />
            </div>
        </div>
    );
};

export default Metronome;