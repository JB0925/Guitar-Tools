import React from "react";
import { useHistory } from "react-router";
import { useNavbarToggle, useLoginToggle } from "../Hooks/useNavbarHook";
import { NavLink } from "react-router-dom";
import Guitar from "../guitarnobg.png";
import "../CSS/Navbar.css";

const Navbar = ({ isLoggedIn, updateLogin }) => {
    const history = useHistory();
    const [handleClick, burgerButton] = useNavbarToggle();
    // const [isLoggedIn, toggleLoggedInStatus] = useLoginToggle();

    const handleLogout = () => {
        if (JSON.parse(window.localStorage.getItem("userId"))) {
            window.localStorage.removeItem("userId");
            
            updateLogin();
            return history.push("/flashcards");
        }
    };
    
    return (
        isLoggedIn ?
        <nav>
            <img src={Guitar} alt="guitar" />
            <h1>Guitar Tools</h1>
            <i className="fas fa-bars" ref={burgerButton} onClick={handleClick}></i>
            <ul id="visibleNavUl">
                <NavLink to="/flashcards" activeClassName="active">Flash Cards</NavLink>
                <NavLink to="/tuner" activeClassName="active">Tuner</NavLink>
                <NavLink to="/metronome" activeClassName="active">Metronome</NavLink>
                <NavLink to="/guitarists" activeClassName="active">Guitarists</NavLink>
                <NavLink to="/logout" onClick={handleLogout}>Logout</NavLink>
            </ul>
            <div className="pulldown">
                <ul>
                    <NavLink to="/flashcards" activeClassName="active">Flash Cards</NavLink>
                    <NavLink to="/tuner" activeClassName="active">Tuner</NavLink>
                    <NavLink to="/metronome" activeClassName="active">Metronome</NavLink>
                    <NavLink to="/guitarists" activeClassName="active">Guitarists</NavLink>
                    <NavLink to="/logout" onClick={handleLogout}>Logout</NavLink>
                </ul>
            </div>
        </nav>
        :
        <nav>
            <img src={Guitar} alt="guitar" />
            <h1>Guitar Tools</h1>
            <i className="fas fa-bars" ref={burgerButton} onClick={handleClick}></i>
            <ul id="visibleNavUl">
                <NavLink to="/flashcards" activeClassName="active">Flash Cards</NavLink>
                <NavLink to="/tuner" activeClassName="active">Tuner</NavLink>
                <NavLink to="/metronome" activeClassName="active">Metronome</NavLink>
                <NavLink to="/guitarists" activeClassName="active">Guitarists</NavLink>
                <NavLink to="/login" activeClassName="active">Login</NavLink>
                <NavLink to="/register" activeClassName="active">Register</NavLink>
            </ul>
            <div className="pulldown">
                <ul>
                    <NavLink to="/flashcards" activeClassName="active">Flash Cards</NavLink>
                    <NavLink to="/tuner" activeClassName="active">Tuner</NavLink>
                    <NavLink to="/metronome" activeClassName="active">Metronome</NavLink>
                    <NavLink to="/guitarists" activeClassName="active">Guitarists</NavLink>
                    <NavLink to="/login" activeClassName="active">Login</NavLink>
                    <NavLink to="/register" activeClassName="active">Register</NavLink>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;