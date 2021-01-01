import Axios from "axios";

const setHeaders = (token) => {
  if (token) {
    Axios.create({
      baseURL: "https://movie0706.cybersoft.edu.vn/api",
    }).defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete Axios.create({
      baseURL: "https://movie0706.cybersoft.edu.vn/api",
    }).defaults.headers.common["Authorization"];
  }
};

export default setHeaders;
