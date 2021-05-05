import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";

import {
  userCreate,
  getSelf,
  userUploadResume,
  userDeleteResume,
  userPutData,
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
    builder.addMatcher(
      isAnyOf(
        userCreate.fulfilled,
        getSelf.fulfilled,
        userUploadResume.fulfilled,
        userDeleteResume.fulfilled,
        userPutData.fulfilled
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
