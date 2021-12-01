import React from "react";
import '../CSS/App.css';
import FlashCardContainer from './FlashCardContainer';
import useFlashCardUpdate from "../Hooks/FlashCardHooks";
import useLoginUpdate from "../Hooks/useLoginHook";
import FlashCardContext from "../Contexts/FlashCardContext";
import Tuner from "./Tuner";
import Metronome from "./Metronome";
import Routes from "./Routes";
import Login from "./LoginAndSignUpForm";
import Navbar from "./Navbar";
import GuitaristInfo from "./Guitarist";
import useNavbarToggle from "../Hooks/useNavbarHook";

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
    successOrFail, updatePitch, handleRecordingStart, handleRecordingEnd
  ] = useFlashCardUpdate();

  const [updateLoginState, errorMessage, isLoggedIn, handleLogout] = useLoginUpdate();
  
  const value = {
    message, isStarted, isRecording, thePitch, correctInARow,
    note, image, successOrFail, 
    updatePitch, handleRecordingStart, handleRecordingEnd
  };

  return (
    <FlashCardContext.Provider value={value}>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} updateLogin={handleLogout}/>
        <Routes updateLoginState={updateLoginState} errorMessage={errorMessage} />
      </div>
    </FlashCardContext.Provider>
  );
}

export default App;
