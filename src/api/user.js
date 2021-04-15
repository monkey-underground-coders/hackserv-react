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
