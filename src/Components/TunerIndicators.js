import React from "react";
import "../CSS/TunerIndicators.css";
import useTunerIndicatorUpdate from "../Hooks/useTunerIndicatorHook";

const TunerIndicator = ({ number, frequency, noteName, styleObject }) => {
    const [determineIfFilledIn] = useTunerIndicatorUpdate(number, frequency, noteName, styleObject);
    const style = determineIfFilledIn();
    
    return <i className="fas fa-circle" style={style}></i>
};

export default TunerIndicator;