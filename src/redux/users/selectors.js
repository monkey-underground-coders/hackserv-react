import { createSelector } from "@reduxjs/toolkit";

import { userIdSelector } from "@redux/auth";
import { UserRole } from "@dictionary/user";

export const usersSelector = (state) => state.users;

export const getSelfUserSelector = createSelector(
  usersSelector,
  userIdSelector,
  ({ entities }, uid) => entities[uid]
);

export const getUsersByIdsSelector = createSelector(
  usersSelector,
  (_, { ids }) => ids,
  ({ entities }, ids) => ids.map((id) => entities[id])
);

export const getUserByIdSelector = createSelector(
  usersSelector,
  (_, { userId }) => userId,
  ({ entities }, uid) => entities[uid]
);

export const isSelfAdmin = createSelector(
  usersSelector,
  userIdSelector,
  ({ entities }, uid) => entities[uid].userRole === UserRole.ADMIN
);

export const lastEmailRequestAtSelector = createSelector(
  usersSelector,
  ({ lastEmailRequestAt }) => lastEmailRequestAt
);

export const getSelfRole = createSelector(
  usersSelector,
  userIdSelector,
  ({ entities }, uid) => entities[uid]?.userRole
);
