import * as axios from "axios";
import { Ip } from "../config";


const defaultHeaders = {};

const defaultBodyHeaders = {
  ...defaultHeaders,
  "Content-Type": "application/json",
};

const basicAxios = () => axios.create({
  baseURL: Ip(),
  headers: defaultBodyHeaders
});

const axiosWithBasic = (email, password) => axios.create({
  baseURL: Ip(),
  headers: defaultBodyHeaders,
  auth: {
    username: email,
    password
  }
});

const mainAxios = (access) => axios.create({
  baseURL: Ip(),
  headers: { 
    ...defaultBodyHeaders,
    Authorization: `Bearer ${access}`
  }
});

export const signupPost = (userEmail, userPassword) =>
  basicAxios()
    .post("/user/create", {
      email: userEmail,
      password: userPassword,
    })
    .then((res) => {
      const user = res.data;
      console.log(user);
      return user;
    });

export const loginPost = (userEmail, userPassword) => 
  axiosWithBasic(userEmail, userPassword)
    .post("/auth/convert")
    .then((res) => {
      console.log(res.data)
      return res.data;
    });

export const updateAccessTokenPost = (refreshToken) => {
  alert(refreshToken);
  return basicAxios()
    .post("/auth/get_access", {
      refreshToken,
    })
    .then((res) => {
      console.log(res)
      return res.data;
    });
  }