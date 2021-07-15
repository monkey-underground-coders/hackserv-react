import { mainAxios } from "./utils";

export const createCriteria = ({ trackId, name, maxValue }) =>
  mainAxios.post(`/criteria/create`, {
    trackId,
    name,
    maxValue,
  });

export const putCriteria = (id, { name, maxValue, description }) =>
  mainAxios.put(`/criteria/${id}`, { name, maxValue, description });

export const deleteCriteria = (id) => mainAxios.delete(`/criteria/${id}`);
