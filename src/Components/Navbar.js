import React from "react";
import useNavbarToggle from "../Hooks/useNavbarHook";
import { NavLink } from "react-router-dom";
import Guitar from "../guitarnobg.png";
import "../CSS/Navbar.css";

const Navbar = () => {
    const [makeMenuButton] = useNavbarToggle();
    
    return (
        <nav>
            <img src={Guitar} alt="guitar" />
            <h1>Guitar Tools</h1>
            {makeMenuButton()}
            <ul id="visibleNavUl">
                <NavLink to="/flashcards" activeClassName="active">Flash Cards</NavLink>
                <NavLink to="/tuner" activeClassName="active">Tuner</NavLink>
                <NavLink to="/metronome" activeClassName="active">Metronome</NavLink>
            </ul>
            <div className="pulldown">
                <ul>
                    <NavLink to="/flashcards" activeClassName="active">Flash Cards</NavLink>
                    <NavLink to="/tuner" activeClassName="active">Tuner</NavLink>
                    <NavLink to="/metronome" activeClassName="active">Metronome</NavLink>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;