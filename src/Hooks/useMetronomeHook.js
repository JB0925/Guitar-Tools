import { useState, useRef } from "react";
import Click from "../Sounds/click.mp3";
import Accent from "../Sounds/metronomeup.mp3";

/**
 * useUpdateMetronome Hook
 * 
 * Purpose: Provides the state and functions used to allow the user to
 *            click the "Start" button, hear sound, and update the
 *            metronome's values.
 * 
 * Params: None
 * 
 * Returns: isPlaying: a boolean that is used to set the text of the start button.
 *          Also used in conditionals to "tell" the metronome how to handle state
 *          changes, etc.
 * 
 *          tempo: The current BPM value to pass into the metronome's round circle div
 *                  and BPMSlider component
 *          circleDiv: a useRef ref used to control the style of the circular div that 
 *              shows the user the current BPM value.
 * 
 *          handleClick, handleChange, changeMeter: All are passed to child components
 *              or buttons and are used to update the BPM value or update the Meter
 *              value in state.
 * 
 */
const useUpdateMetronome = () => {
    // instantiating a new AudioContext improves performance in mobile browsers
    // and in Safari in general. Prior to adding this, everything worked great
    // in desktop Chrome and Firefox, but Safari and any mobile browsers would
    // not play the audio. 
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    
    /* eslint-disable no-unused-vars */
    const audioCtx = new AudioContext();
    /* eslint-enable no-unused-vars */

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

    const updateBeatCountForCurrentMeter = (beatCount, meterValue) => {
        if (meterValue === "4/4") {
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

    const createSetIntervalTimeValue = (meterValue) => {
        if (meterValue === "4/4") return tempo;
        return Math.floor(tempo / 0.50);
    };

    const createTimer = (currentCount, currentTempo, meterValue) => {
        const click = new Audio(Click);
        const accent = new Audio(Accent);
        
        return setInterval(() => {
            if (currentCount === 1) accent.play();
            else click.play();
            circleDiv.current.style.animation = `pulse-animation ${60000 / tempo}ms infinite`;
            currentCount = updateBeatCountForCurrentMeter(currentCount, meterValue);
            setBeatCountInState(currentCount);
        }, 60000 / currentTempo);
    };

    const changeMeter = evt => {
        let updatedMeter = evt.target.checked ? "6/8" : "4/4";
        setMetronomeState(metronomeState => ({
            ...metronomeState,
            meter: updatedMeter
        }));
        
        if (isPlaying){
            let timer;
            let currentCount = 1;
            clearInterval(intervalID);
            setMetronomeState(metronomeState => ({
                ...metronomeState,
                intervalID: null,
                count: 1
            }));
        
            let currentTempo = createSetIntervalTimeValue(updatedMeter);
            
            timer = createTimer(currentCount, currentTempo, updatedMeter);

            setMetronomeState(metronomeState => ({
                ...metronomeState,
                isPlaying: true,
                intervalID: timer
            }));
        }
    };

    const handleClick = () => {
        let timer;
        let currentCount = count;

        if (!isPlaying) {
            let currentTempo = createSetIntervalTimeValue(meter);
        
            timer = createTimer(currentCount, currentTempo, meter);

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
            let currentTempo = createSetIntervalTimeValue(meter);
            clearInterval(intervalID);

            timer = createTimer(currentCount, currentTempo, meter);

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
        handleChange, changeMeter
    ];
};

export default useUpdateMetronome;