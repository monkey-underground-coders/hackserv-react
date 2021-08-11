import { mainAxios } from "./utils";

export const teamCreate = ({ name, captainId }) =>
  mainAxios.post(`/team/create`, {
    name,
    captainId,
  });

export const getTeamById = (teamId) => mainAxios.get(`/team/${teamId}`);

export const putTeam = ({ teamId, teamName, track }) => 
  mainAxios.put(`/team/${teamId}`, {
    name: teamName,
    trackId: track,
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
  