import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { signupPost, postResume } from "@api";
import { userIdSelector } from "./auth/selectors";
import { isAnyOf } from "@utils/reduxUtils";

export const userCreate = createAsyncThunk(
  "user/create",
  async ({ email, password }, thunkAPI) => {
    const response = await signupPost(email, password);
    return response;
  }
);

export const userUploadResume = createAsyncThunk(
  "user/cv/upload",
  async ({ file }, thunkAPI) => {
    const userId = userIdSelector(thunkAPI.getState());
    const response = await postResume(file, userId);
    return response.data;
  }
);

export const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();

export const users = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(isAnyOf(userCreate.fulfilled, userUploadResume.fulfilled), (state, { payload }) => {
      const { id, ...changes } = payload;
      usersAdapter.upsertOne(state, { id, changes });
    });
  },
});

const reducer = users.reducer;
export default reducer;
