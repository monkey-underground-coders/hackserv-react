import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getConfig as getConfigRequest } from "@api";

export const getConfig = createAsyncThunk("conf/get", async () => {
  const response = await getConfigRequest();
  return response.data;
});

export const conf = createSlice({
  name: "conf",
  initialState: {},
  reducers: {},
  extraReducers: {
    [getConfig.fulfilled]: (state, { payload }) => {
      const { maxFileSize, minEmailReq, maxEmailDuration } = payload;

      return {
        maxFileSize,
        minEmailReq,
        maxEmailDuration,
      };
    },
  },
});

const reducer = conf.reducer;
export default reducer;
