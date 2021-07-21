import { createSelector } from "@reduxjs/toolkit";

export const teamsSelector = (state) => state.teams;

export const getTeamsByIds = createSelector(
  teamsSelector,
  (_, { ids }) => ids,
  ({ entities }, ids) => ids.map((id) => entities[id])
);
