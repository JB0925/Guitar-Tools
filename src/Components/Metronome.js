import React from "react";
import "../CSS/Metronome.css";
import useUpdateMetronome from "../Hooks/useMetronomeHook";
import BPMSlider from "./BPMSlider";
import ToggleSwitch from "./ToggleSwitch";

const Metronome = () => {
    const [isPlaying, tempo, circleDiv, handleClick, handleChange, changeMeter] = useUpdateMetronome();

    const btnText = isPlaying ? "Stop" : "Play";
    return (
        <div className="Metronome">
            <ToggleSwitch changeMeter={changeMeter} />
            <div className="Metronome-circle" ref={circleDiv}>
                <h1>{tempo} BPM</h1>
            </div>
            <button className="Metronome-btn" onClick={handleClick}>{btnText}</button>
            <BPMSlider handleChange={handleChange} tempo={tempo} />
        </div>
    );
};

export default Metronome;