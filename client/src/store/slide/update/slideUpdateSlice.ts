import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Slide, SlideState, ErrorResponse  } from '../../../Interfaces/slideInterface';
import { TYPE_SLIDE } from './types';

const initialState: SlideState = {
  data: null,
  isLoading: false,
  error: null
}

export const slideUpdateSlice = createSlice({
  name: TYPE_SLIDE,
  initialState,
  reducers: {
    request: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    reset: (state) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
    success: (state, action: PayloadAction<Slide>) => {
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

export default slideUpdateSlice.reducer;
