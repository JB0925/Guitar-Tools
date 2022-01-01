import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";

/**
 * useLoginUpdate Hook
 * 
 * Purpose: Handling user login and logout actions.
 * 
 * Params: None
 * 
 * Returns:
 *      - updateLoginState and handleLogout, two appropriately
 *          name functions
 *      - errorMessage: If an error has occurred, let the user 
 *          know with an error message
 *      - isLoggedIn: A boolean, passed to the navbar to let it
 *          know which links to show
 * 
 */
const useLoginUpdate = () => {
    const history = useHistory();

    const initialLoginState = {
        errorMessage: "",
        isLoggedIn: false
    };

    const [loginState, setLoginState] = useState(initialLoginState);

    const userIdIsInStorage = () => {
        return JSON.parse(window.localStorage.getItem("userId"));
    };

    const setUserIdInStorage = userId => {
        window.localStorage.setItem("userId", JSON.stringify(userId));
    };

    const removeUserIdFromStorage = () => {
        window.localStorage.removeItem("userId");
    };

    const handleInvalidLogin = (errorMessage) => {
        removeUserIdFromStorage();
        handleLogout(errorMessage);

        setTimeout(() => {
            resetErrorMessageOnly();
        },3000);
    };

    const handleLogin = useCallback(() => {
        setLoginState(loginState => ({
            ...loginState,
            isLoggedIn: true,
            errorMessage: ""
        }));
        
        const pathname = window.location.pathname;
        if (pathname === "/") return history.push("/");
        
        return history.push("/flashcards");
    },[history]);

    const handleLogout = (newErrorMessage = "") => {
        setLoginState(loginState => ({
            ...loginState,
            isLoggedIn: false,
            errorMessage: newErrorMessage
        }));
    };

    const resetErrorMessageOnly = () => {
        setLoginState(loginState => ({
            ...loginState,
            errorMessage: ""
        }));
    };

    const getFeedbackMessageIfError = msg => {
        if (msg.indexOf('ey') === 0) {
            return ""
        };
        return msg;
    };

    const determineIfApiResponseIsErrorOrSuccess = response => {
        let msg;
        let id;
        const keys = Object.keys(response);

        // If there is a token AND an id, login/registration was successful. Otherwise, an error occurred.
        if (keys.length === 2) {
            msg = response.token;
            id = response.id;
        } else {
            msg = response;
            id = null;
        }
        return { msg, id };
    };

    const updateLoginState = (response) => { 
        const { msg, id } = determineIfApiResponseIsErrorOrSuccess(response);
        const newStatusMessage = getFeedbackMessageIfError(msg);
        
        if (id) {
            setUserIdInStorage(id);
            handleLogin();
        
        } else {
            handleInvalidLogin(newStatusMessage);
        };
    };

    useEffect(() => {
        const alreadyLoggedIn = () => {
            if (userIdIsInStorage()) {
                handleLogin();
            }
        };
        alreadyLoggedIn();
    },[handleLogin]);

    const { errorMessage, isLoggedIn } = loginState;

    return [updateLoginState, errorMessage, isLoggedIn, handleLogout];
};

export default useLoginUpdate;