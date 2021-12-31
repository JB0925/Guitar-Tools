import React from "react";
import axios from "axios";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Router } from 'react-router';
import { createMemoryHistory } from "history";
import App from './Components/App';
import BPMSlider from './Components/BPMSlider';
import FlashCard from './Components/FlashCard';
import FlashCardContainer from './Components/FlashCardContainer';
import GuitaristInfo from './Components/Guitarist';
import FlashCardContext from './Contexts/FlashCardContext';
import C from "./FlashCardImages/C.png";
import HomePage from "./Components/Home";
import LoginAndSignUpForm from "./Components/LoginAndSignUpForm";
import Metronome from "./Components/Metronome";
import Navbar from "./Components/Navbar";
import RecordButton from "./Components/RecordButton";
import ToggleSwitch from "./Components/ToggleSwitch";
import Tuner from "./Components/Tuner";

jest.mock("axios");


beforeEach(() => {
  jest.resetModules();
});

afterEach(() => {
  jest.resetAllMocks();
})

describe("Basic Component Rendering", () => {
  it("renders the App component", () => {
    render(<App />, { wrapper: MemoryRouter })
  });
  
  it("renders the BPMSlider component", () => {
    render(<BPMSlider />);
  })
  
  it("renders the flash card component", () => {
    render(<FlashCard note="C" image={C} />)
  });

  it("renders the Home page", () => {
    const { getByText } = render(<HomePage />, { wrapper: MemoryRouter });
    expect(getByText("Welcome to Guitar Tools!")).toBeInTheDocument();
  });
});


describe("FlashCardContainer is rendered", () => {
  it("renders the FlashCardContainer component", async() => {
    const value = { 
      message: "Click to Start!", isStarted: false, isRecording: false,
      thePitch: "", correctInARow: 0, note: "C", image: C,
      successOrFail: null, 
      updatePitch: jest.fn().mockImplementation(() => Promise.resolve()), 
      handleRecordingStart: jest.fn().mockImplementation(() => Promise.resolve()),
      handleRecordingEnd: jest.fn().mockImplementation(() => Promise.resolve())
     };
     
    const { queryAllByText, getByText, getByTestId } = render(
      <FlashCardContext.Provider value={value}>
        <FlashCardContainer />
      </FlashCardContext.Provider>
    );
    
    expect(queryAllByText("Click to Start!")[0]).toBeInTheDocument();
    expect(getByText("How to Use:")).toBeInTheDocument();
  });
})


describe("the GuitaristInfo component is rendered with multiple values.", () => {
  it("renders the Guitarist Component with data from an API", async() => {
    const { getByText, getByPlaceholderText } = render(<GuitaristInfo />);
    expect(getByText("Submit")).toBeInTheDocument();
  
    const btn = getByText("Submit");
    const input = getByPlaceholderText("Enter a Name");
    fireEvent.change(input, { target: { value: "jimi hendrix" } });
    expect(input.value).toBe("jimi hendrix");
    
    axios.get
    .mockResolvedValueOnce({data:
      {
        birthYear: 1942,
        deathYear: 1972,
        genre: "rock",
        biography: "hello\nhow are you today?",
        photo: ""
      }
    })
    await waitFor(() => {
      fireEvent.click(btn);
    })
    
    expect(screen.getByText("Name: Jimi Hendrix")).toBeInTheDocument();
  });
  
  it("renders an error message when a faulty name is provided", async() => {
    const { getByText, getByPlaceholderText } = render(<GuitaristInfo />);
    const btn = getByText("Submit");
    const input = getByPlaceholderText("Enter a Name");
    fireEvent.change(input, { target: { value: "edw" } });
  
    axios.get
    .mockRejectedValue({response: {
      data: {
        error: {
          message: "Sorry, we could not find this musician."
        }
      }
    }});
  
    await waitFor(() => {
      fireEvent.click(btn);
    });
  
    expect(screen.getByText("Sorry, we could not find any results for that guitarist...")).toBeInTheDocument();
  });
});


