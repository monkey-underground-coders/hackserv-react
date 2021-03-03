import { createSlice } from "@reduxjs/toolkit";

import { decode as decodeJwt } from "@utils/jwt";
import { login, updateAccessToken } from "./thunks";
import { setTokens } from "./actions";

const innerSetTokens = (
  state,
  { accessToken, accessTokenExpiringAt, refreshToken, refreshTokenExpiringAt }
) => {
  state.tokens = {
    accessToken,
    accessTokenExpiredAt: accessTokenExpiringAt,
    refreshToken,
    refreshTokenExpiredAt: refreshTokenExpiringAt,
  };

  const { userId } = decodeJwt(accessToken);

  state.userId = userId;
};

export const auth = createSlice({
  name: "auth",
  initialState: {
    tokens: {
      accessToken: false,
      accessTokenExpiredAt: false,
      refreshToken: false,
      refreshTokenExpiredAt: false,
    },
    userId: 0,
  },
  reducers: {
    logout(state) {
      state = undefined;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, { payload }) => {
      setTokens(state, payload);
    },
    [updateAccessToken.fulfilled]: (state, { payload }) => {
      setTokens(state, payload);
    },
    [updateAccessToken.rejected]: (state) => {
      state = undefined;
    },
    [setTokens]: (state, { payload }) => {
      innerSetTokens(state, payload);
    },
  },
});

const actions = auth.actions;
export const authenticate = actions.authenticate;
export const logout = actions.logout;

const reducer = auth.reducer;
export default reducer;
