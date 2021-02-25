import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
      state.userId = 0;
      state.tokens = {
        accessToken: false,
        accessTokenExpiredAt: false,
        refreshToken: false,
        refreshTokenExpiredAt: false,
      };
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, { payload }) => {
      const {
        accessToken,
        accessTokenExpiringAt,
        refreshToken,
        refreshTokenExpiringAt,
      } = payload;
    
      state.tokens = {
        accessToken,
        accessTokenExpiredAt: new Date(accessTokenExpiringAt),
        refreshToken,
        refreshTokenExpiredAt: new Date(refreshTokenExpiringAt),
      };

      const { userId } = decodeJwt(accessToken);

      state.userId = userId;
    }
  }
});

const actions = auth.actions;
export const authenticate = actions.authenticate;
export const logout = actions.logout;

const reducer = auth.reducer;
export default reducer;
