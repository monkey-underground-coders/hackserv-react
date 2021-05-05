import { basicAxios, mainAxios } from "./utils";

export const signupPost = (userEmail, userPassword) =>
  basicAxios().post("/user/create", {
    email: userEmail,
    password: userPassword,
  });

export const loginPost = (userEmail, userPassword) =>
  basicAxios().post("/auth/convert", {
    email: userEmail,
    password: userPassword,
  });

export const updateAccessTokenPost = (refreshToken) =>
  basicAxios().post("/auth/get_access", {
    refreshToken,
  });

export const getSelfUser = () => mainAxios.get("/auth/user");
