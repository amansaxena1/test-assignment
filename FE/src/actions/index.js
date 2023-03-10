import axios from 'axios'
const backend_url = "http://localhost:5000/"
export const validateCreds = async (data) => {
    const response = await axios
        .post(`${backend_url}validate-creds`, data)
        .then((res) => res).catch((err) => err);
    return response.data.data;
}

export const testDetails = async (data) => {
    const response = await axios
        .post(`${backend_url}test-details`, data)
        .then((res) => res).catch((err) => err);
    return response.data.data;
}

export const sendImage = async (data) => {
    const response = await axios
        .post(`${backend_url}send-image`, data)
        .then((res) => res).catch((err) => err);
    return response.data.data;
}

export const getAllTests = async () => {
    const response = await axios
        .get(`${backend_url}all-tests`)
        .then((res) => res).catch((err) => err);
    return response.data.data;
}

export const getUserData = async (data) => {
    const response = await axios
        .post(`${backend_url}user-data`, data)
        .then((res) => res).catch((err) => err);
    return response.data.data;
}

export const updateIntervalOrDuration = async (data) => {
    const response = await axios
        .post(`${backend_url}update-interval-or-duration`, data)
        .then((res) => res).catch((err) => err);
        console.log(response.data)
    return response.data.data;
}
