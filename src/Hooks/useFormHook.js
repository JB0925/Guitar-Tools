import { useState } from "react";
import soundApi from "../soundApi";

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
        updateLoginState(response, typeOfForm);
    };

    const makeStyleObjectForLoginStatus = msg => {
        if (msg.indexOf("Successfully") === 0) return { color: "green" };
        return { color: "red" };
    };
    
    return [formData, makeStyleObjectForLoginStatus, handleChange, handleSubmit];
};

export default useFormUpdate;