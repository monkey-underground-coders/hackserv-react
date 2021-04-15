import { createSelector } from "@reduxjs/toolkit";

import { userIdSelector } from "@redux/auth";

const usersSelector = (state) => state.users;

export const getSelfUserSelector = createSelector(
  usersSelector,
  userIdSelector,
  ({ entities }, uid) => entities[uid]
);