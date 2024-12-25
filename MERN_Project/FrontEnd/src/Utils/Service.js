import axios from "axios";
import { codeError } from "./Functions/Functions"

const BaseUrl = process.env.REACT_APP_BASEURL;

const api = axios.create({
    baseURL: BaseUrl, // Replace with your API's base URL
    // timeout: 10000, // Timeout after 10 seconds
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    },
});

// export const loginService = async (method, body) => {
//     try {
//         const url = `${BaseUrl}${method}`;
//         return await axios.post(url, body);
//     } catch (error) {
//         codeError(error);
//     }
// }
export const loginService = (method, body) => {
    const url = `${BaseUrl}${method}`;

    return axios
        .post(url, body)
        .then((response) => {
            // Handle success
            return response.data; // Return the API response data
        })
        .catch((error) => {
            throw error.response?.data || error.message; // Propagate the error for further handling
        });
};

export const getService = (method) => {
    try {
        const url = `${BaseUrl}${method}`;
        return api.get(url);
    } catch (error) {
        codeError(error);
    }
}

export const PostService = (method, body) => {
    return api.post(method, body);
}
