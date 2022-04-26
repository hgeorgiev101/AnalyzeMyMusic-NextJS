import axios from "axios";

const baseURL: string = "https://api.spotify.com/v1/";

const Axios: any = axios.create({
  baseURL: baseURL,
});

Axios.defaults.baseURL = baseURL;
Axios.defaults.headers.post["Content-Type"] = "application/json";
Axios.defaults.headers.post["Accept"] = "application/json";
Axios.defaults.headers.patch["Content-Type"] = "application/json";

export default Axios;
