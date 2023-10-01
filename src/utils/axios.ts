import axios from "axios";

const token = localStorage.getItem("node-token");

export const instance = axios.create({
  baseURL: "https://xodjakov.uz/api/",
});

//add token to axios instance
if (token) {
  instance.defaults.headers.common["Authorization"] = `${token}`;
}
