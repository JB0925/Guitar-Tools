import { useState, useRef, useEffect } from "react";

const useNavbarToggle = () => {
    const [isOpen, setIsOpen] = useState(false);

    const burgerButton = useRef();

    useEffect(() => {
        let firstTimer;
        let secondTimer;
        const pulldownMenu = document.querySelector(".pulldown");
        const pulldownUl = document.querySelector(".pulldown ul");
        const pulldownAnchorTags = document.querySelectorAll(".pulldown a");

        const openPulldownMenu = () => {
            burgerButton.current.className = "fas fa-times";
            pulldownMenu.style.display = "flex";

            firstTimer = setTimeout(() => {
                pulldownMenu.style.height = "70vh";
                pulldownUl.style.display = "flex";
                pulldownAnchorTags.forEach(tag => {
                    tag.style.display = "block";
                });
            },100);
        };

        const closePulldownMenu = () => {
            burgerButton.current.className = "fas fa-bars";
            secondTimer = setTimeout(() => {
                pulldownMenu.style.height = "0px";
                pulldownUl.style.display = "none";
                pulldownAnchorTags.forEach(tag => {
                    tag.style.display = "none";
                });
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
          clearTimeout(firstTimer);
          clearTimeout(secondTimer);
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