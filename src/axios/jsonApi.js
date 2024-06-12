import axios from "axios";

const jsonApi = axios.create({
  baseURL: "http://localhost:4001",
});

export default jsonApi;
