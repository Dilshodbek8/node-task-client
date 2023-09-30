import axios from "axios";

const token = localStorage.getItem("node-token");

export const instance = axios.create({
  baseURL: "http://35.222.100.184/api/",
});

if (token) {
  instance.defaults.headers.common["Authorization"] = `${token}`;
}
