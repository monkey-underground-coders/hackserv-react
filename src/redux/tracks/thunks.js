import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTracks as getAllTracksFromAPI } from "@api";

export const getAllTracks = createAsyncThunk(
  "tracks/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllTracksFromAPI();
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message || e.response.data);
    }
  }
);
