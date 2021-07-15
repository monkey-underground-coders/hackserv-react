import { createNewCriteria, deleteCriteria } from "@redux/voteCriteria";
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import { getAllTracks, createNewTrack, putTrack, deleteTrack } from "./thunks";

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
  extraReducers: {
    // @ts-ignore
    [getAllTracks.fulfilled]: (state, { payload }) => {
      trackAdapter.removeAll(state);
      trackAdapter.setAll(state, payload.tracks ?? []);
    },
    // @ts-ignore
    [createNewTrack.fulfilled]: (state, { payload }) => {
      trackAdapter.addOne(state, Object.values(payload.tracks)[0]);
    },
    // @ts-ignore
    [putTrack.fulfilled]: (state, { payload }) => {
      trackAdapter.upsertOne(state, Object.values(payload.tracks)[0]);
    },
    // @ts-ignore
    [createNewCriteria.fulfilled]: (state, { payload }) => {
      const { track, id } = Object.values(payload.criterias)[0];
      console.log(state.entities, payload);
      state.entities[track].criteriaList.push(id);
    },
    // @ts-ignore
    [deleteCriteria.fulfilled]: (state, { payload }) => {
      const { id } = payload;
      for (const trackId of state.ids) {
        const track = state.entities[trackId];
        track.criteriaList = track.criteriaList.filter((i) => i !== id);
      }
    },
    // @ts-ignore
    [deleteTrack.fulfilled]: (state, { payload }) => {
      const { trackId } = payload;
      trackAdapter.removeOne(state, trackId);
    },
  },
});

const actions = tracks.actions;
export const upsertMany = actions.upsertMany;

const reducer = tracks.reducer;
export default reducer;
