import React, { useState, useRef } from "react";
import "../CSS/Metronome.css";
import Click from "../Sounds/click.wav";
import Accent from "../Sounds/metronomeup.wav";
import BPMSlider from "./BPMSlider";

const Metronome = () => {
    const click = new Audio(Click);
    const accent = new Audio(Accent);
    const circleDiv = useRef();
    const initialMetronomeState = {
        tempo: 100,
        isPlaying: false,
        intervalID: null,
        count: 1
    };

    const [metronomeState, setMetronomeState] = useState(initialMetronomeState);
    const { tempo, isPlaying, intervalID, count } = metronomeState;

    const time = 60000 / tempo;

    const setBeatCount = beatCount => {
        setMetronomeState(metronomeState => ({
            ...metronomeState,
            count: beatCount
        }));
    };

    const handleClick = () => {
        let timer;
        let currentCount = count;

        if (!isPlaying) {
            timer = setInterval(() => {
                if (currentCount === 1) accent.play();
                else click.play();
                circleDiv.current.style.animation = `pulse-animation ${60000 / tempo}ms infinite`;
                currentCount = currentCount === 4 ? 1 : currentCount + 1;
                setBeatCount(currentCount);
            },60000 / tempo);

            setMetronomeState(metronomeState => ({
                ...metronomeState,
                isPlaying: true,
                intervalID: timer
            }));
        } else {
            clearInterval(intervalID);
            circleDiv.current.style.animation = "none";
            setMetronomeState(metronomeState => ({
                ...metronomeState,
                isPlaying: false,
                intervalID: null,
                count: 1
            }));
        };
    };

    const handleChange = evt => {
        let timer;
        let currentCount = count;
        let { value } = evt.target.type === "range" ? evt.target : 0;
        if (!value) value = evt.target.className.includes("plus") ? parseInt(tempo) + 1 : parseInt(tempo) - 1;
        if (isPlaying) {
            clearInterval(intervalID);

            timer = setInterval(() => {
                if (currentCount === 1) accent.play();
                else click.play();
                circleDiv.current.style.animation = `pulse-animation ${60000 / tempo}ms infinite`;
                currentCount = currentCount === 4 ? 1 : currentCount + 1;
                setBeatCount(currentCount);
            },60000 / value);

            setMetronomeState(metronomeState => ({
                ...metronomeState,
                tempo: value,
                intervalID: timer,
                count: 1
            }));
        } else {
            circleDiv.current.style.animation = "none";
            setMetronomeState(metronomeState => ({
                ...metronomeState,
                tempo: value
            }));
        };
    };

    const btnText = isPlaying ? "Stop" : "Play";
    return (
        <div className="Metronome">
            <div className="Metronome-circle" ref={circleDiv}>
                <h1>{tempo} BPM</h1>
            </div>
            <button className="Metronome-btn" onClick={handleClick}>{btnText}</button>
            <BPMSlider handleChange={handleChange} tempo={tempo} />
        </div>
    );
};

export default Metronome;