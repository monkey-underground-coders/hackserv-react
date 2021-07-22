import { teamCreate as teamCreateAPI } from "@api/teams";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
