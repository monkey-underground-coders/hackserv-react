import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  signupPost,
  postResume,
  deleteResume,
  getSelfUser,
  putUserInfo,
  emailValidate as emailValidateApi,
  emailRequest as emailRequestApi,
} from "@api";
import { createAsyncThunkWrapped } from "@utils";
import { setLastEmailRequestAt } from "./slices";

export const userCreate = createAsyncThunk(
  "users/create",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await signupPost(email, password);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data || e.message);
    }
  }
);

export const userUploadResume = createAsyncThunk(
  "user/cv/upload",
  async ({ file, userId }) => {
    const response = await postResume(file, userId);
    return response.data;
  }
);

export const userDeleteResume = createAsyncThunk(
  "user/cv/delete",
  async ({ userId }) => {
    const response = await deleteResume(userId);
    return response.data;
  }
);

export const getSelf = createAsyncThunk(
  "users/getSelf",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSelfUser();
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message || e.response.data);
    }
  }
);

export const userPutData = createAsyncThunk(
  "user/put",
  async ({ userId, userInfo }, { rejectWithValue }) => {
    try {
      const response = await putUserInfo(userId, userInfo);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message || e.response.data);
    }
  }
);

export const emailValidate = createAsyncThunkWrapped(
  "user/email/validate",
  async ({ userId, token }, { dispatch }) => {
    await emailValidateApi(userId, { token });
    return await dispatch(getSelf());
  }
);

export const emailRequest = createAsyncThunkWrapped(
  "user/email/request",
  async ({ userId }, { dispatch }) => {
    await emailRequestApi(userId);
    dispatch(setLastEmailRequestAt(Date.now()));
  }
);
