import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const useLoginUpdate = () => {
    const history = useHistory();
    useEffect(() => {
        const alreadyLoggedIn = () => {
            const userIdIsPresent = JSON.parse(window.localStorage.getItem("userId"));
            if (userIdIsPresent) return history.push("/flashcards");
        };
        alreadyLoggedIn();
    },[]);

    const initialLoginState = {
        statusMessage: "",
        isLoggedIn: false
    };

    const [loginState, setLoginState] = useState(initialLoginState);

    const createFeedbackMessage = (msg, typeOfForm) => {
        if (msg.indexOf('ey') === 0) {
            // const successMessage = typeOfForm === "login" ? "Successfully Logged In!" : 
            //                                       "Successfully Signed Up and Logged In!";
            // return successMessage;
            return ""
        };
        return msg;
    };

    const setIsLoggedIn = msg => {
        return msg.indexOf("Successfully") === 0;
    };

    const determineTypeOfResponse = response => {
        let msg;
        let id;
        const keys = Object.keys(response);

        if (keys.length === 2) {
            msg = response.token;
            id = response.id;
        } else {
            msg = response;
            id = null;
        }
        return { msg, id };
    };

    const updateLoginState = (response, typeOfForm) => { 
        const { msg, id } = determineTypeOfResponse(response);
        const newStatusMessage = createFeedbackMessage(msg, typeOfForm);

        if (id) {
            window.localStorage.setItem("userId", JSON.stringify(id));
            return history.push("/flashcards");
        } else {
            window.localStorage.removeItem("userId");
        }

        setLoginState(loginState => ({
            ...loginState,
            statusMessage: newStatusMessage,
            isLoggedIn: setIsLoggedIn(newStatusMessage)
        }));
    };

    const { statusMessage, isLoggedIn, userId } = loginState;

    return [updateLoginState, statusMessage, isLoggedIn, userId];
};

export default useLoginUpdate;