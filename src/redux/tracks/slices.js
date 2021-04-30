import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";
import { getAllTracks, createNewTrack } from "./thunks";

export const trackAdapter = createEntityAdapter({
  selectId: (e) => e.id,
  sortComparer: (a, b) => a.trackName.localeCompare(b),
});

export const tracks = createSlice({
  name: "tracks",
  initialState: trackAdapter.getInitialState(),
  reducers: {
    upsertMany: trackAdapter.upsertMany,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTracks.fulfilled, (state, { payload }) => {
      trackAdapter.setAll(state, payload);
    });
    builder.addCase(createNewTrack.fulfilled, (state, { payload }) => {
      trackAdapter.addOne(state, payload);
    });
  },
});

const actions = tracks.actions;
export const upsertMany = actions.upsertMany;

const reducer = tracks.reducer;
export default reducer;
