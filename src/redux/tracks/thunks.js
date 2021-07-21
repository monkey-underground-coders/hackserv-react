import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getAllTracks as getAllTracksFromAPI,
  createTrack,
  getTrackById as getTrackByIdApi,
  putTrack as putTrackApi,
  deleteTrack as deleteTrackApi,
} from "@api";
import { track } from "../schemas";
import { normalizeToolkitDecode } from "@utils";

export const getAllTracks = createAsyncThunk(
  "tracks/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllTracksFromAPI();
      return normalizeToolkitDecode(response.data, [track]);
    } catch (e) {
      return rejectWithValue(e.message || e.response.data);
    }
  }
);

export const getTrackById = createAsyncThunk(
  "tracks/getTrackById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await getTrackByIdApi(id);
      return normalizeToolkitDecode(response.data, track);
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
      return normalizeToolkitDecode(response.data, track);
    } catch (e) {
      return rejectWithValue(e.message || e.response.data);
    }
  }
);

export const putTrack = createAsyncThunk(
  "tracks/put",
  async ({ trackId, trackName }, { rejectWithValue }) => {
    try {
      const response = await putTrackApi(trackId, { trackName });
      return normalizeToolkitDecode(response.data, track);
    } catch (e) {
      return rejectWithValue(e.message || e.response.data);
    }
  }
);

export const deleteTrack = createAsyncThunk(
  "tracks/delete",
  async ({ trackId }, { rejectWithValue }) => {
    try {
      await deleteTrackApi(trackId);
      return { trackId };
    } catch (e) {
      return rejectWithValue(e.message || e.response.data);
    }
  }
);
