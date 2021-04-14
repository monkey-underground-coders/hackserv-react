import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import { signupPost, getSelfUser } from "@api/auth";

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

// const usersSelector = (state) => state.users;

export const usersAdapter = createEntityAdapter();

export const users = createSlice({
  name: "users",
  initialState: {
    ...usersAdapter.getInitialState(),
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(userCreate.fulfilled, getSelf.fulfilled),
      (state, { payload }) => {
        const { id, ...changes } = payload;
        usersAdapter.upsertOne(state, { id, ...changes });
      }
    );
  },
});

const reducer = users.reducer;
export default reducer;