describe("Login and Registration Form", () => {
  const updateLoginState = jest.fn();

  it("renders the Form component and logs in a user", async() => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <LoginAndSignUpForm typeOfForm="login" header="Login to Your Account"
          updateLoginState={updateLoginState} errorMessage="" />
        <Route path="/flashcards">Flashcards Page</Route>
      </MemoryRouter>
    );

    expect(getByText("Login to Your Account")).toBeInTheDocument();
    const username = getByLabelText(/username/i);
    const password = getByLabelText(/password/i);
    const submitButton = getByText("Submit");
    fireEvent.change(username, { target: { value: "john" }});
    fireEvent.change(password, { target: { value: "cookies" }});
    
    axios.post
    .mockResolvedValue({data: {
      token: "eyabcd123",
      id: 1
    }});

    await waitFor(() => {
      fireEvent.click(submitButton);
    });
    expect(updateLoginState).toHaveBeenCalledTimes(1);
  });

  it("renders the Form component and shows the user an error message on faulty login", async() => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <LoginAndSignUpForm typeOfForm="login" header="Login to Your Account"
          updateLoginState={updateLoginState} errorMessage="Invalid username / password" />
        <Route path="/flashcards">Flashcards Page</Route>
      </MemoryRouter>
    );

    expect(getByText("Login to Your Account")).toBeInTheDocument();
    const username = getByLabelText(/username/i);
    const password = getByLabelText(/password/i);
    const submitButton = getByText("Submit");
    fireEvent.change(username, { target: { value: "john" }});
    fireEvent.change(password, { target: { value: "cookies" }});
    
    axios.post
    .mockRejectedValue({response: {
      data: {
        error: {
          message: "Invalid username / password"
        }
      }
    }});

    await waitFor(() => {
      fireEvent.click(submitButton);
    });
    expect(updateLoginState).toHaveBeenCalledTimes(1);

    const errorMessage = getByText("Invalid username / password");

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveStyle("color: red;");
  });


  it("renders the Form component and allows a user to register", async() => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <LoginAndSignUpForm typeOfForm="register" header="Sign Up For an Account"
          updateLoginState={updateLoginState} errorMessage="" />
        <Route path="/flashcards">Flashcards Page</Route>
      </MemoryRouter>
    );
  
    expect(getByText("Sign Up For an Account")).toBeInTheDocument();

    const username = getByLabelText(/username/i);
    const password = getByLabelText(/password/i);
    const submitButton = getByText("Submit");

    fireEvent.change(username, { target: { value: "john" }});
    fireEvent.change(password, { target: { value: "cookies" }});
    
    axios.post
    .mockResolvedValue({data: {
      token: "eyabc123",
      id: 2
    }});

    await waitFor(() => {
      fireEvent.click(submitButton);
    });
    expect(updateLoginState).toHaveBeenCalledTimes(1);
  });

  it("renders the Form component and shows the user an error message on faulty registration", async() => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <LoginAndSignUpForm typeOfForm="register" header="Sign Up For an Account"
          updateLoginState={updateLoginState} errorMessage="This username is taken." />
        <Route path="/flashcards">Flashcards Page</Route>
      </MemoryRouter>
    );

    expect(getByText("Sign Up For an Account")).toBeInTheDocument();

    const username = getByLabelText(/username/i);
    const password = getByLabelText(/password/i);
    const submitButton = getByText("Submit");

    fireEvent.change(username, { target: { value: "john" }});
    fireEvent.change(password, { target: { value: "cookies" }});
    
    axios.post
    .mockRejectedValue({response: {
      data: {
        error: {
          message: "This username is taken."
        }
      }
    }});

    await waitFor(() => {
      fireEvent.click(submitButton);
    });
    expect(updateLoginState).toHaveBeenCalledTimes(1);

    const errorMessage = getByText("This username is taken.");

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveStyle("color: red;");
  });
});

const setupMetronome = () => {
  const { getByText, getByTestId } = render(<Metronome />)
  const plusButton = getByTestId("plusButton")
  const minusButton = getByTestId("minusButton");
  const displayCircle = getByTestId("displayCircle");
  const metronomeStartButton = getByTestId("metronomeStartButton");
  const BPMslider = getByTestId("slider");
  const playBtn = jest.spyOn(window.HTMLMediaElement.prototype, "play")
                        .mockImplementation(() => {})
  return { getByTestId, getByText, plusButton, minusButton, displayCircle, metronomeStartButton, BPMslider, playBtn }
}

describe("Metronome Component", () => {
  it("renders the Metronome component and allows the user to interact with it", () => {
    const { getByText } = setupMetronome();
    expect(getByText("100 BPM")).toBeInTheDocument();
  });

  it("allows the user to increment the tempo by one", () => {
    const { getByText, plusButton } = setupMetronome();
    fireEvent.click(plusButton);
    fireEvent.click(plusButton)

    expect(getByText("102 BPM")).toBeInTheDocument()
  });

  it("allows the user to decrement the tempo by one", () => {
    const { getByText, minusButton } = setupMetronome();
    fireEvent.click(minusButton)
    fireEvent.click(minusButton)

    expect(getByText("98 BPM")).toBeInTheDocument();
  });

  it("gives the metronome a pulsing effect as it plays", async() => {
    const { displayCircle, metronomeStartButton, playBtn } = setupMetronome();
    expect(metronomeStartButton).toHaveTextContent("Play")

    fireEvent.click(metronomeStartButton)
    await waitFor(() => {
      // displayCircle's animation begins
      expect(displayCircle).toHaveStyle("animation: pulse-animation 600ms infinite;")
    })
    
    expect(metronomeStartButton).toHaveTextContent("Stop")

    fireEvent.click(metronomeStartButton)
    // displayCircle's pulse animation has stopped
    expect(displayCircle).toHaveStyle("animation: none;");
    expect(playBtn).toHaveBeenCalledTimes(1);
  });

  it("changes the speed and value of the metronome", async() => {
    const { getByText, BPMslider, displayCircle, metronomeStartButton, playBtn } = setupMetronome();
    
    fireEvent.click(metronomeStartButton)
    await waitFor(() => {
      expect(displayCircle).toHaveStyle("animation: pulse-animation 600ms infinite;")
    });

    fireEvent.click(metronomeStartButton);
    fireEvent.change(BPMslider, { target: { value: 148 }});
    fireEvent.click(metronomeStartButton);

    await waitFor(() => {
      expect(displayCircle).not.toHaveStyle("animation: pulse-animation 600ms infinite;")
    });

    expect(getByText("148 BPM")).toBeInTheDocument();
    expect(playBtn).toHaveBeenCalledTimes(1)
  });
})

