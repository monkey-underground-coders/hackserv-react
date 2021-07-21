import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { deleteTrack, getAllTracks, getTrackById, putTrack } from "@redux/tracks/thunks";
import { createNewCriteria, deleteCriteria, putCriteria } from "./thunks";

export const voteCriteriaAdapter = createEntityAdapter({
  selectId: (e) => e.id,
  sortComparer: (a, b) => b.name.localeCompare(a),
});

export const voteCriteria = createSlice({
  name: "voteCriteria",
  initialState: voteCriteriaAdapter.getInitialState(),
  reducers: {
    upsertMany: voteCriteriaAdapter.upsertMany,
  },
  extraReducers: {
    [getAllTracks.fulfilled]: (state, { payload }) => {
      voteCriteriaAdapter.removeAll(state);
      voteCriteriaAdapter.setAll(state, payload.criterias ?? []);
    },
    [putTrack.fulfilled]: (state, { payload }) => {
      voteCriteriaAdapter.upsertMany(state, payload.criterias ?? []);
    },
    [getTrackById.fulfilled]: (state, { payload }) => {
      voteCriteriaAdapter.upsertMany(state, payload.criterias ?? []);
    },
    [createNewCriteria.fulfilled]: (state, { payload }) => {
      voteCriteriaAdapter.addOne(state, Object.values(payload.criterias)[0]);
    },
    [putCriteria.fulfilled]: (state, { payload }) => {
      voteCriteriaAdapter.upsertOne(state, Object.values(payload.criterias)[0]);
    },
    [deleteCriteria.fulfilled]: (state, { payload }) => {
      voteCriteriaAdapter.removeOne(state, payload.id);
    },
    [deleteTrack.fulfilled]: (state, { payload }) => {
      const { trackId } = payload;
      voteCriteriaAdapter.removeMany(
        state,
        state.ids.filter((id) => state.entities[id].track === trackId)
      );
    },
  },
});

const actions = voteCriteria.actions;
export const upsertMany = actions.upsertMany;

const reducer = voteCriteria.reducer;
export default reducer;
