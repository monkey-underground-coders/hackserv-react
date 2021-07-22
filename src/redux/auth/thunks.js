import { createAsyncThunk } from "@reduxjs/toolkit";

import { localStorageSet } from "@utils/tokens";
import { loginPost, updateAccessTokenPost } from "@api/auth";
import { getSelf } from "@redux/users";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, store) => {
    try {
      const { data } = await loginPost(email, password);
      localStorageSet(store, data);
      await store.dispatch(getSelf());
      return data;
    } catch (e) {
      return store.rejectWithValue(e.response.data || e.message);
    }
  }
);

export const updateAccessToken = createAsyncThunk(
  "auth/update",
  async ({ refreshToken }, store) => {
    const { data } = await updateAccessTokenPost(refreshToken);
    localStorageSet(store, data);
    await store.dispatch(getSelf());
    return data;
  }
);
