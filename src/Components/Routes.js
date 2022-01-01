import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import FlashCardContainer from "./FlashCardContainer";
import Tuner from "./Tuner";
import Metronome from "./Metronome";
import LoginAndSignUpForm from "./LoginAndSignUpForm";
import GuitaristInfo from "./Guitarist";
import HomePage from "./Home";

/**
 * Routes Component
 * 
 * Purpose: Allow for server side rendering of the main features of the app.
 * 
 * Params: 
 *      -updateLoginState: used in the Login and Signup forms to login and logout the user
 *      -errorMessage: if an error occurs in the forms, it lets the user know what happened.
 * 
 * Returns: A Tree of routes, handled by React Router
 */
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