import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";

import { userCreate, getSelf, userUploadResume } from "./thunks";

export const usersAdapter = createEntityAdapter();

export const users = createSlice({
  name: "users",
  initialState: {
    ...usersAdapter.getInitialState(),
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        userCreate.fulfilled,
        getSelf.fulfilled,
        userUploadResume.fulfilled
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
