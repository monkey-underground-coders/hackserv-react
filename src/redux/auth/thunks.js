import { localStorageTokensSet } from "@api/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginPost, updateAccessTokenPost } from "@api/auth";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, store) => {
    const { data } = await loginPost(email, password);
    localStorageTokensSet(store, data);
    return data;
  }
);

export const updateAccessToken = createAsyncThunk(
  "auth/update",
  async ({ refreshToken }, store) => {
    const { data } = await updateAccessTokenPost(refreshToken);
    localStorageTokensSet(store, data);
    return data;
  }
);
