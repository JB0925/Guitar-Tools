const noteFrequencies = [
    { A: 110.00}, { B3: 246.94}, { E2: 82.41},
    { E4: 329.63}, { D3: 146.83}, { D2: 73},
    { G: 196.00}, { B2: 62}
];

const START_FREQ = 440;
const SEMITONE = 69;
const ALL_NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const AudioContext = window.AudioContext || window.webkitAudioContext;

export {
    noteFrequencies, START_FREQ,
    SEMITONE, ALL_NOTES,
    AudioContext
};