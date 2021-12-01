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
            const { token, id } = response.data;
            window.localStorage.setItem("token", JSON.stringify(token));
            return { token, id };
        } catch (error) {
            const { message } = error.response.data.error;
            return message;
        };
    };

    static async loginUser({ username, password }) {
        const data = {
            username,
            password
        };

        try {
            const response = await axios.post(`${BASE_URL}auth/login`, data);
            const { token, id } = response.data;
            window.localStorage.setItem("token", JSON.stringify(token));
            return { token, id };
        } catch (error) {
            const { message } = error.response.data.error;
            return message;
        };
    };

    static async getGuitaristInfo(name) {
        try {
            const response = await axios.get(`${BASE_URL}guitarist/${name}`);
            return response.data;
        } catch (error) {
            const { message } = error.response.data.error;
            return message;
        };
    };

    static async getUserHighScore(id) {
        try {
            const response = await axios.get(`${BASE_URL}users/${id}`);
            const { highScore } = response.data;
            return highScore;
        } catch (error) {
            console.log(error);
            return error;
        };
    };

    static async setUserHighScore({ id, newHighScore }) {
        const data = { newHighScore };
        try {
            const response = await axios.post(`${BASE_URL}users/${id}`, data);
            const { highScore } = response.data;
            return highScore;
        } catch (error) {
            console.log(error);
            return error;
        };
    };
};

export default soundApi;