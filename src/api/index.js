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

export const loginPost = (userEmail, userPassword) => Promise.reject();

export const updateAccessTokenPost = (refreshToken) => Promise.reject();
