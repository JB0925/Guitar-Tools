import React from "react";
import "../CSS/Guitarist.css";
import useGetGuitaristData from "../Hooks/useGuitaristHook";

const GuitaristInfo = () => {
    const [
            handleSubmit, handleChange, 
            formData, badRequestError, 
            biography, formatGuitaristInfo, 
            formatParagraphs
        ] = useGetGuitaristData();
    
    return (
        <div className="Guitarist">
            <div className="formDiv">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Enter a Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleChange}
                        placeholder="Enter a Name"
                        value={formData}
                        required
                    />
                    <button className="searchButton">Submit</button>
                </form>
            </div>
            {badRequestError ?
            <h1>Sorry, we could not find any results for that guitarist...</h1>
            :
            <div className="GuitaristInfo">
                <div className="info">
                    {formatGuitaristInfo()}
                </div>
                <div className="artistParagraph">
                    {formatParagraphs(biography)}
                </div>
            </div>}
        </div>
    );
};

export default GuitaristInfo;