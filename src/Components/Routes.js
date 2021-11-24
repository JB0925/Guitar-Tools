import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import FlashCardContainer from "./FlashCardContainer";
import Tuner from "./Tuner";
import Metronome from "./Metronome";

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/flashcards">
                <FlashCardContainer />
            </Route>
            <Route exact path="/tuner">
                <Tuner />
            </Route>
            <Route exact path="/metronome">
                <Metronome />
            </Route>
            <Redirect to="/flashcards" />
        </Switch>
    );
};

export default Routes;