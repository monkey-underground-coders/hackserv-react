import {
  createSelector
} from "@reduxjs/toolkit";

const authSelector = state => state.auth;
const tokensSelector = state => state.auth.tokens;

export const loggedInSelector = createSelector(
  authSelector,
  auth => auth.userId !== 0 && auth.tokens.accessToken && Date.now() < new Date(auth.tokens.accessTokenExpiredAt)
);

export const accessTokenSelector = state => state.auth.tokens.accessToken;

export const refreshTokenSelector = state => state.auth.tokens.refreshToken;

export const accessValidSelector = createSelector(
  tokensSelector,
  ({accessToken, accessTokenExpiredAt}) => accessToken && Date.now() < new Date(accessTokenExpiredAt)
);

export const refreshValidSelector = createSelector(
  tokensSelector,
  ({refreshToken, refreshTokenExpiredAt}) => refreshToken && Date.now() < new Date(refreshTokenExpiredAt)
);