import React from "react";
import "../CSS/LoginAndSignUpForm.css";
import useFormUpdate from "../Hooks/useFormHook";

const LoginAndSignUpForm = ({ typeOfForm, header, updateLoginState, errorMessage }) => {
    const [formData, makeStyleObjectForErrorMessage, handleChange, handleSubmit] = useFormUpdate(typeOfForm, updateLoginState);
    const styleObject = makeStyleObjectForErrorMessage(errorMessage);

    return (
        <div className="LoginAndSignUpForm">
            <h1>{header}</h1>
            <div className="container">
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
                    <button type="submit">Submit</button>
                </form>
            </div>
            <h3 style={styleObject}>{errorMessage}</h3>
        </div>
    );
};

export default LoginAndSignUpForm;