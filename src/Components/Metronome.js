import React from "react";
import "../CSS/Metronome.css";
import useUpdateMetronome from "../Hooks/useMetronomeHook";
import BPMSlider from "./BPMSlider";
import ToggleSwitch from "./ToggleSwitch";

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
                <div className="Metronome-circle" ref={circleDiv}>
                    <h1>{tempo} BPM</h1>
                </div>
                <button className="Metronome-btn" onClick={handleClick}>{btnText}</button>
                <BPMSlider handleChange={handleChange} tempo={tempo} />
            </div>
        </div>
    );
};

export default Metronome;