import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";

import {
  userCreate,
  getSelf,
  userUploadResume,
  userDeleteResume,
  userDownloadResume,
} from "./thunks";

export const usersAdapter = createEntityAdapter();

export const users = createSlice({
  name: "users",
  initialState: {
    ...usersAdapter.getInitialState(),
    loading: false,
    currentRequestId: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userDownloadResume.pending, (state, action) => {
      if (!state.loading) {
        state.loading = true;
        state.currentRequestId = action.meta.requestId;
      }
    });
    builder.addMatcher(
      isAnyOf(userDownloadResume.fulfilled, userDownloadResume.rejected),
      (state, action) => {
        const { requestId } = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          state.loading = false;
          state.currentRequestId = null;
        }
      }
    );
    builder.addMatcher(
      isAnyOf(
        userCreate.fulfilled,
        getSelf.fulfilled,
        userUploadResume.fulfilled,
        userDeleteResume.fulfilled
      ),
      (state, { payload }) => {
        const { id, ...changes } = payload;
        usersAdapter.upsertOne(state, { id, ...changes });
      }
    );
  },
});

const reducer = users.reducer;
export default reducer;
