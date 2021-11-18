import React, { useContext } from "react";
import "../CSS/FlashCardContainer.css";
import FlashCard from "./FlashCard";
import RecordButton from "./RecordButton";
import FlashCardContext from "../Contexts/FlashCardContext";

/**
 * The container for the FlashCard and RecordButton components that come
 * together to make the Flash Cards / Note Recognition portion of the app.
 * This component toggles back and forth between "Click to Start!" and showing a new 
 * flash card.
 * 
 * Props (passed via useContext):
 *      - isStarted: a boolean that is used to determine if the app has been started
 *        by pressing the record button
 *      - isRecording: another boolean, used to update the state of the card and button 
 *        components when recording is being done, and after the recording has stopped
 *      - note: the note name passed to the FlashCard component for the "alt" attribute.
 *      - image: the image for the FlashCard component
 *      - successOrFail: if !isRecording, returns a message in an h1 to let the user know 
 *        whether they got the answer correct or not. If isRecording is true, returns null
 * 
 * Returns: A container for the RecordButton and FlashCard components
 */
const FlashCardContainer = () => {
    const { isStarted, isRecording, note, image, successOrFail } = useContext(FlashCardContext);
    
    return (
        <div className="FlashCards">
            {!isStarted || !isRecording ? 
                <h1>Click to Start!</h1>
                :
                <FlashCard note={note} image={image} />
            }

            {successOrFail}
            <RecordButton />
        </div>
    );

};

export default FlashCardContainer;