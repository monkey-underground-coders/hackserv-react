// tba
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createCriteria,
  putCriteria as putCriteriaApi,
  deleteCriteria as deleteCriteriaApi,
} from "@api/voteCriteria";
import { voteCriteria } from "@redux/schemas";
import { normalizeToolkitDecode } from "@utils/parse";

export const createNewCriteria = createAsyncThunk(
  "voteCriteria/create",
  // @ts-ignore
  async ({ trackId, name, maxValue }, { rejectWithValue }) => {
    try {
      const response = await createCriteria({ trackId, name, maxValue });
      return normalizeToolkitDecode(response.data, voteCriteria);
    } catch (e) {
      return rejectWithValue(e.message || e.response.data);
    }
  }
);

export const putCriteria = createAsyncThunk(
  "voteCriteria/put",
  // @ts-ignore
  async ({ id, name, description, maxValue }, { rejectWithValue }) => {
    try {
      const response = await putCriteriaApi(id, {
        name,
        maxValue,
        description,
      });
      return normalizeToolkitDecode(response.data, voteCriteria);
    } catch (e) {
      return rejectWithValue(e.message || e.response.data);
    }
  }
);

export const deleteCriteria = createAsyncThunk(
  "voteCriteria/delete",
  // @ts-ignore
  async ({ id }, { rejectWithValue }) => {
    try {
      await deleteCriteriaApi(id);
      return { id };
    } catch (e) {
      return rejectWithValue(e.message || e.response.data);
    }
  }
);
