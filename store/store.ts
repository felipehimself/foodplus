import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../features/cartSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
