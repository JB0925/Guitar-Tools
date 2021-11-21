import React from "react";
import "../CSS/TunerIndicators.css";
import useTunerIndicatorUpdate from "../Hooks/useTunerIndicatorHook";

/** TunerIndicator Component
 * 
 * Params:
 *      - number (type = Number): These numbers work with the change color function to "tell" each
 *                                TunerIndicator whether or not to light up, based on the current 
 *                                frequency and the frequency of the closest note being registered
 *      
 *      - frequency (type = Number(float)): See above; used to determine whether or not to fill in 
 *                                          each circle being displayed in the DOM based on the difference
 *                                          between the current frequency, and the "correct" frequency.
 *      
 *      - noteName (type = String): A string used to get the "correct" frequency of the currently registering note
 * 
 *      - styleObject (type = Object): An object passed into the <i></i> tag as the style attribute. Is either empty
 *                                     or contains a color (red, yellow, or green).
 * 
 * Hooks:
 *      - useTunerIndicatorUpdate: Returns a function called "determineIfFilledIn" which is used to set the style of 
 *                                 the circle to contain a particular color, or nothing.
 * 
 * Returns: A circle from FontAwesome that is used to "light up" as a user gets within +/- 1 semitone from the closest 
 *          current note
 */
const TunerIndicator = ({ number, frequency, noteName, styleObject }) => {
    const [determineIfFilledIn] = useTunerIndicatorUpdate(number, frequency, noteName, styleObject);
    const style = determineIfFilledIn();

    return <i className="fas fa-circle" style={style}></i>
};

export default TunerIndicator;