import React from "react";
import "../CSS/Tuner.css";
import useTunerUpdate from "../Hooks/useTunerHook";
import TunerIndicator from "./TunerIndicators";
import TunerNoteChoices from "./TunerNoteChoices";

const Tuner = () => {
    let [noteName, frequency, initialChoicesState, doSomething, handleClick, changeColor, formatDistanceFromNote, startTuner] = useTunerUpdate();
    
    const styleObject = changeColor(frequency);
    const percentage = formatDistanceFromNote();

    return (
        <div className="Tuner">
            <div className="Tuner-info">
                <h1>{noteName}</h1>
                <h3>{percentage}</h3>
                <h3>{doSomething()}</h3>
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