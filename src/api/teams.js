import { mainAxios } from "./utils";

export const changeCaptain = ({ uid, teamId }) =>
  mainAxios.post(`/team/${teamId}/change_captain`, {
    userId: uid,
  });

export const deleteTeam = ({ teamId }) =>
  mainAxios.delete(`/team/${teamId}`);

export const deleteMember = ({ uid, teamId }) =>
  mainAxios.delete(`/team/${teamId}/del_member`, { data: {
    userId: uid,
  } });

export const submitTeam = ({ teamId }) =>
  mainAxios.post(`/team/${teamId}/submit`);

export const teamCreate = ({ name, captainId }) =>
  mainAxios.post(`/team/create`, {
    name,
    captainId,
  });

export const getTeamById = (teamId) =>
  mainAxios.get(`/team/${teamId}/internal`);

export const putTeam = ({ teamId, teamName, track }) =>
  mainAxios.put(`/team/${teamId}`, {
    name: teamName,
    trackId: track,
  });

export const getTeams = ({
  with: withName = "",
  page = 0,
  size = 20,
  sort = [],
}) =>
  mainAxios.get(`/team`, {
    params: {
      with: withName,
      page,
      size,
      sort,
    },
  });
