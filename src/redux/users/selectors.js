import { createSelector } from "@reduxjs/toolkit";

import { userIdSelector } from "@redux/auth";

export const usersSelector = (state) => state.users;

export const getSelfUserSelector = createSelector(
  usersSelector,
  userIdSelector,
  ({ entities }, uid) => entities[uid]
);

export const getUserByIdSelector = createSelector(
  usersSelector,
  (_, { userId }) => userId,
  ({ entities }, uid) => entities[uid]
);

export const isSelfAdmin = createSelector(
  usersSelector,
  userIdSelector,
  ({ entities }, uid) => entities[uid].userRole === "ADMIN"
);

export const lastEmailRequestAtSelector = createSelector(
  usersSelector,
  ({ lastEmailRequestAt }) => lastEmailRequestAt
);
