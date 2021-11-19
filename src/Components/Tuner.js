import React from "react";
import "../CSS/Tuner.css";
import useTunerUpdate from "../Hooks/useTunerHook";

const Tuner = () => {
    let [noteName, frequency] = useTunerUpdate();

    const noteFrequencies = [
        { A: 110.00}, { B3: 246.94}, { E2: 82.41},
        { E4: 329.63}, { D3: 146.83}, { D2: 73},
        { G: 196.00}, { B2: 62}
    ];

    const changeColor = frequency => {
        for (let freq of noteFrequencies) {
            if (freq[noteName]) {
                let difference = freq[noteName] - frequency;
                if ((difference > 75) || (difference < 0 && difference > -75)) return { color: "red"};
                if ((difference > 25 && difference < 50) || (difference < -25 && difference > -50)) return { color: "yellow"};
                if ((difference >= 0 && difference < 15) || (difference <= 0 && difference >= -15)) return { color: "green" };
            }
        };
    };
    
    const styleObject = changeColor(frequency);
    console.log(styleObject)
    
    return (
        <div className="Tuner">
            <h1>{noteName}</h1>
            <div className="circles">
                <i className="fas fa-circle" style={styleObject}></i>
                <i className="fas fa-circle" style={styleObject}></i>
                <i className="fas fa-circle" style={styleObject}></i>
                <i className="fas fa-circle" style={styleObject}></i>
                <i className="fas fa-circle" style={styleObject}></i>
            </div>
            <button className="tunerButton">Click here if there are no notes on your screen.</button>
        </div>
    );
};

export default Tuner;