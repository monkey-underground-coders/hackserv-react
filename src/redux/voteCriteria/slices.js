import { createSlice, createEntityAdapter, isAnyOf } from "@reduxjs/toolkit";
import { getAllTracks, putTrack } from "@redux/tracks";

export const voteCriteriaAdapter = createEntityAdapter({
  selectId: (e) => e.id,
  sortComparer: (a, b) => a.name.localeCompare(b),
});

export const voteCriteria = createSlice({
  name: "voteCriteria",
  initialState: voteCriteriaAdapter.getInitialState(),
  reducers: {
    upsertMany: voteCriteriaAdapter.upsertMany,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTracks.fulfilled, (state, { payload }) => {
      voteCriteriaAdapter.removeAll(state);
      voteCriteriaAdapter.setAll(state, payload.criterias ?? []);
    });
    builder.addCase(putTrack.fulfilled, (state, { payload }) => {
      voteCriteriaAdapter.upsertMany(state, payload.criterias ?? []);
    });
  },
});

const actions = voteCriteria.actions;
export const upsertMany = actions.upsertMany;

const reducer = voteCriteria.reducer;
export default reducer;
