import { mainAxios } from "./utils";

export const teamCreate = ({ name, captainId }) =>
  mainAxios.post(`/team/create`, {
    name,
    captainId,
  });

export const getTeams = ({ with: withName = "", page = 0, size = 20, sort = [] }) =>
  mainAxios.get(`/team`, {
    params: {
      with: withName,
      page,
      size,
      sort,
    },
  });
