import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { getConfig as getConfigRequest } from "@api";

export const getConfig = createAsyncThunk(
  "conf/get",
  async (_arg, thunkAPI) => {
    try {
      const response = await getConfigRequest();
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message || e.response.data);
    }
  }
);

const confSelector = (state) => state.conf;

export const isErrorSelector = createSelector(
  confSelector,
  ({ isError }) => isError
);

export const errorMessageSelector = createSelector(
  confSelector,
  ({ errorMessage }) => errorMessage
);

export const conf = createSlice({
  name: "conf",
  initialState: {
    maxFileSize: null,
    minEmailReq: null,
    maxEmailDuration: null,

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
    [getConfig.rejected]: (state, { payload }) => {
      state.isError = true;
      state.errorMessage = payload;
    },
  },
});

const reducer = conf.reducer;
export default reducer;
