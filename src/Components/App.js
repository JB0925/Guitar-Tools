import React from "react";
import '../CSS/App.css';
import FlashCardContainer from './FlashCardContainer';
import useFlashCardUpdate from "../Hooks/FlashCardHooks";
import FlashCardContext from "../Contexts/FlashCardContext";
import Tuner from "./Tuner";
import Metronome from "./Metronome";

/**
 * The central processing for the guitar app. Uses a context provider to pass
 * down data and functions to components nested inside of it. 
 * 
 * Props: None
 * 
 * Nested Components:
 *    - FlashCardContainer:
 *          - This component nests two other components and is the main component
 *            for the flash card / note recognition practice mechanism.
 * 
 * Returns: The main App component for the guitar based application.
 */
function App() {
  const [
    message, isStarted, isRecording, thePitch, note, image,
    successOrFail, updatePitch, handleStart, handleClose
  ] = useFlashCardUpdate();

  const value = {
    message, isStarted, isRecording, thePitch,
    note, image, successOrFail, updatePitch,
    handleStart, handleClose
  };

  return (
    <FlashCardContext.Provider value={value}>
      <div className="App">
        {/* <FlashCardContainer /> */}
        {/* <Tuner /> */}
        <Metronome />
      </div>
    </FlashCardContext.Provider>
  );
}

export default App;