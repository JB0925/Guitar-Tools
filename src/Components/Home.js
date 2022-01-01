import React, { useRef, useLayoutEffect } from "react";
import { gsap, Bounce } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  gsap.registerPlugin(ScrollTrigger)
  const infoRef = useRef();
  const pic1Ref = useRef();
  const pic2Ref = useRef();
  const pic3Ref = useRef();
  
  // Using gsap and useRef to trigger some animations.
  useLayoutEffect(() => {
    gsap.fromTo(infoRef.current, { opacity: 0 }, { opacity: 1, duration: 3 });
    gsap.fromTo(pic1Ref.current, { y: 500 }, { y: 0, duration: 1, scrollTrigger: ".photos"});
    gsap.fromTo(pic2Ref.current, { y: -window.innerHeight, visibility: "hidden" }, { y: 0, visibility: "visible", duration: 1, scrollTrigger: ".photos"}, "<20%");
    gsap.fromTo(pic3Ref.current, { x: 500 }, { x: 0, ease: Bounce.easeOut, duration: 2, scrollTrigger: ".photos"}, "<10%");
  },[]);

  return (
    <div className="container">
        <div className="spacer"></div>
        <div className="Home">
            <div className="information" ref={infoRef}>
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
                <div className="pic1" ref={pic1Ref}>
                    <img src={Strat} alt="Stratocaster" />
                </div>
                <div className="pic2" ref={pic2Ref}>
                    <img src={Player} alt="Player" />
                </div>
                <div className="pic3" ref={pic3Ref}>
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