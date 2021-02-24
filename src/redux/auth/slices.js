import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { decodeJwt } from "@utils/jwt";
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
    authenticate(state, { payload }) {
      const {
        accessToken,
        accessTokenExpiredAt,
        refreshToken,
        refreshTokenExpiredAt,
      } = payload;

      state.tokens = {
        accessToken,
        accessTokenExpiredAt: Date.parse(accessTokenExpiredAt),
        refreshToken,
        refreshTokenExpiredAt: Date.parse(refreshTokenExpiredAt),
      };

      const { userId } = decodeJwt(accessToken);

      state.userId = userId;
    },
    logout(state) {
      state.userId = 0;
      state.tokens = {
        accessToken: false,
        accessTokenExpiredAt: false,
        refreshToken: false,
        refreshTokenExpiredAt: false,
      };
    },
  },
});

const actions = auth.actions;
export const authenticate = actions.authenticate;
export const logout = actions.logout;

const reducer = auth.reducer;
export default reducer;
