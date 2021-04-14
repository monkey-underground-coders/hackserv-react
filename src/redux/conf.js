import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getConfig as getConfigRequest } from "@api";

export const getConfig = createAsyncThunk(
  "conf/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getConfigRequest();
      return response.data;
    } catch (e) {
      return rejectWithValue(e.message || e.response.data);
    }
  }
);

export const getConfigSelector = (state) => state.conf;

export const conf = createSlice({
  name: "conf",
  initialState: {
    maxFileSize: null,
    minEmailReq: null,
    maxEmailDuration: null,
  },
  reducers: {},
  extraReducers: {
    [getConfig.fulfilled]: (state, { payload }) => {
      const { maxFileSize, minEmailReq, maxEmailDuration } = payload;
      state.isError = false;
      state.container = {
        maxFileSize,
        minEmailReq,
        maxEmailDuration,
      };
    },
    [getConfig.rejected]: (state, { payload }) => {
      state.isError = true;
      state.errorMessage = payload;
    },
  },
});

const reducer = conf.reducer;
export default reducer;
