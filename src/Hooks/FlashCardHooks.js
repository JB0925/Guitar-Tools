import React, { useState, useLayoutEffect, useRef } from "react";
import A from "../FlashCardImages/A.jpg";
import Asharp from "../FlashCardImages/A#.png";
import B from "../FlashCardImages/B.png";
import C from "../FlashCardImages/C.png";
import Csharp from "../FlashCardImages/C#.png";
import D from "../FlashCardImages/D.png";
import Dsharp from "../FlashCardImages/D#.png";
import E from "../FlashCardImages/E.jpg";
import F from "../FlashCardImages/F.jpg";
import Fsharp from "../FlashCardImages/F#.jpg"
import G from "../FlashCardImages/G.jpg";
import Gsharp from "../FlashCardImages/G#.gif";
import soundApi from "../soundApi";

/**
 * useFlashCardUpdate Hook
 *      - imports all of the images and sends data to other components
 *      - contains most of the state for the FlashCards app
 *      - the "brains" of the guitar app
 * 
 * params: null
 * 
 * variables:
 *      - noteImages: An array of objects containing a note name and an image
 *      - initialStatusState: An object containing the starting state for the app
 * 
 * functions:
 *      - getCardData: returns a random object from the noteImages array
 *      - updatePitch: used to set the most recent pitch that the user played
 *      - handleStart: updates the state of the App component once the recording
 *        button has been clicked
 *      
 *      - handleClose: updates the state of the App component once the recording ends
 *      - makeSuccessOrFailureMessage: returns null if recording is in progress or no 
 *        recording has ever started. Otherwise, returns an h1 that lets a user know 
 *        whether the note that they played was correct or not.
 * 
 * Returns: An array with many pieces of state and helper functions that are then passed
 *          via a context provider to all of the App's nested components.
 * 
 * 
 */
const useFlashCardUpdate = () => {
    const SMALL_SCREEN_BREAKPOINT = 900;
    const noteImages = [
        {note: "A", image: A}, {note: "A#", image: Asharp},
        {note: "B", image: B}, {note: "C", image: C},
        {note: "C#", image: Csharp}, {note: "D#", image: D},
        {note: "D#", image: Dsharp}, {note: "E", image: E},
        {note: "F", image: F}, {note: "F#", image: Fsharp},
        {note: "G", image: G}, {note: "G#", image: Gsharp}
      ];
    
    const initalStatusState = {
        message: "Record",
        isStarted: false,
        isRecording: false,
        thePitch: '',
        isCorrect: false,
        correctInARow: 0,
        recordBreakingMessage: null
    };
    
    const [status, setStatus] = useState(initalStatusState);
    const { message, isStarted, isRecording, thePitch, isCorrect, correctInARow } = status;

    const parentDiv = useRef();
    
    // An effect that pushes the card into view once "Record" is clicked
    useLayoutEffect(() => {
      const scrollCardIntoView = () => window.scrollTo(0, document.body.scrollHeight);

      const pushdownParent = () => {
        if (isRecording && window.innerWidth <= SMALL_SCREEN_BREAKPOINT) {
          scrollCardIntoView();
        }; 
      };

      pushdownParent(); 
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isRecording]);

    const userIdIsPresent = () => {
        return JSON.parse(window.localStorage.getItem("userId"));
    };

    const getCardData = () => {
        const idx = Math.floor(Math.random() * noteImages.length);
        return noteImages[idx];
    };

    const updatePitch = currentNote => {
        setStatus(status => ({
            ...status,
            thePitch: currentNote
        }));
    };

    const handleRecordingStart = () => {
        setStatus(status => ({
            ...status,
            message: "Recording",
            isStarted: true,
            isRecording: true
        }));
    }; 

    const updateStateAfterRecordingEnds = (gameOutcome, newCurrentHighScore) => {
        setStatus(status =>({
            ...status,
            message: "Record",
            isRecording: false,
            isCorrect: gameOutcome,
            correctInARow: newCurrentHighScore
        }));
    };

    const updateHighScore = userIsCorrect => {
        if (userIsCorrect) return correctInARow + 1;
        return 0;
    };

    const getUserAllTimeHighScore = async(id) => {
        return await soundApi.getUserHighScore(id);
    };

    const setAllTimeHighScore = async(id, newHighScore) => {
        const userData = { id, newHighScore };
        await soundApi.setUserHighScore(userData);
    };

    const currentHighGreaterThanAllTimeHigh = (currentHighScore, AllTimeHighScore) => {
        return currentHighScore > AllTimeHighScore;
    };

    const createCelebratoryMessage = () => {
        setStatus(status => ({
            ...status,
            recordBreakingMessage: "Wow, you set a new personal record!"
        }));
    };

    const handleRecordingEnd = async(positiveOutcomeOrNot) => {
        let updatedCorrectInaRow = updateHighScore(positiveOutcomeOrNot);

        const userId = userIdIsPresent();
        if (userId) {
            let allTimeHighScore = await getUserAllTimeHighScore(userId);
            if (currentHighGreaterThanAllTimeHigh(updatedCorrectInaRow, allTimeHighScore)) {
                await setAllTimeHighScore(userId, updatedCorrectInaRow);
                createCelebratoryMessage();
            };
        }

        updateStateAfterRecordingEnds(positiveOutcomeOrNot, updatedCorrectInaRow);
    };

    const { note, image } = getCardData();
    window.localStorage.setItem("oldNote", note);

    const makeSuccessOrFailureMessage = () => {
        if (!isStarted) return null;
        if (isRecording) return null;
        if (isCorrect) return <h1 className="success">Correct!</h1>
        
        return <h1 className="failure">Aww, incorrect!</h1>
    };

    const successOrFail = makeSuccessOrFailureMessage();
    
    return [
        message, isStarted, isRecording, thePitch, correctInARow, note, image,
        successOrFail, updatePitch, handleRecordingStart, handleRecordingEnd,
        parentDiv
    ];
};

export default useFlashCardUpdate;