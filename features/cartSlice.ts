import { createSlice } from '@reduxjs/toolkit';
import { ICart } from '../types/Cart';

const initialState: ICart = {
  order: [],
  totalAmt: 0,
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      state.totalAmt = state.totalAmt + action.payload.price;

      const isProdInCart = state.order.find(
        (prod) => prod.productId == action.payload.productId
      );

      if (isProdInCart) {
        const newState = state.order.map((prod) => {
          if (prod.productId == action.payload.productId) {
            return { ...prod, qty: prod.qty + 1 };
          }

          return prod;
        });
        state.order = newState;
      } else {
        const newProd = { ...action.payload, qty: 1 };
        state.order.push(newProd);
      }
    },

    removeFromCart: (state, action) => {
      const product = state.order.find((prod) => prod.productId === action.payload.productId);
      state.totalAmt = state.totalAmt - product?.price!

      if (product?.qty == 1) {
        const newState = state.order.filter(
          (prod) => prod.productId !== action.payload.productId
        );
        state.order = newState;
      } else {
        const newState = state.order.map((prod) => {
          if (prod.productId === action.payload.productId) {
            return { ...prod, qty: prod.qty - 1 };
          }
          return prod;
        });
        state.order = newState;
      }
    },

    cleanCart:(state) => {
      state.order = []
    }
  },
});

export default cartSlice.reducer;

export const { addToCart, removeFromCart, cleanCart } = cartSlice.actions;