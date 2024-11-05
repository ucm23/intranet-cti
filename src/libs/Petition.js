import axios from "axios";
import { baseURL, headers } from "./main";

const axiosAPIInstance = axios.create({ baseURL, headers });

const Fetcher = async (args) => {
    console.log("🚀 ~ ~ args:", args)
    let response = {};
    try {
        response = await axiosAPIInstance(args);
        axiosAPIInstance.interceptors.response.use(
            response => {
                return response;
            }
        );
    } catch (error) {
        response = error
        if (error.response) response = error.response;
        else if (error.request) response = error.request;
        else response = error.message;
    } finally {
        return response;
    }
}

export default Fetcher;