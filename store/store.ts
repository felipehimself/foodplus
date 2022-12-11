import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../features/cartSlice';
import showCartSlice from '../features/showCartSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    cart: cartSlice,
    showCart: showCartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
