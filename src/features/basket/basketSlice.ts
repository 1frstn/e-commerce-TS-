import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StateType, ProductType } from '../../types';

const initialState: StateType = {
  products: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<ProductType>) => {
      const newItem = action.payload;
      const existingItem = state.products.find(
        (product) => product.id === newItem.id
      );

      if (existingItem) {
        if (existingItem.amount !== undefined) {
          existingItem.amount += 1;
        } else {
          existingItem.amount = 1;
        }
      } else {
        state.products.push({ ...newItem, amount: 1 });
      }
    },

    removeFromBasket: (state, action: PayloadAction<ProductType>) => {
      const product = action.payload;
      state.products = state.products.filter((item) => item.id !== product.id);
    },

    clearBasket: (state) => {
      state.products = [];
    },

    incrementItem:(state,action:PayloadAction<number>) => {
      const productId = action.payload;
      const updated = state.products.find((i) => i.id === productId) 

      if(updated && updated.amount !== undefined){
        updated.amount += 1
      }
    },
    decrementItem:(state,action:PayloadAction<number>) => {
      const productId = action.payload;
      const updated = state.products.find((i) => i.id === productId) 

      if(updated && updated.amount !== undefined){
        updated.amount -= 1
      }
    },
  },
});

export const { addToBasket, removeFromBasket, clearBasket, incrementItem, decrementItem } =
  basketSlice.actions;
export default basketSlice.reducer;
