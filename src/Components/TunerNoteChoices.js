import React from "react"
import "../CSS/TunerNoteChoices.css";

/** TunerNoteChoices Component
 * 
 * Purpose: Allows the user the opportunity to get more information about a specific string they are
 *          tuning, particularly whether they are higher or lower than their desired value. An
 *          inexperienced player may not know these things and, if not aware, may snap a string by
 *          tightening it too much.
 * 
 * Params:
 *      - handleClick: (type: Function): Used to update state in the parent Tuner component. This state 
 *                                       controls the checkboxes and makes it so that only one checkbox
 *                                       is checked at a time.
 *      
 *      - checkboxChoices: (type: Object): An object full of booleans that gets destructred, and each of 
 *                                         its attributes passed as the "checked" attribute into the JSX.
 * 
 * Hooks: null
 * 
 * Returns: A div that contains eight child divs, each one containing a label and a checkbox. This marks the
 *          current choice of the user and is used to tell the user whether they are higher or lower than the 
 *          note they are looking for.
 */
const TunerNoteChoices = ({ handleClick, checkboxChoices }) => {
    const { B2, D2, E2, A, D3, G, B3, E4 } = checkboxChoices;
    return (
        <div className="TunerNoteChoices" onClick={handleClick}>
            <div className="TunerNoteChoices-align">
                <label htmlFor="B2">B2</label>
                <input type="checkbox" id="B2" name="B2" checked={B2} onChange={() => {}}/>
            </div>
            <div className="TunerNoteChoices-align">
                <label htmlFor="D2">D2</label>
                <input type="checkbox" id="D2" name="D2" checked={D2} onChange={() => {}}/>
            </div>
            <div className="TunerNoteChoices-align">
                <label htmlFor="E2">E2</label>
                <input type="checkbox" id="E2" name="E2" checked={E2} onChange={() => {}}/>
            </div>
            <div className="TunerNoteChoices-align">
                <label htmlFor="A">A2</label>
                <input type="checkbox" id="A" name="A" checked={A} onChange={() => {}}/>
            </div>
            <div className="TunerNoteChoices-align">
                <label htmlFor="D3">D3</label>
                <input type="checkbox" id="D3" name="D3" checked={D3} onChange={() => {}}/>
            </div>
            <div className="TunerNoteChoices-align">
                <label htmlFor="G">G3</label>
                <input type="checkbox" id="G" name="G" checked={G} onChange={() => {}}/>
            </div>
            <div className="TunerNoteChoices-align">
                <label htmlFor="B3">B3</label>
                <input type="checkbox" id="B3" name="B3" checked={B3} onChange={() => {}}/>
            </div>
            <div className="TunerNoteChoices-align">
                <label htmlFor="E4">E4</label>
                <input type="checkbox" id="E4" name="E4" checked={E4} onChange={() => {}}/>
            </div>
        </div>
    );
};

export default TunerNoteChoices;