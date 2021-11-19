import { PitchDetector } from "pitchy";

/**
 * useRecordButtonUpdate Hook
 * 
 * params:
 *      - updatePitch: A helper function passed down via useContext from the App component
 *        that is used to set state in the app component by updating the user's most recently played
 *        pitch
 *      - handleStart: Same as above, but updates the isRecording and isStarted attributes,
 *        which are used to re-render the DOM
 *      - handleClose: Same as above but does the opposite of handleStart, and again is used to update
 *        the DOM.
 * 
 * variables:
 *      - START_FREQ: A440, or the typical starting pitch that a guitar is tuned to.
 *      - SEMITONE: The formula used to calculate pitch is as follows:
 *              69 + 12log(2) (f / 440Hz)               (Source: https://en.wikipedia.org/wiki/MIDI_tuning_standard)
 *                  
 *                  Here, the SEMITONE is added to the end of the calculation to determine the number of semitones above C
 *                  that the pitch is.
 * 
 *      - ALL_NOTES: All available notes that can be used. Sticks to sharps instead of both sharps and flats.
 *      - AudioContext: Determining the audio context for the recording
 *      - noteName: This will be the name of the note that the user most recently played. Used to set state back
 *                  in the App component.
 *      - styleObject: A simple style object used to update state for the button when recording is in progress
 * 
 * Functions:
 *      - makeNoteName: A helper function used to determine the frequency of the note the user has played.
 *                      Uses the formula given above.
 *      
 *      - changePitch: The main function that listens to and analyzes the audio from the user, and updates state
 *                     for the App component. This section is responsible for the recording, the note analysis, 
 *                     and determining whether or not a success or failure message will be displayed to the user.
 * 
 *                     This uses the library "pitchy" to record and analyze the data, and some of the code in this 
 *                     function came from their documentation, namely lines 58-59.
 * 
 *      - handleClick: Again, some lines (72, 75-79) come from the documentation for "Pitchy". 
 *                     This function's job is record the user playing a note and, along the way, 
 *                     analyze the note and determine if it is a match to what was on the card. A set timeout
 *                     is used to give the user five seconds to find and play the note. The setTimeout is also cleared
 *                     when the function returns. This function is the most important piece of this hook and uses the helper
 *                     functions above to accomplish its objectives.
 * 
 * Returns: An array with the styleObject for the button, and the handleClick function, to also be passed to the button.
 */
const useRecordButtonUpdate = (updatePitch, handleStart, handleClose) => {
    const START_FREQ = 440;
    const SEMITONE = 69;
    const ALL_NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G♯", "A", "A#", "B"];
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let noteName;

    const styleObject = {
        backgroundColor: "red",
        border: "1px solid red"
    };

    const makeNoteName = freq => {
        const note = 12 * (Math.log(freq / START_FREQ) / (Math.log(2)));
        return Math.round(note) + SEMITONE;
    };

    const changePitch = (analyserNode, detector, input, sampleRate) => {
        analyserNode.getFloatTimeDomainData(input);
        const [pitch, clarity] = detector.findPitch(input, sampleRate);
        noteName = ALL_NOTES[makeNoteName(pitch) % 12];
        console.log(window.localStorage.getItem("oldNote"), noteName);
        const outcome = window.localStorage.getItem("oldNote") === noteName;
        updatePitch(noteName);
        handleClose(outcome);
    };
    
    const handleClick = () => {
        let timer;
        let audioContext = new AudioContext();
        const analyserNode = audioContext.createAnalyser();

        handleStart();
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            let sourceNode = audioContext.createMediaStreamSource(stream);
            sourceNode.connect(analyserNode);
            const detector = PitchDetector.forFloat32Array(analyserNode.fftSize);
            const input = new Float32Array(detector.inputLength);
            timer = window.setTimeout(() => changePitch(analyserNode, detector, input, audioContext.sampleRate),5000)
        });

        return () => {
            clearTimeout(timer);
        };
    };

    return [styleObject, handleClick];
};

export default useRecordButtonUpdate;