import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { decode as decodeJwt, localStorageErase } from "@utils/tokens";
import { login, updateAccessToken } from "./thunks";
import { setTokens } from "./actions";

const getInitialState = () => ({
  tokens: {
    accessToken: false,
    accessTokenExpiredAt: false,
    refreshToken: false,
    refreshTokenExpiredAt: false,
  },
  userId: 0,
});

export const auth = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    logout(state) {
      localStorageErase();
      return getInitialState();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateAccessToken.rejected, () => getInitialState());
    builder.addMatcher(
      isAnyOf(login.fulfilled, updateAccessToken.fulfilled, setTokens),
      (state, { payload }) => {
        const {
          accessToken,
          accessTokenExpiringAt,
          refreshToken,
          refreshTokenExpiringAt,
        } = payload;

        state.tokens = {
          accessToken,
          accessTokenExpiredAt: accessTokenExpiringAt,
          refreshToken,
          refreshTokenExpiredAt: refreshTokenExpiringAt,
        };

        if (accessToken) {
          const { userId } = decodeJwt(accessToken);

          state.userId = userId;
        }
      }
    );
  },
});

const actions = auth.actions;
export const authenticate = actions.authenticate;
export const logout = actions.logout;

const reducer = auth.reducer;
export default reducer;
