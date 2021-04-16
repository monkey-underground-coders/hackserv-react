import { createAsyncThunk } from "@reduxjs/toolkit";

import { signupPost, postResume, getSelfUser } from "@api";
import { deleteResume } from "../../api/user";

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
