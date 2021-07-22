import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { getConfig as getConfigRequest } from "@api";
import { parseDataSize } from "@utils";

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

export const isErrorOnParseSelector = createSelector(
  getConfigSelector,
  ({ errorOnParse }) => errorOnParse
);

export const maxFileSizeSelector = createSelector(
  getConfigSelector,
  ({ maxFileSize }) => maxFileSize
);

export const minEmailReqSelector = createSelector(
  getConfigSelector,
  ({ minEmailReq }) => minEmailReq
);

export const conf = createSlice({
  name: "conf",
  initialState: {
    maxFileSize: null,
    minEmailReq: null,
    maxEmailDuration: null,

    errorOnParse: false,
  },
  reducers: {},
  extraReducers: {
    [getConfig.fulfilled]: (state, { payload }) => {
      try {
        const { maxFileSize, minEmailReq, maxEmailDuration } = payload;
        state.maxFileSize = parseDataSize(maxFileSize);
        state.minEmailReq = minEmailReq;
        state.maxEmailDuration = maxEmailDuration;
        state.errorOnParse = false;
      } catch (e) {
        state.errorOnParse = true;
      }
    },
  },
});

const reducer = conf.reducer;
export default reducer;
