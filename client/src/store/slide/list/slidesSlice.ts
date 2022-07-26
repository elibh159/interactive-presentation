import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Slide, SlideListState, ErrorResponse  } from '../../../Interfaces/slideInterface';
import { TYPE_SLIDES } from './types';
import { defaultSlides } from '../../../constants';

const initialState: SlideListState = {
  data: [],
  isLoading: false,
  error: null
}

export const slidesSlice = createSlice({
  name: TYPE_SLIDES,
  initialState,
  reducers: {
    request: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    reset: (state) => {
      state.data = [];
      state.isLoading = false;
      state.error = null;
    },
    success: (state, action: PayloadAction<Slide[]>) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    error: (state, action: PayloadAction<ErrorResponse>) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  },
})

export default slidesSlice.reducer;
