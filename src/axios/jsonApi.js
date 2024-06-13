import axios from "axios";

const jsonApi = axios.create({
  baseURL: "https://valiant-fossil-cupcake.glitch.me",
});

export default jsonApi;
