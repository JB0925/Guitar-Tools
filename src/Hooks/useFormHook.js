import { useState } from "react";
import soundApi from "../soundApi";

/**
 * useFormUpdate Hook
 * 
 * Purpose: Update the state of the form, handle form submission,
 *          and handle Login upon form submission.
 * 
 * Params: This form is semi-flexible, and can be used for login or registration:
 *      -typeOfForm: Either "Login" or "Register/Signup". Used to set the header and 
 *                   make the correct API call upon form submission.
 * 
 * Returns:
 *      -formData: the user's current submitted form values. Updates on change.
 *      -makeStyleObjectForErrorMessage: If an error occurs, we send a style along 
 *          with the error message to indicate "hey, something went wrong".
 *      -handleChange: Updates the formData as the user types
 *      -handleSubmit: Handles form submission and calls the correct backend API
 *          endpoint
 * 
 */
const useFormUpdate = (typeOfForm, updateLoginState) => {
    let response;
    const initialFormState = {
        username: "",
        password: ""
    };

    const [formData, setFormData] = useState(initialFormState);

    const updateForm = (key, newValue) => {
        setFormData(formData => ({
            ...formData,
            [key]: newValue
        }));
    };

    const handleChange = evt => {
        const { name, value } = evt.target;
        updateForm(name, value);
    };

    const handleSubmit = async(evt) => {
        evt.preventDefault();
        typeOfForm === "login" ?
        response = await soundApi.loginUser(formData)
        :
        response = await soundApi.registerNewUser(formData);
        setFormData(formData => initialFormState);
        updateLoginState(response);
    };

    const makeStyleObjectForErrorMessage = msg => {
        return { color: "red" };
    };
    
    return [formData, makeStyleObjectForErrorMessage, handleChange, handleSubmit];
};

export default useFormUpdate;