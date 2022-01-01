import { useState, useRef, useEffect } from "react";

/** 
 * useNavbarToggle Hook
 * 
 * Purpose: Allow the user to open and close the navbar on smaller screens
 * 
 * Params: None
 * 
 * Returns: functions that allow the navbar pulldown to be open and closed, 
 *             as well as trigger event listeners on the "Burger button" menu,
 *             as well as links in the pulldown menu.
 *          Also returns "isLoggedIn", a boolean that is passed to the navbar
 *          to let it know which links to show the user, and a function that 
 *          is used to handle a user logging out by clicking on the log out 
 *          link.
 * 
 */
const useNavbarToggle = () => {
    const [isOpen, setIsOpen] = useState(false);

    const burgerButton = useRef();

    useEffect(() => {
        let current = burgerButton.current;
        const pulldownMenu = document.querySelector(".pulldown");
        const pulldownUl = document.querySelector(".pulldown ul");
        const pulldownAnchorTags = document.querySelectorAll(".pulldown a");

        const changePulldownTransitionOnScreenOrientation = () => {
            if (window.matchMedia("(orientation: landscape)") && window.innerWidth <= 900) {
                pulldownMenu.style.paddingTop = "100px";
                pulldownMenu.style.transition = "padding-top 400ms";
            } else {
                pulldownMenu.style.transition = "height 400ms";
                if (window.innerWidth === 412 && window.innerHeight === 915) {
                  pulldownUl.style.marginTop = "-300px";
                } else {
                    pulldownUl.style.marginTop = "-200px";
                }
            };
        };

        const openPulldownMenu = () => {
            burgerButton.current.className = "fas fa-times";
            pulldownMenu.style.display = "flex";

            setTimeout(() => {
                pulldownMenu.style.height = "100vh";
                pulldownUl.style.display = "flex";
                pulldownAnchorTags.forEach(tag => {
                    tag.style.display = "block";
                });
                changePulldownTransitionOnScreenOrientation();
            },100);
        };

        const closePulldownMenu = () => {
            burgerButton.current.className = "fas fa-bars";
            setTimeout(() => {
                pulldownMenu.style.height = "0px";
                pulldownUl.style.display = "none";
                pulldownAnchorTags.forEach(tag => {
                    tag.style.display = "none";
                });
                pulldownMenu.style.paddingTop = "0";
            },100);
        };

        const clickBurger = () => {
            if (!isOpen) {
                openPulldownMenu();

            } else {
                closePulldownMenu();
            };
        };

        const changeDisplayOnResize = () => {
            if (!burgerButton.current) return;
            if (window.innerWidth >= 1150) {
                burgerButton.current.style.display = "none";

                setTimeout(() => {
                    closePulldownMenu();
                    setIsOpen(isOpen => false);
                },100);
            } else {
                burgerButton.current.style.display = "block";
            }
        };

        changeDisplayOnResize();
        burgerButton.current.addEventListener('click', clickBurger);

        pulldownAnchorTags.forEach(tag =>{
            tag.addEventListener('click', () => {
                closePulldownMenu();
                setIsOpen(false);
            });
        });

        window.addEventListener("resize", changeDisplayOnResize);
        return () => {
          current.removeEventListener('click', clickBurger);
          window.removeEventListener('resize', changeDisplayOnResize);
        };

    },[isOpen]);


    const handleClick = () => {
        setIsOpen(isOpen => !isOpen);
    };

    return [handleClick, burgerButton];
};

const useLoginToggle = () => {
    const currentLoginStatus = JSON.parse(window.localStorage.getItem("userId"));
    const [isLoggedIn, setIsLoggedIn] = useState(currentLoginStatus);

    const toggleLoggedInStatus = (loginStatus) => {
        setIsLoggedIn(isLoggedIn => loginStatus);
    };

    return [isLoggedIn, toggleLoggedInStatus];
};

export {
    useNavbarToggle,
    useLoginToggle
};