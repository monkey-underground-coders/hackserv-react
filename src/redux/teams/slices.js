import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { teamCreate } from "./thunks";

export const teamAdapter = createEntityAdapter({
  selectId: (e) => e.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const teams = createSlice({
  name: "teams",
  initialState: teamAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [teamCreate.fulfilled]: (state, { payload }) => {
      teamAdapter.addOne(state, payload);
    },
  },
});

const reducer = teams.reducer;
export default reducer;
