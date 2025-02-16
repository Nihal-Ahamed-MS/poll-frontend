import axios from "axios";
import { SESSION_TOKEN } from "../service/constants";

export const baseAPI = axios.create({
    baseURL: "https://poll-backend-sxe1.onrender.com",
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(SESSION_TOKEN)}`
    }
})