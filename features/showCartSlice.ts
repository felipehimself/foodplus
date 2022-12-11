import { createSlice } from '@reduxjs/toolkit';

const showCartSlice = createSlice({
  name: 'showCartSlice',
  initialState: { showCart: false },
  reducers: {
    toggleShowCart: (state, action) => {
      state.showCart = action.payload;
    },
  },
});

export default showCartSlice.reducer;

export const { toggleShowCart } = showCartSlice.actions;
