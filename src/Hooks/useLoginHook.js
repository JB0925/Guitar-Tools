import { useState } from "react";

const useLoginUpdate = () => {
    const initialLoginState = {
        statusMessage: "",
        isLoggedIn: false
    };

    const [loginState, setLoginState] = useState(initialLoginState);

    const createFeedbackMessage = (msg, typeOfForm) => {
        if (msg.indexOf('ey') === 0) {
            const successMessage = typeOfForm === "login" ? "Successfully Logged In!" : 
                                                  "Successfully Signed Up and Logged In!";
            return successMessage;
        };
        return msg;
    };

    const setIsLoggedIn = msg => {
        return msg.indexOf("Successfully") === 0;
    };

    const updateLoginState = (msg, typeOfForm) => {
        const newStatusMessage = createFeedbackMessage(msg, typeOfForm);
        setLoginState(loginState => ({
            ...loginState,
            statusMessage: newStatusMessage,
            isLoggedIn: setIsLoggedIn(newStatusMessage)
        }));
    };

    const { statusMessage, isLoggedIn } = loginState;

    return [updateLoginState, statusMessage, isLoggedIn];
};

export default useLoginUpdate;