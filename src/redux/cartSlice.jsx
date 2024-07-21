import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart( state, action ){
      state.push(action.payload)
    },
    deleteFromCart(state,action){
      return state.filter(item => item.id !== action.payload.id)
    },
    incrementQuantity(state,action){
      state = state.map( item => {
        if (item.id === action.payload.id){
          item.quantity++;
        }
        return item;
      })
    },
    decrementQuantity(state,action){
      state = state.map( item => {
        if(item.id === action.payload.id){
          if(item.quantity > 1){
            item.quantity --;
          }
          if(item.quantity === 1){
            return state.filter(item => item.id !== action.payload.id)
          }
        }
        return item;
      })
    }
  }
});

export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity} = cartSlice.actions;
export default cartSlice.reducer;