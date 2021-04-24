import { createSelector } from "@reduxjs/toolkit";

const tracksSelector = (state) => state.tracks;

export const getTrackByIdSelector = createSelector(
  tracksSelector,
  (_, { trackId }) => trackId,
  ({ entities }, tid) => entities[tid]
);

export const getAllTrackIdsSelector = createSelector(
  tracksSelector,
  ({ ids }) => ids
);
