import { localStorageSet } from "@utils/tokens";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginPost, updateAccessTokenPost } from "@api/auth";
import { getSelf } from "@redux/users";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, store) => {
    const { data } = await loginPost(email, password);
    localStorageSet(store, data);
    await store.dispatch(getSelf());
    return data;
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
