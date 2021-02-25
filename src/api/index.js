import * as axios from "axios";
import { Ip } from "../config";

const basicAxios = axios.create({
  baseURL: Ip(),
});

export const signupPost = (userEmail, userPassword) =>
  basicAxios
    .post("/user/create", {
      email: userEmail,
      password: userPassword,
    })
    .then((res) => {
      const user = res.data;
      console.log(user);
      return user;
    });


const defaultHeaders = {};

const defaultBodyHeaders = {
  ...defaultHeaders,
  "Content-Type": "application/json",
};


export const loginPost = (userEmail, userPassword) => {
  const encoded = window.btoa(userEmail + ":" + userPassword);
  const auth = "Basic " + encoded;
  basicAxios
    .post("/auth/convert", {
      headers: {
        ...defaultBodyHeaders,
        Authorization: auth,
    }})
    .then((res) => {
      console.log(res.data)
    })};

export const updateAccessTokenPost = (refreshToken) => Promise.reject();
