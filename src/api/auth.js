import { basicAxios, mainAxios } from "./utils";

export const signupPost = (userEmail, userPassword) =>
  basicAxios().post("/user/create", {
    email: userEmail,
    password: userPassword,
  });

export const loginPost = (userEmail, userPassword) =>
  basicAxios()
    .post("/auth/convert", {
      email: userEmail,
      password: userPassword,
    })
    .catch((e) => {
      console.log(e);
      throw e;
    });

export const updateAccessTokenPost = (refreshToken) =>
  basicAxios().post("/auth/get_access", {
    refreshToken,
  });

export const getSelfUser = () => mainAxios.get("/auth/user");

export const invalidate = (refreshToken) =>
  mainAxios.delete("/auth/invalidate", { refreshToken });
