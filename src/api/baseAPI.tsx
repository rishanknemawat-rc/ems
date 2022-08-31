import axios from "axios";

export const TOKEN : string = "Basic cmlzaDpyaXNo";

export default axios.create({
    baseURL: "http://localhost:8080"
});
