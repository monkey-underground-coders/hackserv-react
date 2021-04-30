import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";
import { getAllTracks } from "./thunks";

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
    // builder.addMatcher(
    //   isAnyOf(
    //     userCreate.fulfilled,
    //     getSelf.fulfilled,
    //     userUploadResume.fulfilled,
    //     userDeleteResume.fulfilled
    //   ),
    //   (state, { payload }) => {
    //     const { id, ...changes } = payload;
    //     usersAdapter.upsertOne(state, { id, ...changes });
    //   }
    // );
    builder.addCase(getAllTracks.fulfilled, (state, { payload }) => {
      // const { id, ...changes } = payload;
      trackAdapter.setAll(state, payload);
    });
  },
});

const actions = tracks.actions;
export const upsertMany = actions.upsertMany;

const reducer = tracks.reducer;
export default reducer;
