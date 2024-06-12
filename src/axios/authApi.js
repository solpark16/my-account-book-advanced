import axios from "axios";

const authApi = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
});

export default authApi;
