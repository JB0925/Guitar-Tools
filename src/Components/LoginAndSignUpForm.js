import React from "react";
import "../CSS/LoginAndSignUpForm.css";
import useFormUpdate from "../Hooks/useFormHook";

/**
 * Form Component
 * 
 * Purpose: Allows a user to register and / or sign in
 * 
 * Params: 
 *      -typeOfForm: determines whether the form is used for login or registration
 *      -header: Pass in a custom header, such as "Login to Our App" or "Sign Up Today!"
 *      -updateLoginState: A function that sets the user's login data in state
 *      -errorMessage: If a user tries to login and is unsuccessful, an error message will show.
 * 
 * Returns: A flexible form that can be used for either Login or Registration to the app.
 * 
 */
const LoginAndSignUpForm = ({ typeOfForm, header, updateLoginState, errorMessage }) => {
    const [formData, makeStyleObjectForErrorMessage, handleChange, handleSubmit] = useFormUpdate(typeOfForm, updateLoginState);
    const styleObject = makeStyleObjectForErrorMessage(errorMessage);

    return (
        <div className="LoginAndSignUpForm">
            <div className="container2">
            <h1>{header}</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        id="username"
                        onChange={handleChange}
                        placeholder="Enter Your Username"
                        required
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        id="password"
                        onChange={handleChange}
                        placeholder="Enter Your Password"
                        required
                    />
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
            <h3 style={styleObject}>{errorMessage}</h3>
        </div>
    );
};

export default LoginAndSignUpForm;