import { configureStore } from '@reduxjs/toolkit';
import slideCreateReducer from './slide/create/slideCreateSlice';
import slidesReducer from './slide/list/slidesSlice';
import slideUpdateReducer from './slide/update/slideUpdateSlice';
import slideDeleteSlice from './slide/delete/slideDeleteSlice';

export const store = configureStore({
  reducer: {
    slideCreate: slideCreateReducer,
    slides: slidesReducer,
    slideUpdate: slideUpdateReducer,
    slideDelete: slideDeleteSlice 
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
