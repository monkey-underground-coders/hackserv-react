import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getTrackById } from "@redux/tracks";
import { 
  teamCreate,
  getTeamById,
  putTeam, 
} from "./thunks";

export const teamAdapter = createEntityAdapter({
  selectId: (e) => e.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const teams = createSlice({
  name: "teams",
  initialState: teamAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [teamCreate.fulfilled]: (state, { payload }) => {
      teamAdapter.addOne(state, payload);
    },
    [getTrackById.fulfilled]: (state, { payload }) => {
      teamAdapter.upsertMany(state, payload.teams ?? []);
    },
    [getTeamById.fulfilled]: (state, { payload }) => {
      teamAdapter.upsertOne(state, Object.values(payload.teams)[0]);
    },
    [putTeam.fulfilled]: (state, { payload}) => {
      teamAdapter.upsertOne(state, Object.values(payload.teams)[0]);
    }
  },
});

const reducer = teams.reducer;
export default reducer;
