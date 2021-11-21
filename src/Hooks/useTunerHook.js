import { useState } from "react";
import { PitchDetector } from "pitchy";
import { noteFrequencies, makeNoteName, ALL_NOTES, AudioContext } from "../Helpers/audioInfo";

/** useTunerUpdate Hook
 * 
 * This hook sets and maintains / updates the state for the Tuner component, 
 * handles click events, formats percentages and note names, and determines
 * whether or not what color the TunerIndicator components should turn. An
 * explanation of each function can be found below.
 */
const useTunerUpdate = () => {
    // Initialized here, it is used to display in the DOM how far away their tuning
    // is from the current closest note.
    let percentOffNote;

    // The initial state object of the Tuner component.
    const initialTunerState = {
        noteName: "",
        frequency: 0,
        currentNoteChoice: "",
        initialChoicesState: {
            B2: false,
            D2: false,
            E2: false,
            A: false,
            D3: false,
            G: false,
            B3: false,
            E4: false
        }
    };

    // Setting state, and then destructuring the attributes out of the object
    // for future use.
    const [tunerState, setTunerState] = useState(initialTunerState);
    const { noteName, frequency, currentNoteChoice, initialChoicesState } = tunerState;

    /** addOctaveIfNeeded
     * - a switch statement that appends an octave number
     *   to certain notes. This is needed because, in guitar tuning,
     *   some notes repeat, but are found in different octaves.
     * 
     * Params: 
     *      - freq (type = Number(floating point)): the currently
     *             playing frequency
     *      - note (type = String): The name of the currently playing note.
     * 
     * Returns: A String, either the note with an octave number attached,
     *          or just the original String.
     */
    const addOctaveIfNeeded = (freq, note) => {
        switch(freq, note) {
            case note === "E" && freq > 320:
                return "E4";
            case note === "E" && freq < 90:
                return "E2";
            case note === "D" && freq < 80:
                return "D2";
            case note === "D" && freq > 140:
                return "D3";
            case note === "B" && freq < 70:
                return "B2";
            case note === "B" && freq > 240:
                return "B3";
            default:
                return note;
        };
    };

    /** updatePitch
     * Params:
     *  - analyserNode (type = AudioContext.createAnalyzer): gets audio data in an Float32Array
     *  - detector: Pitchy's pitch detector, which gives us the raw pitch and the clarity of the
     *              note that was played
     *  - input: data in the form of a Float32Array
     *  - the sample rate of the current AudioContext instance
     * 
     * Returns:
     *      - A loop that is constantly listening for sound and setting state in the DOM, namely
     *        updating the currently playing note and the note's frequency
     */
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

    /** changeColor
     * 
     * Params:
     *      - frequency (type = Number(floating point)): used to perform calculations
     * 
     * Return:
     *      - based on the frequency and the difference between the actual frequency and
     *        the correct frequency of the closest note, it returns a an object with a 
     *        color property. This is used to update the color of the circle in the
     *        TunerIndicator component.
     */
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

    // Takes the percentOffNote and formats it into a string fixed to two decimal places
    const formatDistanceFromNote = () => {
        if (percentOffNote) return percentOffNote.toFixed(2);
        return null
    };

    // updates the state the gets passed to the TunerNoteIndicators and tells them
    // whether or not to be checked (only one at a time).
    const handleClick = (evt, frequency) => {
        const { name } = evt.target;
        for (let choice in initialChoicesState) {
            if (choice === name) initialChoicesState[choice] = true
            else initialChoicesState[choice] = false
        };
        setTunerState(tunerState => ({
            ...tunerState,
            currentNoteChoice: name,
            initialChoicesState: { ...initialChoicesState }
        }));
    };

    // Returns a string to let the user know whether they are higher
    // or lower than their desired note.
    // If they are within a very fine range OR the current note is not
    // their desired note, it will return an empty string.
    const determineNoteDifference = () => {
        const closeEnoughDifferences = ["0.00", "0.01", "-0.00", "-0.01"];
        const formattedPercentOffNote = formatDistanceFromNote();
        if (noteName !== currentNoteChoice) return "";

        if (closeEnoughDifferences.includes(formattedPercentOffNote) && noteName === currentNoteChoice) {
            return ""
        };
        
        for (let noteObject of noteFrequencies) {
            if (frequency < noteObject[currentNoteChoice]) {
                return "Low"
            } else if (frequency > noteObject[currentNoteChoice]) {
                return "High"
            }
        };
    };

    // Starts the tuner and begins to analyze the audio.
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

    return [noteName, frequency, initialChoicesState, 
            determineNoteDifference, handleClick, changeColor, 
            formatDistanceFromNote, startTuner
        ];
};

export default useTunerUpdate;