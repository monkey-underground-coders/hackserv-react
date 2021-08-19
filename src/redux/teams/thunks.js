import { 
  teamCreate as teamCreateAPI,
  putTeam as putTeamAPI,
  getTeamById as getTeamByIdApi,
  deleteMember as deleteMemberAPI,
  changeCaptain as changeCaptainAPI,
} from "@api/teams";
import { team } from "@validation/normalizr";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { normalizeToolkit } from "@utils"


export const teamCreate = createAsyncThunk(
  "teams/create",
  async ({ name, captainId }, { rejectWithValue }) => {
    try {
      const response = await teamCreateAPI({ name, captainId });
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data || e.message);
    }
  }
);

export const getTeamById = createAsyncThunk(
  "teams/getTeamById",
  async ({ id }, { rejectWithValue }) => {
    try{
      const response = await getTeamByIdApi(id);
      return normalizeToolkit(response.data, team);
    } catch (e) { 
      return rejectWithValue(e.response.data || e.message);
    }
  }
);

export const deleteMember = createAsyncThunk(
  "teams/deleteMember",
  async ({ uid, teamId }, { rejectWithValue }) => {
    try {
      await deleteMemberAPI({ uid, teamId });
      return { uid, teamId };
    } catch (e) {
      return rejectWithValue(e.response.data || e.message);
    }
  }
);

export const putTeam = createAsyncThunk(
  "teams/put",
  async ({ teamId, teamName, track }, { rejectWithValue }) => {
    try {
      const response = await putTeamAPI({ teamId, teamName, track});
      return normalizeToolkit(response.data, team);
    } catch (e) {
      return rejectWithValue(e.response.data || e.message);
    }
  }
);

export const changeCaptain = createAsyncThunk(
  "teams/changeCaptain",
  async ({ uid, teamId }, {rejectWithValue}) => {
    try {
      const response = await changeCaptainAPI({ uid, teamId });
      return normalizeToolkit(response.data, team);
    } catch (e) {
      return rejectWithValue(e.response.data || e.message);
    }
  }
)