// tba
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createCriteria,
  putCriteria as putCriteriaApi,
  deleteCriteria as deleteCriteriaApi,
} from "@api/voteCriteria";
import { voteCriteria } from "@redux/schemas";
import { normalizeToolkit } from "@utils/parse";

export const createNewCriteria = createAsyncThunk(
  "voteCriteria/create",
  async ({ trackId, name, maxValue }, { rejectWithValue }) => {
    try {
      const response = await createCriteria({ trackId, name, maxValue });
      return normalizeToolkit(response.data, voteCriteria);
    } catch (e) {
      return rejectWithValue(e.message || e.response.data);
    }
  }
);

export const putCriteria = createAsyncThunk(
  "voteCriteria/put",
  async ({ id, name, description, maxValue }, { rejectWithValue }) => {
    try {
      const response = await putCriteriaApi(id, {
        name,
        maxValue,
        description,
      });
      return normalizeToolkit(response.data, voteCriteria);
    } catch (e) {
      return rejectWithValue(e.message || e.response.data);
    }
  }
);

export const deleteCriteria = createAsyncThunk(
  "voteCriteria/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      await deleteCriteriaApi(id);
      return { id };
    } catch (e) {
      return rejectWithValue(e.message || e.response.data);
    }
  }
);
