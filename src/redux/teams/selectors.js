import { getSelfUserSelector } from "@redux/users";
import { createSelector } from "@reduxjs/toolkit";

export const teamsSelector = (state) => state.teams;

export const getTeamsByIds = createSelector(
  teamsSelector,
  (_, { ids }) => ids,
  ({ entities }, ids) => ids.map((id) => entities[id])
);

export const getSelfTeamSelector = createSelector(
  teamsSelector,
  getSelfUserSelector,
  ({ entities }, { team }) => entities[team]
);

export const getTeamByIdSelector = createSelector(
  teamsSelector,
  (_, { id }) => id,
  ({ entities }, id) => entities[id]
);

export const haveTeam = createSelector(
  teamsSelector,
  getSelfUserSelector,
);

export const getExceptionSelector = createSelector(
  teamsSelector,
  ({ exception }) => exception
);