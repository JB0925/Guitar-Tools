import React from "react";
import "../CSS/Tuner.css";
import useTunerUpdate from "../Hooks/useTunerHook";
import TunerIndicator from "./TunerIndicators";
import TunerNoteChoices from "./TunerNoteChoices";

/** Tuner Component
 * 
 * Params: null
 * 
 * Hooks: useTunerUpdate
 * 
 * Variables:
 *      - noteName: string (from useTunerUpdate): the name of the current note being picked up by the microphone. Displayed
 *                 in the DOM.
 * 
 *      - frequency: number (from useTunerUpdate): the frequency in Hz, represented by a floating point number, of the
 *                  current note being picked up by the microphone. Used as a parameter for the styleObject of the
 *                  TunerIndicator component, and also passed as a standalone to the same component, as well as being
 *                  passed to the handleClick method of the TunerNoteChoices component.
 * 
 *      - initialChoicesState: object (from useTunerUpdate): An object of booleans used to update the state of the checkboxes 
 *                            in the TunerNoteChoices component, so that only one checkbox is checked at a time.
 * 
 *      - determineNoteDifference: function (from useTunerUpdate): A function used to return a string once a user has clicked a 
 *                                          note choice. If the current frequency is lower than their note choice, it updates the DOM
 *                                          with "Low", and vice versa.
 *      
 *      - handleClick: function (from useTunerUpdate): updates the current selected note in state, and sets all other note options to
 *                              false. This causes only one checkbox to be selected at a time.
 *
 *      - changeColor: function (from useTunerUpdate): Takes the frequency as a parameter and returns an object used as the style for
 *                              tuner indicator circles in the DOM. If the frequency is lower than 0.02 away from the nearest note, the
 *                              leftmost circle will turn red. If it is lower than 0.01, the first two circles will turn yellow, etc.
 *      
 *      - formatDistanceFromNote: function (from useTunerUpdate): Takes the difference between the frequency and the current closest note's
 *                                         frequency and turns it into a sting, capped to two decimal places. Is another indicator to the user
 *                                         as to how close they are to the exact desired pitch.
 *
 *       - startTuner: function (from useTunerUpdate): Triggered by a click event on the "Start" button, creates a new AudioContext instance
 *                              and a new instance of Pitchy's PitchDetector, which then analyzes the notes.
 * 
 *       - styleObject: object: A basic style object that gets passed in as the style attribute for each of the tuner indicator circles
 *       
 *       - percentage: string: A string that tells the user how many percentage points (in decimal format) they are away from the closest note
 * 
 * Nested Components:
 *      - TunerIndictator(5): Five circles that light up as a user gets to within +/- 1 semitone away from the closest note. See the "changeColor"
 *                            explanation above for more info.
 *      
 *      - TunerNoteChoices: A div of eight checkboxes. These allow the user to select one at a time and more detailed information in the DOM as to
 *                          whether or not they are higher or lower than their desired note. This is particularly useful when the guitar is badly out
 *                          of tune, and the user may not have much experience with tuning.
 * 
 * Returns:
 *      - Returns a guitar tuner that gives the user feedback as to whether or not they are close to the selected note by way of text ("High" and "Low")
 *        as well as colored light indicators that begin to light up as a user gets to within about a semitone away from the desired note.
 *        Users can tune to any note they want, but have more support with standard seven string guitar tuinings (BEADGBE), as well as a low D for
 *        drop D tunings.
 */
const Tuner = () => {
    let [noteName, frequency, initialChoicesState, determineNoteDifference, 
        handleClick, changeColor, formatDistanceFromNote, startTuner] = useTunerUpdate();
    
    const styleObject = changeColor(frequency);
    const percentage = formatDistanceFromNote();

    return (
        <div className="Tuner">
            <div className="Tuner-info">
                <h1>{noteName}</h1>
                <h3>{percentage}</h3>
                <h3>{determineNoteDifference()}</h3>
            </div>
            <div className="circles">
                <TunerIndicator number={1} frequency={frequency} noteName={noteName} styleObject={styleObject} />
                <TunerIndicator number={2} frequency={frequency} noteName={noteName} styleObject={styleObject} />
                <TunerIndicator number={3} frequency={frequency} noteName={noteName} styleObject={styleObject} />
                <TunerIndicator number={4} frequency={frequency} noteName={noteName} styleObject={styleObject} />
                <TunerIndicator number={5} frequency={frequency} noteName={noteName} styleObject={styleObject} />
            </div>
            <TunerNoteChoices handleClick={evt => handleClick(evt, frequency)} checkboxChoices={initialChoicesState}/>
            <button className="tunerButton" onClick={startTuner}>Start</button>
        </div>
    );
};

export default Tuner;