import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { signupPost } from '../../Api';

export const userCreate = createAsyncThunk(
    'user/create',
    async ({ email, password }, thunkAPI) => {
        const response = await signupPost(email, password);
        return response;
    }
)


export const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();

export const users = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(userCreate.fulfilled, (state, { payload }) => {
            const { id, ...changes } = payload;
            usersAdapter.upsertOne(state, { id, changes });
        });
    }
});

const reducer = users.reducer;
export default reducer;