import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  signupPost,
  postResume,
  deleteResume,
  getSelfUser,
  getResume,
  putUserInfo,
} from "@api";

export const userCreate = createAsyncThunk(
  "users/create",
  async ({ emailVal, passwordVal }, { rejectWithValue }) => {
    try {
      const response = await signupPost(emailVal, passwordVal);
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
  "user",
  async ({ userId, userInfo }) => {
    const response = await putUserInfo(userId, userInfo);
    return response.data;
  }
);

// export const getUser = createAsyncThunk(
//   "users/getUser",
//   async ({ userId }, { rejectWithValue }) => {
//     try {
//       const response = await getSelfUser(); // TODO: real call
//       return response.data;
//     } catch (e) {
//       return rejectWithValue(e.message || e.response.data);
//     }
//   }
// );
