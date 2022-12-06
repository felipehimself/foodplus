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
        (prod) => prod.id == action.payload.id
      );

      if (isProdInCart) {
        const newState = state.order.map((prod)=> {
          if(prod.id == action.payload.id){
            return {...prod, qty: prod.qty + 1}
          }

          return prod
        })
        state.order = newState;

      } else {
        const newProd = { ...action.payload, qty: 1 };
        state.order.push(newProd);
      }
    },
  },
});

export default cartSlice.reducer;

export const { addToCart } = cartSlice.actions;
