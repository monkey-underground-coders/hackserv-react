import { 
  teamCreate as teamCreateAPI,
  putTeam as putTeamAPI,
  getTeamById as getTeamByIdApi,
  deleteMember as deleteMemberAPI,
  changeCaptain as changeCaptainAPI,
  submitTeam as submitTeamAPI,
  deleteTeam as deleteTeamAPI,
  approveTeam as approveTeamAPI,
  getInternalTeamById as getInternalTeamByIdApi,
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
  async ({ id, isInternal = true }, { rejectWithValue }) => {
    try {
      const response = isInternal ? await getInternalTeamByIdApi(id) : await getTeamByIdApi(id);
      return normalizeToolkit(response.data, team);
    } catch (e) {
      return rejectWithValue(e.response.data || e.message);
    }
  }
);

export const approveTeam = createAsyncThunk(
  "teams/approveTeam",
  async ({ teamId }, { rejectWithValue }) => {
    try {
      const response = await approveTeamAPI({ teamId });
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
      const respornse = await deleteMemberAPI({ uid, teamId });
      return normalizeToolkit(respornse.data, team);
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
);

export const submitTeam = createAsyncThunk(
  "teams/submitTeam",
  async ({ teamId }, {rejectWithValue}) => {
    try {
      const response = await submitTeamAPI({ teamId });
      return normalizeToolkit(response.data, team);
    } catch (e) {
      return rejectWithValue(e.response.data || e.message);
    }
  }
);

export const deleteTeam = createAsyncThunk(
  "teams/deleteTeam",
  async ({ teamId }, {rejectWithValue}) => {
    try {
      await deleteTeamAPI({ teamId });
      return { teamId };
    } catch (e) {
      return rejectWithValue(e.response.data || e.message);
    }
  }
);

// export const getTeamByIdWithoutMembers = createAsyncThunk(
//   "teams/getTeamByIdWithoutMembers",
//   async ({ id }, {rejectWithValue}) => {
//     try {
//       const response = await getTeamByIdWithoutMembersAPI({teamId: id});
//       return normalizeToolkit(response.data, team);
//     } catch (e) {
//       return rejectWithValue(e.response.data || e.message);
//     }
//   }
// )