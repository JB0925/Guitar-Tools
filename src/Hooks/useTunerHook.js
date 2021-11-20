import { useState } from "react";
import { PitchDetector } from "pitchy";
import { noteFrequencies, START_FREQ, SEMITONE, ALL_NOTES, AudioContext } from "../Helpers/audioInfo";

const useTunerUpdate = () => {
    let percentOffNote;

    const initialTunerState = {
        noteName: "",
        frequency: 0
    };

    const [tunerState, setTunerState] = useState(initialTunerState);
    const { noteName, frequency } = tunerState;

    const makeNoteName = freq => {
        const note = 12 * (Math.log(freq / START_FREQ) / (Math.log(2)));
        return Math.round(note) + SEMITONE;
    };

    const addOctaveIfNeeded = (freq, note) => {
        if (note === "E" && freq > 320) return "E4";
        if (note === "E" && freq < 90) return "E2";
        if (note === "D" && freq < 80) return "D2";
        if (note === "D" && freq > 140) return "D3";
        if (note === "B" && freq < 70) return "B2";
        if (note === "B" && freq > 240) return "B3";
        return note; 
    };

    const updatePitch = (analyserNode, detector, input, sampleRate) => {
        analyserNode.getFloatTimeDomainData(input);
        const [pitch, clarity] = detector.findPitch(input, sampleRate);
        const noteName = ALL_NOTES[makeNoteName(pitch) % 12];
        const updatedNote = addOctaveIfNeeded(pitch, noteName);
        
        setTunerState(tunerState => ({
            ...tunerState,
            noteName: updatedNote,
            frequency: pitch
        }));
        window.setTimeout(() => updatePitch(analyserNode, detector, input, sampleRate), 1000);
    };

    const changeColor = frequency => {
        for (let freq of noteFrequencies) {
            if (freq[noteName]) {
                let difference = freq[noteName] - frequency;
                percentOffNote = difference / freq[noteName];

                if ((percentOffNote >= .025) || (percentOffNote >= -.15 && percentOffNote <= -0.03)) return { color: "red"};
                if ((percentOffNote > .015 && percentOffNote <= .024) || (percentOffNote < -.01 && percentOffNote > -0.04)) return { color: "yellow"};
                if ((percentOffNote >= 0 && percentOffNote <= .015) || (percentOffNote <= 0 && percentOffNote >= -.015)) return { color: "green" };
            }
        };
    };

    const formatDistanceFromNote = () => {
        if (percentOffNote) return percentOffNote.toFixed(2);
        return null
    };

    const handleClick = evt => {
        console.log(evt.target.checked);
    };


    const startTuner = () => {
        let audioContext = new AudioContext();
        const analyserNode = audioContext.createAnalyser();

        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            let sourceNode = audioContext.createMediaStreamSource(stream);
            sourceNode.connect(analyserNode);
            const detector = PitchDetector.forFloat32Array(analyserNode.fftSize);
            const input = new Float32Array(detector.inputLength);
            updatePitch(analyserNode, detector, input, audioContext.sampleRate);
        });
    };

    return [noteName, frequency, handleClick, changeColor, formatDistanceFromNote, startTuner];
};

export default useTunerUpdate;