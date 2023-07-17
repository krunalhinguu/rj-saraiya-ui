import axios from "axios";
import moment from "moment";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 50000,
});

instance.interceptors.request.use(
  (x) => {
    // logging request
    const request = {
      axiosRequest: {
        date: new Date(moment(new Date()).utcOffset("+0530")),
        method: x.method.toLocaleUpperCase(),
        url: `${x.baseURL}/${x.url}`,
        payload: x.data,
        headers: x.headers,
      },
    };

    process.env.NODE_ENV !== "production" && console.log(request);

    return x;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (x) => {
    // logging reponse
    const response = {
      axiosResponse: {
        date: new Date(moment(new Date()).utcOffset("+0530")),
        status: x.status,
        statusText: x.statusText,
        data: x.data,
      },
    };

    process.env.NODE_ENV !== "production" && console.log(response);

    if (x.status > 500) {
      alert("Internal Server Error. Please check your internet connection");
    }

    return x;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

export default instance;
