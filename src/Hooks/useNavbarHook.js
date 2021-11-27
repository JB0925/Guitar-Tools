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

        const clickBurger = () => {
            if (!isOpen) {
                pulldownMenu.style.display = "flex";

                firstTimer = setTimeout(() => {
                    pulldownMenu.style.height = "250px";
                    pulldownUl.style.display = "flex";
                    pulldownAnchorTags.forEach(tag => {
                        tag.style.display = "block";
                    });
                },100);
            } else {
                secondTimer = setTimeout(() => {
                    pulldownMenu.style.height = "0px";
                    pulldownUl.style.display = "none";
                    pulldownAnchorTags.forEach(tag => {
                        tag.style.display = "none";
                    });
                },100);
            }
        };

        const changeDisplayOnResize = () => {
            if (window.innerWidth >= 900) {
                burgerButton.current.style.display = "none";

                setTimeout(() => {
                    pulldownMenu.style.height = "0px";
                    pulldownAnchorTags.forEach(tag => {
                        tag.style.display = "none";
                    });
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

    const makeMenuButton = () => {
        if (isOpen) return <i className="fas fa-times" ref={burgerButton} onClick={handleClick}></i>
        return <i className="fas fa-bars" ref={burgerButton} onClick={handleClick}></i>
    };

    return [makeMenuButton];
};

export default useNavbarToggle;