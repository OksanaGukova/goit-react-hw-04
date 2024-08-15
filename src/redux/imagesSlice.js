import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchImages } from "../apiService/apiServise";

export const fetchImagesAsync = createAsyncThunk(
  "images/fetchImages",
  async ({ query, page }) => {
    const response = await fetchImages(query, page);
    return response;
  }
);

const imagesSlice = createSlice({
  name: "images",
  initialState: {
    images: [],
    query: "",
    page: 1,
    totalPages: 0,
    isLoading: false,
    error: null,
    selectedImage: null,
    noResults: false,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
      state.page = 1;
      state.images = [];
    },
    loadMoreImages: (state) => {
      state.page += 1;
    },
    clearSelectedImage: (state) => {
      state.selectedImage = null;
    },
    setSelectedImage: (state, action) => {
      state.selectedImage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImagesAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.noResults = false;
      })
      .addCase(fetchImagesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalPages = action.payload.total_pages;
        state.images =
          state.page === 1
            ? action.payload.results
            : [...state.images, ...action.payload.results];
        if (action.payload.results.length === 0) {
          state.noResults = true;
        }
      })
      .addCase(fetchImagesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setQuery,
  loadMoreImages,
  clearSelectedImage,
  setSelectedImage,
} = imagesSlice.actions;
export default imagesSlice.reducer;