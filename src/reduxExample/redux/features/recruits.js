import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import RecruitApi from "../../../api/recruit";

const initialState = {
  data: [],
  loading: "pending",
  error: null,
};

export const fetchRecruits = createAsyncThunk(
  "recruits/fetchRecruits",
  async (payload, { getState }) => {
    const { loading } = getState().recruits;

    if (loading !== "pending") return;

    const recruits = await RecruitApi.get();
    return recruits;
  }
);

export const addRecruit = createAsyncThunk(
  "recruits/addRecruit",
  async (payload) => {
    const created = await RecruitApi.post(payload);
    return created;
  }
);

export const updateRecruit = createAsyncThunk(
  "recruits/updateRecruit",
  async ({ id, data }) => {
    const updated = await RecruitApi.patch(id, data);

    return { id, recruit: updated };
  }
);

export const deleteRecruit = createAsyncThunk(
  "recruits/deleteRecruit",
  async (payload) => {
    await RecruitApi.delete(payload);

    return payload;
  }
);

export const recruitsSlice = createSlice({
  name: "recruits",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecruits.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
        }
      })
      .addCase(fetchRecruits.fulfilled, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "idle";

          state.data = action.payload;
        }
      })
      .addCase(fetchRecruits.rejected, (state, action) => {
        if (state.loading === "pending") {
          state.loading = "idle";

          state.error = action.error;
        }
      })
      .addCase(addRecruit.pending, (state, action) => {})
      .addCase(addRecruit.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(addRecruit.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(updateRecruit.pending, (state, action) => {})
      .addCase(updateRecruit.fulfilled, (state, action) => {
        const { id, recruit } = action.payload;

        const updatedIndex = state.data.findIndex(
          (recruit) => recruit.id === id
        );
        state.data[updatedIndex] = recruit;
      })
      .addCase(updateRecruit.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(deleteRecruit.pending, (state, action) => {})
      .addCase(deleteRecruit.fulfilled, (state, action) => {
        const deletedIndex = state.data.findIndex(
          (recruit) => recruit.id === action.payload
        );

        state.data.splice(deletedIndex, 1);
      })
      .addCase(deleteRecruit.rejected, (state, action) => {});
  },
});

export const { reset } = recruitsSlice.actions;

export default recruitsSlice.reducer;
