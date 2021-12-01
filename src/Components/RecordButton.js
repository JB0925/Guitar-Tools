import React, { useContext } from "react";
import FlashCardContext from "../Contexts/FlashCardContext";
import useRecordButtonUpdate from "../Hooks/useRecordButtonHook";
import "../CSS/RecordButton.css";

/**
 * RecordButton component:
 * 
 * props (via useContext):
 *      - message: The innerText of the button, either "Record" or "Recording", depending on the state of the app.
 *      - updatePitch: Helper function used to update the pitch in the App component
 *      - handleStart: Helper function that sets state in the App component by changing the message passed
 *        to the button, setting isRecording to true, and setting isStarted to true. All of this happens when the RecordButton
 *        component is clicked.
 *      - handleClose: Same as directly above, but this time sets isRecording to false, and changes the message in state from 
 *        "Recording" to "Record"
 * 
 * Hooks:
 *      - useRecordButtonUpdate: The main logic behind the RecordButton component. Please see
 *        ../Hooks/useRecordButtonHook.js for more information.
 * 
 *      - This hook returns two things:
 *             1). A style object to update the button's style when a recording is in progress
 *             2). A handleClick method to start the recording and analyze the note being played vs 
 *                 the note on the FlashCard component.
 * 
 * Returns: A button that is used to start recordings and update state
 */
const RecordButton = () => {
    const { message, updatePitch, handleRecordingStart, handleRecordingEnd, isRecording } = useContext(FlashCardContext);
    const [styleObject, handleClick] = useRecordButtonUpdate(updatePitch, handleRecordingStart, handleRecordingEnd);

    return (
        <div className="RecordButton">
            <button className="recordbtn"
                    style={message === "Recording" ? styleObject : null}
                    disabled={isRecording}
                    onClick={handleClick}>
                    {message}
            </button>
        </div>
    )
};

export default RecordButton;