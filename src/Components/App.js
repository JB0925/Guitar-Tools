import React from "react";
import '../CSS/App.css';
import useFlashCardUpdate from "../Hooks/FlashCardHooks";
import useLoginUpdate from "../Hooks/useLoginHook";
import FlashCardContext from "../Contexts/FlashCardContext";
import Routes from "./Routes";
import Navbar from "./Navbar";

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
    message, isStarted, isRecording, thePitch, correctInARow, note, image,
    successOrFail, updatePitch, handleRecordingStart, handleRecordingEnd,
    parentDiv
  ] = useFlashCardUpdate();

  const [updateLoginState, errorMessage, isLoggedIn, handleLogout] = useLoginUpdate();
  
  const value = {
    message, isStarted, isRecording, thePitch, correctInARow,
    note, image, successOrFail, 
    updatePitch, handleRecordingStart, handleRecordingEnd,
    parentDiv
  };

  return (
    <FlashCardContext.Provider value={value}>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} updateLogin={handleLogout} />
        <Routes updateLoginState={updateLoginState} errorMessage={errorMessage} />
      </div>
    </FlashCardContext.Provider>
  );
}

export default App;
