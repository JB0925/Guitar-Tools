import axios from "axios";

/** soundApi class
 * 
 * This class is used to make calls to the backend API to register
 * and login users, and serves to abstract away the AJAX calls
 * within the frontend code.
 */

const BASE_URL = process.env.BASE_URL || "http://127.0.0.1:3001/";

class soundApi {
    static async registerNewUser({ username, password }) {
        const data = {
            username,
            password
        };

        try {
            const response = await axios.post(`${BASE_URL}auth/signup`, data);
            const { token } = response.data;
            window.localStorage.setItem("token", JSON.stringify(token));
            return token;
        } catch (error) {
            return error.message;
        };
    };

    static async loginUser({ username, password }) {
        const data = {
            username,
            password
        };

        try {
            const response = await axios.post(`${BASE_URL}auth/login`, data);
            const { token } = response.data;
            window.localStorage.setItem("token", JSON.stringify(token));
            return token;
        } catch (error) {
            return error.message;
        };
    };
};

export default soundApi;