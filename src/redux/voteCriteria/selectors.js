import { createSelector } from "@reduxjs/toolkit";

// tba
export const criteriaSelector = (state) => state.voteCriteria;

export const getCriteriaById = createSelector(
  criteriaSelector,
  (_, { id }) => id,
  ({ entities }, id) => entities[id]
);
