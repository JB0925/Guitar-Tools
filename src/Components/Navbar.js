import React, { useEffect, useRef, useState } from "react";
import Guitar from "../guitarnobg.png";
import "../CSS/Navbar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const burgerButton = useRef();

    useEffect(() => {
        let firstTimer;
        let secondTimer;
        const pulldownMenu = document.querySelector(".pulldown");
        const pulldownUl = document.querySelector(".pulldown ul");

        const clickBurger = () => {
            if (!isOpen) {
                pulldownMenu.style.display = "block";

                firstTimer = setTimeout(() => {
                    pulldownMenu.style.height = "250px";
                    pulldownUl.style.display = "flex";
                },100);
            } else {
                secondTimer = setTimeout(() => {
                    pulldownMenu.style.height = "0px";
                    pulldownUl.style.display = "none";
                },100);
            }
        };

        const changeDisplayOnResize = () => {
            if (window.innerWidth >= 900) {
                burgerButton.current.style.display = "none";
                setTimeout(() => {
                    pulldownMenu.style.height = "0px"
                    setIsOpen(isOpen => false);
                },100);
            } else {
                burgerButton.current.style.display = "block";
            }
        };
        changeDisplayOnResize();
        burgerButton.current.addEventListener('click', clickBurger);
        window.addEventListener("resize", changeDisplayOnResize);
        
    },[isOpen]);

    const handleClick = () => {
        setIsOpen(isOpen => !isOpen);
    };

    return (
        <nav>
            <img src={Guitar} alt="guitar" />
            <h1>Guitar Tools</h1>
            <i className="fas fa-bars" ref={burgerButton} onClick={handleClick}></i>
            <div className="pulldown">
                <ul>
                    <li><a href="#">Flash Cards</a></li>
                    <li><a href="#">Metronome</a></li>
                    <li><a href="#">Tuner</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;