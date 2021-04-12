import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getConfig as getConfigRequest } from "@api";

export const getConfig = createAsyncThunk("conf/get", async () => {
  const response = await getConfigRequest();
  return response.data;
});

export const conf = createSlice({
  name: "conf",
  initialState: {
    container: {},
    isError: false,
    errorMessage: null,
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
    [getConfig.rejected]: (state, { error }) => {
      state.isError = true;
      state.errorMessage = error;
    },
  },
});

const reducer = conf.reducer;
export default reducer;
