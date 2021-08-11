import { 
  teamCreate as teamCreateAPI,
  putTeam as putTeamAPI,
  getTeamById as getTeamByIdApi,
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
)

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