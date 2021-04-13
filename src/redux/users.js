import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  createSelector,
  isAnyOf,
} from "@reduxjs/toolkit";
import { signupPost, getSelfUser } from "@api/auth";

export const userCreate = createAsyncThunk(
  "users/create",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await signupPost(email, password);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message || e.response.data);
    }
  }
);

export const getSelf = createAsyncThunk(
  "users/getSelf",
  async (_arg, thunkAPI) => {
    try {
      const response = await getSelfUser();
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message || e.response.data);
    }
  }
);

const usersSelector = (state) => state.users;

export const isErrorSelector = createSelector(
  usersSelector,
  ({ isError }) => isError
);

export const errorMessageSelector = createSelector(
  usersSelector,
  ({ errorMessage }) => errorMessage
);

export const usersAdapter = createEntityAdapter();

export const users = createSlice({
  name: "users",
  initialState: {
    ...usersAdapter.getInitialState(),
    isError: false,
    errorMessage: undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(userCreate.fulfilled, getSelf.fulfilled),
      (state, { payload }) => {
        const { id, ...changes } = payload;
        usersAdapter.upsertOne(state, { id, ...changes });
        state.isError = false;
      }
    );
    builder.addMatcher(
      isAnyOf(userCreate.rejected, getSelf.rejected),
      (state, { payload }) => {
        state.isError = true;
        state.errorMessage = payload;
      }
    );
  },
});

const reducer = users.reducer;
export default reducer;
