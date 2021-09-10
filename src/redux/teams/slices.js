import { createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getTrackById } from "@redux/tracks";
import {
  teamCreate,
  getTeamById,
  putTeam,
  deleteMember,
  changeCaptain,
  submitTeam,
  deleteTeam,
  approveTeam,
} from "./thunks";
import {
  userCreate,
  getSelf,
  userUploadResume,
  userDeleteResume,
  userPutData,
  setUserFilledForm,
} from "@redux/users";

export const teamAdapter = createEntityAdapter({
  selectId: (e) => e.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const teams = createSlice({
  name: "teams",
  initialState: teamAdapter.getInitialState({
    exception: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(teamCreate.fulfilled, (state, { payload }) => {
      teamAdapter.addOne(state, payload);
    });
    builder.addCase(deleteTeam.fulfilled, (state, { payload }) => {
      teamAdapter.removeOne(state, payload);
    });
    builder.addCase(getTeamById.rejected, (state, { payload }) => {
      state.exception = payload;
    });
    builder.addMatcher(
      isAnyOf(
        getTeamById.fulfilled,
        approveTeam.fulfilled,
        putTeam.fulfilled,
        getTrackById.fulfilled,
        changeCaptain.fulfilled,
        submitTeam.fulfilled,
        deleteMember.fulfilled
      ),
      (state, { payload }) => {
        teamAdapter.upsertMany(state, payload.teams ?? []);
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
        teamAdapter.upsertMany(state, payload.entities.teams ?? []);
      }
    );
  },
});

const reducer = teams.reducer;
export default reducer;
