import { mainAxios } from "./utils";

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

export const putUserInfo = (userId, userInfo) => {
  return mainAxios.put(`/user/${userId}`, userInfo, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};