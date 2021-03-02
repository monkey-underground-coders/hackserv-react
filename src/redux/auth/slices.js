import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import { decode as decodeJwt } from "@utils/jwt";
import { loginPost, updateAccessTokenPost } from "@api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    const response = await loginPost(email, password);
    return response;
  }
);

export const updateAccessToken = createAsyncThunk(
  "auth/update",
  async ({ refreshToken }, thunkAPI) => {
    const response = await updateAccessTokenPost(refreshToken);
    return response;
  }
);

const innerSetTokens = (state, { accessToken, accessTokenExpiringAt, refreshToken, refreshTokenExpiringAt }) => {
  state.tokens = {
    accessToken,
    accessTokenExpiredAt: accessTokenExpiringAt,
    refreshToken,
    refreshTokenExpiredAt: refreshTokenExpiringAt,
  };

  const { userId } = decodeJwt(accessToken);

  state.userId = userId;
}

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
    setTokens(state, { payload }) {
      innerSetTokens(state, payload);
    }
  },
  extraReducers: {
    [login.fulfilled]: (state, { payload }) => {
      setTokens(state, payload);
    },
    [updateAccessToken.fulfilled]: (state, { payload }) => {
      setTokens(state, payload);
    }
  }
});

const actions = auth.actions;
export const authenticate = actions.authenticate;
export const logout = actions.logout;
export const setTokens = actions.setTokens;

const reducer = auth.reducer;
export default reducer;
