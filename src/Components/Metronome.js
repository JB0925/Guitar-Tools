import React, { useState } from "react";
import "../CSS/Metronome.css";
import Click from "../click.flac";

const Metronome = () => {
    const click = new Audio(Click);
    const initialMetronomeState = {
        tempo: 100,
        isPlaying: false,
        intervalID: null,
        count: 1
    };

    const [metronomeState, setMetronomeState] = useState(initialMetronomeState);
    const { tempo, isPlaying, intervalID, count } = metronomeState;

    const time = 60000 / tempo;

    const handleClick = () => {
        let timer;
        if (!isPlaying) {
            timer = setInterval(() => {
                click.play();
            },time);
            setMetronomeState(metronomeState => ({
                ...metronomeState,
                isPlaying: true,
                intervalID: timer,
            }));
        } else {
            clearInterval(intervalID);
            setMetronomeState(metronomeState => ({
                ...metronomeState,
                isPlaying: false,
                intervalID: null,
            }));
        };
    };

    return (
        <div className="Metronome">
            <div className="Metronome-circle">
                <h1>{tempo} BPM</h1>
            </div>
            <button onClick={handleClick}>play</button>
        </div>
    );
};

export default Metronome;