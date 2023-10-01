import axios from "axios";

const token = localStorage.getItem("node-token");

export const instance = axios.create({
  baseURL: "https://xodjakov.uz/api/",
});

if (token) {
  instance.defaults.headers.common["Authorization"] = `${token}`;
}
