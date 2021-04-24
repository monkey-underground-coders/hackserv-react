import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";

export const trackAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.trackName.localeCompare(b),
});

export const tracks = createSlice({
  name: "tracks",
  initialState: {
    ...trackAdapter.getInitialState(),
    loading: false,
    currentRequestId: null,
  },
  reducers: {},
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
  },
});

const reducer = tracks.reducer;
export default reducer;
