import React from "react"
import "../CSS/TunerNoteChoices.css";

const TunerNoteChoices = ({ handleClick, checkboxChoices }) => {
    const { B2, D2, E2, A, D3, G, B3, E4 } = checkboxChoices;
    return (
        <div className="TunerNoteChoices" onClick={handleClick}>
            <div className="TunerNoteChoices-align">
                <label htmlFor="B2">B2</label>
                <input type="checkbox" id="B2" name="B2" checked={B2}/>
            </div>
            <div className="TunerNoteChoices-align">
                <label htmlFor="D2">D2</label>
                <input type="checkbox" id="D2" name="D2" checked={D2}/>
            </div>
            <div className="TunerNoteChoices-align">
                <label htmlFor="E2">E2</label>
                <input type="checkbox" id="E2" name="E2" checked={E2}/>
            </div>
            <div className="TunerNoteChoices-align">
                <label htmlFor="A">A2</label>
                <input type="checkbox" id="A" name="A" checked={A}/>
            </div>
            <div className="TunerNoteChoices-align">
                <label htmlFor="D3">D3</label>
                <input type="checkbox" id="D3" name="D3" checked={D3}/>
            </div>
            <div className="TunerNoteChoices-align">
                <label htmlFor="G">G3</label>
                <input type="checkbox" id="G" name="G" checked={G}/>
            </div>
            <div className="TunerNoteChoices-align">
                <label htmlFor="B3">B3</label>
                <input type="checkbox" id="B3" name="B3" checked={B3}/>
            </div>
            <div className="TunerNoteChoices-align">
                <label htmlFor="E4">E4</label>
                <input type="checkbox" id="E4" name="E4" checked={E4}/>
            </div>
        </div>
    );
};

export default TunerNoteChoices;