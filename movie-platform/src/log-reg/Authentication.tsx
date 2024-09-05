import axios from "axios";






export const authLogin=(email,password)=> {
     return axios.post('http://127.0.0.1:8000/api/login',{email,password})
};


export const authRegister=(name,email,password,c_password)=>{
    return axios.post('http://127.0.0.1:8000/api/register',{name,email,password,c_password})
};



