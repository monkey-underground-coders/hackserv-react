import { createAsyncThunk } from "@reduxjs/toolkit";
import fileDownload from "js-file-download";

import {
  signupPost,
  postResume,
  deleteResume,
  getSelfUser,
  getResume,
} from "@api";
import { usersSelector, getUserByIdSelector } from "./selectors";
import { generateResumeFilename } from "@utils";

export const userCreate = createAsyncThunk(
  "users/create",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await signupPost(email, password);
      return response;
    } catch (e) {
      return rejectWithValue(e.message || e.response.data);
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

export const userDownloadResume = createAsyncThunk(
  "users/cv/download",
  async ({ userId }, { getState, requestId, rejectWithValue }) => {
    try {
      const { currentRequestId, loading } = usersSelector(getState());
      if (loading !== true || requestId !== currentRequestId) {
        return;
      }
      const user = getUserByIdSelector(getState(), { userId });
      const file = await getResume(userId);
      console.log(file, user);
      fileDownload(file.data, generateResumeFilename(user));
      return "OK";
    } catch (e) {
      return rejectWithValue(e.message || e.response.data);
    }
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
