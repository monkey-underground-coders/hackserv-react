import { basicAxios, axiosWithBasic, mainAxios } from "./utils";

export const signupPost = (userEmail, userPassword) =>
  basicAxios()
    .post("/user/create", {
      email: userEmail,
      password: userPassword,
    })
    .then((res) => {
      /**
       * TODO: Don't handle response in a request, do callbacks in thunk instead
       */
      const user = res.data;
      console.log(user);
      return user;
    });

export const loginPost = (userEmail, userPassword) =>
  axiosWithBasic(userEmail, userPassword).post("/auth/convert");

export const updateAccessTokenPost = (refreshToken) =>
  basicAxios().post("/auth/get_access", {
    refreshToken,
  });

export const getSelfUser = () => mainAxios.get("/auth/user");
