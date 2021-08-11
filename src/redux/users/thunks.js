import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  signupPost,
  postResume,
  deleteResume,
  getSelfUser,
  putUserInfo,
  emailValidate as emailValidateApi,
  emailRequest as emailRequestApi,
  emailValidateById as emailValidateByIdApi,
  userFilledForm,
} from "@api";
import { createAsyncThunkWrapped } from "@utils";
import { setLastEmailRequestAt } from "./slices";
import { login } from "@redux/auth";
import { setTokens } from "@redux/auth/actions";
import { normalize } from 'normalizr';
import { user } from "@validation/normalizr";

export const userCreate = createAsyncThunk(
  "users/create",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const response = await signupPost(email, password);
      await dispatch(login({ email, password }));
      return normalize(response.data, user);
    } catch (e) {
      return rejectWithValue(e.response.data || e.message);
    }
  }
);

export const userUploadResume = createAsyncThunk(
  "user/cv/upload",
  async ({ file, userId }) => {
    const response = await postResume(file, userId);
    return normalize(response.data, user);
  }
);

export const userDeleteResume = createAsyncThunk(
  "user/cv/delete",
  async ({ userId }) => {
    const response = await deleteResume(userId);
    return normalize(response.data, user);
  }
);

export const getSelf = createAsyncThunk(
  "users/getSelf",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSelfUser();
      return normalize(response.data, user);
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
      return normalize(response.data, user);
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

export const emailValidateById = createAsyncThunkWrapped(
  "user/email/validateById",
  async ({ userId, id }, { dispatch }) => {
    const response = await emailValidateByIdApi(userId, { id });
    dispatch(setTokens(response.data));
    await dispatch(getSelf());
  }
);

export const setUserFilledForm = createAsyncThunkWrapped(
  "user/filled_form",
  async ({ userId }) => {
    const response = await userFilledForm(userId);
    return normalize(response.data, user);
  }
);
