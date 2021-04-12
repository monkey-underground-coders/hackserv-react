import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import { signupPost, getSelfUser } from "@api/auth";

export const userCreate = createAsyncThunk(
  "users/create",
  async ({ email, password }, thunkAPI) => {
    const response = await signupPost(email, password);
    return response;
  }
);

export const getSelf = createAsyncThunk(
  "users/getSelf",
  async (p, thunkAPI) => {
    try {
      const response = await getSelfUser();
      console.log("ping");
      return response.data;
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const usersAdapter = createEntityAdapter();

export const users = createSlice({
  name: "users",
  initialState: {
    container: usersAdapter.getInitialState(),
    isError: false,
    errorMessage: undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(userCreate.fulfilled, getSelf.fulfilled),
      (state, { payload }) => {
        console.log("pong");
        const { id, ...changes } = payload;
        usersAdapter.upsertOne(state.container, { id, ...changes });
        state.isError = false;
      }
    );
    builder.addMatcher(
      isAnyOf(userCreate.rejected, getSelf.rejected),
      (state, { payload }) => {
        console.log("error!");
        state.isError = true;
        state.errorMessage = payload.message;
      }
    );
  },
});

const reducer = users.reducer;
export default reducer;
