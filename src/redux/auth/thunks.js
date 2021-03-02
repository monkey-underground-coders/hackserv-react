import { createAsyncThunk } from "@reduxjs/toolkit";

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