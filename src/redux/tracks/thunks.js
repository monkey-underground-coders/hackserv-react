import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTracks as getAllTracksFromAPI, createTrack } from "@api";
import { decodeEscapedEntity } from "@utils";

export const getAllTracks = createAsyncThunk(
  "tracks/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllTracksFromAPI();
      return response.data.map(decodeEscapedEntity);
    } catch (e) {
      return rejectWithValue(e.message || e.response.data);
    }
  }
);

export const createNewTrack = createAsyncThunk(
  "tracks/create",
  async ({ name }, { rejectWithValue }) => {
    try {
      const response = await createTrack(name);
      return decodeEscapedEntity(response.data);
    } catch (e) {
      return rejectWithValue(e.message || e.response.data);
    }
  }
);
