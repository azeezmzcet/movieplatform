import axios from "axios";

export const authLogin = (email: string, password: string) => {
  return axios.post("http://127.0.0.1:8000/api/login", { email, password });
};

export const authRegister = (name: string, email: string, password: string, c_password: string) => {
  return axios.post("http://127.0.0.1:8000/api/register", {
    name,
    email,
    password,
    c_password,
  });
};
