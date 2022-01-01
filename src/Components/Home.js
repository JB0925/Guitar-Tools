import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Home.css";
import Strat from "..//guitars/guitar1.png";
import Player from "../guitars/guitar2.png";
import OnStage from "../guitars/guitar3.png";
import Flashcards from "../LandingPagePictures/flashcards.png";
import MetronomeImage from "../LandingPagePictures/metronome.png";
import TunerImage from "../LandingPagePictures/tuner.png";
import GuitarPlayer from "../LandingPagePictures/guitarist.png";

/**
 * HomePage Component
 * 
 * Purpose: A landing page for the app.
 * 
 * Params: None
 * 
 * Returns: A landing page for the app.
 * 
 */
const HomePage = () => {
  return (
    <div className="container">
        <div className="spacer"></div>
        <div className="Home">
            <div className="information">
                <p className="dark">Ready to practice guitar?</p>
                <h1>Welcome to Guitar Tools!</h1>
                <p className="light">Guitar Tools is your home for your guitar practice routine essentials.</p>
                <p className="dark" id="noreg">Registration is not required!</p>
                <div className="btn-holder">
                    <button className="btn-login"><Link to="/login">Login</Link></button>
                    <button className="btn-register"><Link to="/register">Register</Link></button>
                </div>
            </div>
            <div className="photos">
                <div className="pic1">
                    <img src={Strat} alt="Stratocaster" />
                </div>
                <div className="pic2">
                    <img src={Player} alt="Player" />
                </div>
                <div className="pic3">
                    <img src={OnStage} alt="On Stage" />
                </div>
            </div>
        </div>
        <div className="appInfo">
            <h1>Our Apps</h1>
            <div className="display-container">
                <div className="display">
                    <h3>Flashcards</h3>
                    <Link to="/flashcards"><img src={Flashcards} alt="flashcards" /></Link>
                    <p>Practice note recognition with our flashcards.</p>
                </div>
                <div className="display">
                    <h3>Metronome</h3>
                    <Link to="/metronome"><img src={MetronomeImage} alt="metronome" /></Link>
                    <p>Improve your timing with the metronome.</p>
                </div>
                <div className="display">
                    <h3>Tuner</h3>
                    <Link to="/tuner"><img src={TunerImage} alt="metronome" /></Link>
                    <p>Tune your guitar with our tuner.</p>
                </div>
                <div className="display">
                    <h3>Guitarists</h3>
                    <Link to="/guitarists"><img src={GuitarPlayer} alt="guitarists" /></Link>
                    <p>Learn about your favorite guitarists.</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default HomePage;