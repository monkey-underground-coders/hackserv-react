import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";
import { getAllTracks, createNewTrack, putTrack } from "./thunks";

export const trackAdapter = createEntityAdapter({
  selectId: (e) => e.id,
  sortComparer: (a, b) => a.trackName.localeCompare(b.trackName),
});

export const tracks = createSlice({
  name: "tracks",
  initialState: trackAdapter.getInitialState(),
  reducers: {
    upsertMany: trackAdapter.upsertMany,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTracks.fulfilled, (state, { payload }) => {
      trackAdapter.removeAll(state);
      trackAdapter.setAll(state, payload.tracks ?? []);
    });
    builder.addCase(createNewTrack.fulfilled, (state, { payload }) => {
      trackAdapter.addOne(state, Object.values(payload.tracks)[0]);
    });
    builder.addCase(putTrack.fulfilled, (state, { payload }) => {
      trackAdapter.upsertOne(state, Object.values(payload.tracks)[0]);
    });
  },
});

const actions = tracks.actions;
export const upsertMany = actions.upsertMany;

const reducer = tracks.reducer;
export default reducer;
