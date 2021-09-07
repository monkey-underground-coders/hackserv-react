import { getTeamById, submitTeam, deleteTeam } from "@redux/teams/thunks";
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
    builder.addCase(getTeamById.fulfilled, (state, { payload }) => {
      usersAdapter.upsertMany(state, payload.users ?? []);
    });
    builder.addCase(deleteTeam.fulfilled, (state, { payload: { teamId } }) => {
      state.ids
        .map((userId) => state.entities[userId])
        .forEach((user) => {
          if (user.team === teamId)
            user.team = null;
        });
    });
    builder.addCase(submitTeam.fulfilled, (state, { payload }) => {
      usersAdapter.upsertMany(state, payload.users);
    });
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
        setUserFilledForm.fulfilled,
      ),
      (state, { payload }) => {
        usersAdapter.upsertOne(state, payload.entities.users[payload.result]);
      }
    );
  },
});

const actions = users.actions;
export const setLastEmailRequestAt = actions.setLastEmailRequestAt;

const reducer = users.reducer;

export default reducer;
