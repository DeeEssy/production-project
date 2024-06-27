import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrollSaverSchema } from '../types/scrollSaver';

const initialState: ScrollSaverSchema = {
  scroll: {},
};

export const ScrollSaverSlice = createSlice({
  name: 'scrollSaver',
  initialState,
  reducers: {
    setScrollPosition: (state, { payload }: PayloadAction<{ path: string; position: number }>) => {
      state.scroll[payload.path] = payload.position;
    },
  },
});

export const { actions: ScrollSaverActions } = ScrollSaverSlice;
export const { reducer: ScrollSaverReducer } = ScrollSaverSlice;
