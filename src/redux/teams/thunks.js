import { teamCreate as teamCreateAPI } from "@api/teams";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { decodeEscapedEntity } from "@utils";

export const teamCreate = createAsyncThunk(
  "teams/create",
  // @ts-ignore
  async ({ name, captainId }, { rejectWithValue }) => {
    try {
      const response = await teamCreateAPI({ name, captainId });
      return decodeEscapedEntity(response.data);
    } catch (e) {
      return rejectWithValue(e.response.data || e.message);
    }
  }
);
