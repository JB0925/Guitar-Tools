import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import FlashCardContainer from "./FlashCardContainer";
import Tuner from "./Tuner";
import Metronome from "./Metronome";
import LoginAndSignUpForm from "./LoginAndSignUpForm";
import GuitaristInfo from "./Guitarist";
import HomePage from "./Home";

const Routes = ({ updateLoginState, errorMessage }) => {
    return (
        <Switch>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route exact path="/register">
                <LoginAndSignUpForm 
                    typeOfForm="register" 
                    header="Sign Up For an Account" 
                    updateLoginState={updateLoginState}
                    errorMessage={errorMessage}
                />
            </Route>
            <Route exact path="/login">
                <LoginAndSignUpForm 
                    typeOfForm="login" 
                    header="Login to Your Account" 
                    updateLoginState={updateLoginState}
                    errorMessage={errorMessage}
                />
            </Route>
            <Route exact path="/flashcards">
                <FlashCardContainer />
            </Route>
            <Route exact path="/tuner">
                <Tuner />
            </Route>
            <Route exact path="/metronome">
                <Metronome />
            </Route>
            <Route exact path="/guitarists">
                <GuitaristInfo />
            </Route>
            <Route exact path="/logout">
                <Redirect to="/" />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
};

export default Routes;