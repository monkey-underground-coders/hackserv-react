import { basicAxios, mainAxios } from "./utils";

export const postResume = (file, userId) => {
  const formData = new FormData();
  formData.append("file", file);
  return mainAxios.post(`/user/${userId}/cv/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteResume = (userId) => mainAxios.delete(`/user/${userId}/cv/`);

export const getResume = (userId) =>
  mainAxios.get(`/user/${userId}/cv/`, {
    responseType: "blob",
  });

export const putUserInfo = (userId, userInfo) =>
  mainAxios.put(`/user/${userId}`, userInfo);

export const emailValidate = (userId, { token }) =>
  mainAxios.post(`/user/${userId}/email/validate`, { token });

export const emailRequest = (userId) =>
  mainAxios.post(`/user/${userId}/email/req`);

export const emailValidateById = (userId, { id }) =>
  basicAxios().post(`/user/${userId}/email/validate_by_id`, { id });
