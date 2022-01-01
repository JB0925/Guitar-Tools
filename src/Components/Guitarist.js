import React from "react";
import "../CSS/Guitarist.css";
import useGetGuitaristData from "../Hooks/useGuitaristHook";


/**
 * Guitarist Component
 * 
 * Purpose: Allows the user to get information about a particular 
 *          guitarist or musician for an API.
 * 
 * Params: None
 * 
 * Returns:
 *    A component that allows a user to submit a form and 
 *    see information and pictures of a guitarist they 
 *    are interested in.
 * 
 */
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
                    <button className="searchButton" type="submit" onClick={handleSubmit}>Submit</button>
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