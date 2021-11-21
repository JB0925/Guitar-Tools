/** These helpers contain constants and functions that are
 *  used in multiple places and do not make sense to write over
 *  again. Instead we can import them and reuse them. Please see
 *  "useRecordButtonHook.js" for more information on each of these.
 */

const noteFrequencies = [
    { A: 110.00}, { B3: 246.94}, { E2: 82.41},
    { E4: 329.63}, { D3: 146.83}, { D2: 73},
    { G: 196.00}, { B2: 62}
];

const makeNoteName = freq => {
    const note = 12 * (Math.log(freq / START_FREQ) / (Math.log(2)));
    return Math.round(note) + SEMITONE;
};

const START_FREQ = 440;
const SEMITONE = 69;
const ALL_NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const AudioContext = window.AudioContext || window.webkitAudioContext;

export {
    noteFrequencies, makeNoteName, 
    START_FREQ, SEMITONE, 
    ALL_NOTES, AudioContext
};