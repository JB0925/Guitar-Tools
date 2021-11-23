import React, { useState, useRef } from "react";
import Click from "../Sounds/click.wav";
import Accent from "../Sounds/metronomeup.wav";

const useUpdateMetronome = () => {
    const click = new Audio(Click);
    const accent = new Audio(Accent);
    const circleDiv = useRef();
    const initialMetronomeState = {
        tempo: 100,
        isPlaying: false,
        intervalID: null,
        count: 1,
        meter: "4/4"
    };

    const [metronomeState, setMetronomeState] = useState(initialMetronomeState);
    const { tempo, isPlaying, intervalID, count, meter } = metronomeState;

    const setBeatCountInState = beatCount => {
        setMetronomeState(metronomeState => ({
            ...metronomeState,
            count: beatCount
        }));
    };

    const updateBeatCountForCurrentMeter = beatCount => {
        if (meter === "4/4") {
            if (beatCount === 4) return 1;
            else return beatCount + 1;
        } else {
            if (beatCount === 6) return 1;
            else return beatCount + 1
        }
    };

    const getEventValueOnChange = (eventObject, tempo) => {
        let { value } = eventObject.target.type === "range" ? eventObject.target : 0;
        if (!value) {
            if (eventObject.target.className.includes("plus")) return parseInt(tempo) + 1;
            return parseInt(tempo) - 1;
        }
        return value;
    };

    const createSetIntervalTimeValue = () => {
        if (meter === "4/4") return tempo;
        return Math.floor(tempo / 0.50);
    };

    const handleClick = () => {
        let timer;
        let currentCount = count;

        if (!isPlaying) {
            let currentTempo = createSetIntervalTimeValue();
            timer = setInterval(() => {
                if (currentCount === 1) accent.play();
                else click.play();
                circleDiv.current.style.animation = `pulse-animation ${60000 / tempo}ms infinite`;
                currentCount = updateBeatCountForCurrentMeter(currentCount);
                setBeatCountInState(currentCount);
            },60000 / currentTempo);

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
        let value = getEventValueOnChange(evt, tempo);
        
        if (isPlaying) {
            let currentTempo = createSetIntervalTimeValue();
            clearInterval(intervalID);

            timer = setInterval(() => {
                if (currentCount === 1) accent.play();
                else click.play();
                circleDiv.current.style.animation = `pulse-animation ${60000 / tempo}ms infinite`;
                currentCount = updateBeatCountForCurrentMeter(currentCount);
                setBeatCountInState(currentCount);
            },60000 / currentTempo);

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

    return [
        isPlaying, tempo,
        circleDiv, handleClick,
        handleChange
    ];
};

export default useUpdateMetronome;