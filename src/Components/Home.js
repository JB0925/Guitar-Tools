import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Home.css";
import Strat from "..//guitars/guitar1.png";
import Player from "../guitars/guitar2.png";
import OnStage from "../guitars/guitar3.png";

const HomePage = () => {
  return (
    <div className="Home">
        <div className="information">
            <p className="dark">Ready to practice guitar?</p>
            <h1>Welcome to Guitar Tools!</h1>
            <p className="light">Guitar Tools is your home for your guitar practice routine essentials.</p>
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
  );
};

export default HomePage;