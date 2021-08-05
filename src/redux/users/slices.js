import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";

import {
  userCreate,
  getSelf,
  userUploadResume,
  userDeleteResume,
  userPutData,
  emailRequest,
  setUserFilledForm,
} from "./thunks";

export const usersAdapter = createEntityAdapter();

export const users = createSlice({
  name: "users",
  initialState: {
    ...usersAdapter.getInitialState(),
    lastEmailRequestAt: null,
  },
  reducers: {
    setLastEmailRequestAt(state, { payload }) {
      state.lastEmailRequestAt = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(emailRequest.rejected, emailRequest.fulfilled),
      (state, action) => {
        state.lastEmailRequestAt = Date.now();
      }
    );
    builder.addMatcher(
      isAnyOf(
        userCreate.fulfilled,
        getSelf.fulfilled,
        userUploadResume.fulfilled,
        userDeleteResume.fulfilled,
        userPutData.fulfilled,
        setUserFilledForm.fulfilled
      ),
      (state, { payload }) => {
        const { id, ...changes } = payload;
        usersAdapter.upsertOne(state, { id, ...changes });
      }
    );
  },
});

const actions = users.actions;
export const setLastEmailRequestAt = actions.setLastEmailRequestAt;

const reducer = users.reducer;

export default reducer;
