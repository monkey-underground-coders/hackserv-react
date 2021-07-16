import { mainAxios } from "./utils";

export const teamCreate = ({ name, captainId }) =>
  mainAxios.post(`/team/create`, {
    name,
    captainId,
  });
