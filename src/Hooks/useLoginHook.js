import { useEffect, useState } from "react";
import { useHistory } from "react-router";

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

    const handleLogin = () => {
        setLoginState(loginState => ({
            ...loginState,
            isLoggedIn: true,
            errorMessage: ""
        }));
        
        const pathname = window.location.pathname;
        if (pathname === "/") return history.push("/");
        
        return history.push("/flashcards");
    };

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
    },[]);

    const { errorMessage, isLoggedIn } = loginState;

    return [updateLoginState, errorMessage, isLoggedIn, handleLogout];
};

export default useLoginUpdate;