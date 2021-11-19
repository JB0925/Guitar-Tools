import { useEffect, useRef, useState } from "react";
import { PitchDetector } from "pitchy";

const useTunerUpdate = () => {
    const START_FREQ = 440;
    const SEMITONE = 69;
    const TUNER_NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioContext = new AudioContext();
    const analyserNode = audioContext.createAnalyser();

    // const noteFrequencies = [
    //     { A: 110.00}, { B: 246.94}, { E: 82.41},
    //     { E: 329.63}, { D: 146.83}, { D: 73},
    //     { G: 196.00}, { B: 62}
    // ];
    
    const [noteName, setNoteName] = useState("");
    const [frequency, setFrequency] = useState(0);

    const makeNoteName = freq => {
        const note = 12 * (Math.log(freq / START_FREQ) / (Math.log(2)));
        // console.log(freq)
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
        const noteName = TUNER_NOTES[makeNoteName(pitch) % 12];
        const updatedNote = addOctaveIfNeeded(pitch, noteName);
        setNoteName(noteName => updatedNote);
        setFrequency(frequency => pitch);
        window.setTimeout(() => updatePitch(analyserNode, detector, input, sampleRate), 1000);
    };

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelector(".tunerButton")
        .addEventListener('click', () => audioContext.resume());

        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            let sourceNode = audioContext.createMediaStreamSource(stream);
            sourceNode.connect(analyserNode);
            const detector = PitchDetector.forFloat32Array(analyserNode.fftSize);
            const input = new Float32Array(detector.inputLength);
            updatePitch(analyserNode, detector, input, audioContext.sampleRate);
        });
    });

    return [noteName, frequency];
};

export default useTunerUpdate;