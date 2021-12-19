import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from './Components/App';
import BPMSlider from './Components/BPMSlider';
import FlashCard from './Components/FlashCard';
import FlashCardContainer from './Components/FlashCardContainer';
import FlashCardContext from './Contexts/FlashCardContext';
import C from "./FlashCardImages/C.png";

it("renders the App component", () => {
  render(<App />, { wrapper: MemoryRouter })
});

it("renders the BPMSlider component", () => {
  render(<BPMSlider />)
})

it("renders the flash card component", () => {
  render(<FlashCard note="C" image={C} />)
});

it("renders the FlashCardContainer component", () => {
  const value = { 
    message: "Click to Start!", isStarted: false, isRecording: false,
    thePitch: "", correctInARow: 0, note: "C", image: C,
    successOrFail: null, updatePitch: jest.fn(), handleRecordingStart: jest.fn(),
    handleRecordingEnd: jest.fn()
   };
  const { queryAllByText, queryByTestId } = render(
    <FlashCardContext.Provider value={value}>
      <FlashCardContainer />
    </FlashCardContext.Provider>
  );
  
  expect(queryAllByText("Click to Start!")[0]).toBeInTheDocument();
  const recordBtn = queryByTestId("recordBtn");
  fireEvent.click(recordBtn);
});