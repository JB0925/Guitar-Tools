import React, { useRef, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { useNavbarToggle } from "../Hooks/useNavbarHook";
import { gsap } from "gsap/";
import { NavLink } from "react-router-dom";
import Guitar from "../guitars/guitarnobg.png";
import "../CSS/Navbar.css";

/**
 * Navbar Component
 * 
 * Purpose: Return a fixed navbar that allows the user to click links to
 *          navigate the app.
 * 
 * Params:
 *      -isLoggedIn: tells the navbar to show the links for a logged in user,
 *                   or the links for user who is not registered / logged in.
 *      -updateLogin: In this case, updateLogin is used to log out a user
 *                    when they click the "Log Out" link.
 * 
 * Returns: A navbar that will show different links depending on whether they
 *          are logged in or not. In addition, on smaller screens, the navbar turns
 *          into a pulldown menu.
 * 
 */
const Navbar = ({ isLoggedIn, updateLogin }) => {
    const history = useHistory();
    const [handleClick, burgerButton] = useNavbarToggle();
    const imgRef = useRef();
    const location = useLocation();
    
    // add animation to guitar image that reruns when the pathname changes
    useEffect(() => {
      gsap.to(imgRef.current, { rotation: "+=360" });
    },[location]);

    const handleLogout = () => {
        if (JSON.parse(window.localStorage.getItem("userId"))) {
            window.localStorage.removeItem("userId");
            
            updateLogin();
            return history.push("/");
        }
    };
    
    return (
        isLoggedIn ?
        <nav>
            <img src={Guitar} alt="guitar" ref={imgRef} />
            <h1>Guitar Tools</h1>
            <i data-testid="burgerButton" className="fas fa-bars" ref={burgerButton} onClick={handleClick}></i>
            <ul id="visibleNavUl">
                <NavLink data-testid="flashcardlink" to="/flashcards" activeClassName="active">Flash Cards</NavLink>
                <NavLink to="/tuner" activeClassName="active">Tuner</NavLink>
                <NavLink to="/metronome" activeClassName="active">Metronome</NavLink>
                <NavLink to="/guitarists" activeClassName="active">Guitarists</NavLink>
                <NavLink to="/logout" onClick={handleLogout}>Logout</NavLink>
            </ul>
            <div data-testid="pulldownMenu" className="pulldown">
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
            <img src={Guitar} alt="guitar" ref={imgRef} />
            <h1>Guitar Tools</h1>
            <i data-testid="burgerButton" className="fas fa-bars" ref={burgerButton} onClick={handleClick}></i>
            <ul id="visibleNavUl">
                <NavLink to="/flashcards" activeClassName="active">Flash Cards</NavLink>
                <NavLink to="/tuner" activeClassName="active">Tuner</NavLink>
                <NavLink to="/metronome" activeClassName="active">Metronome</NavLink>
                <NavLink to="/guitarists" activeClassName="active">Guitarists</NavLink>
                <NavLink to="/login" activeClassName="active">Login</NavLink>
                <NavLink to="/register" activeClassName="active">Register</NavLink>
            </ul>
            <div data-testid="pulldownMenu" className="pulldown">
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