const setupNavbar = () => {
  const isLoggedIn = false;
  const handleLogin = jest.fn();

  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <Navbar isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
    </MemoryRouter>
  );

  const header = getByText("Guitar Tools");
  const flashcardsLink = screen.getAllByText(/Flash Cards/i)[0];
  const registerLink = screen.getAllByText(/Register/i)[0];
  return { header, getByText, flashcardsLink, registerLink }
};

describe("Navbar", () => {
  it("renders the Navbar component", () => {
    const { header, getByText, flashcardsLink, registerLink } = setupNavbar();
    expect(header).toBeInTheDocument()
    expect(flashcardsLink).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
  });

  it("shows the pulldown burgerButton on window resize and opens the menu", async() => {
    const isLoggedIn = false;
    const handleLogin = jest.fn();
    global.innerWidth = 800;
    global.dispatchEvent(new Event("resize"));

    const { getByTestId } = render(
      <MemoryRouter>
        <Navbar isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
      </MemoryRouter>
    );
    
    const burgerButton = getByTestId("burgerButton");
    fireEvent.click(burgerButton)

    expect(burgerButton).toHaveClass("fas fa-times")
    
    const pulldownMenu = getByTestId("pulldownMenu");
    expect(pulldownMenu).toHaveStyle("display: flex;");
    
    fireEvent.click(burgerButton);
    fireEvent.click(burgerButton)
  });

  it("shows the correct links when the user is logged in", () => {
    const isLoggedIn = true;
    const handleLogin = jest.fn();

    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <Navbar isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
      </MemoryRouter>
    );

    const logoutLink = screen.getAllByText(/Logout/i)[0];
    expect(logoutLink).toBeInTheDocument();
  });
});


describe("Navbar links redirect page", () => {
  it("redirects when NavLinks are clicked", () => {
    const history = createMemoryHistory();
    const { getByText, getAllByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    const flashCardLink = getAllByText(/Flash Cards/i)[0];
    fireEvent.click(flashCardLink)
    expect(getByText("Click to Start!")).toBeInTheDocument();

    const metronomeLink = getAllByText(/Metronome/i)[0];
    fireEvent.click(metronomeLink)
    expect(getByText("Play")).toBeInTheDocument();
  });
})


describe("FlashCard RecordButton", () => {
  it("renders the recording button and changes the message that is seen", async() => {
    const value = { 
      message: "Record", isStarted: false, isRecording: false,
      thePitch: "", correctInARow: 0, note: "C", image: C,
      successOrFail: null, 
      updatePitch: jest.fn().mockImplementation(() => Promise.resolve()), 
      handleRecordingStart: jest.fn().mockImplementation(() => Promise.resolve()),
      handleRecordingEnd: jest.fn().mockImplementation(() => Promise.resolve())
    };

    const { getByText } = render(
      <FlashCardContext.Provider value={value}>
        <RecordButton />
      </FlashCardContext.Provider>
    );
    
    const recordButton = getByText("Record");
    expect(recordButton).toBeInTheDocument();
  })
})


describe("Toggle component", () => {
  it("clicks the toggle on and off", () => {
    const { getByTestId } = render(<ToggleSwitch />)
    const input = getByTestId("toggle");

    fireEvent.change(input, { target: { checked: true }});
    expect(input.checked).toBeTruthy();

    fireEvent.change(input, { target: { checked: false }});
    expect(input.checked).toBeFalsy();
  });
});


describe("Tuner component", () => {
  it("renders the Tuner component", () => {
    const { getByText, getAllByTestId } = render(
      <Tuner />
    );

    expect(getByText("A2")).toBeInTheDocument();
    const [popup1, popup2] = getAllByTestId("popup");

    // popup1 should be showing but not popup2 yet;
    expect(popup1).toHaveStyle("display: block;");
    expect(popup2).toHaveClass("hide");
    
    // change the display of the popup so that it shows
    fireEvent.click(popup1);
    expect(popup2).toHaveStyle("display: block;");
  });
});