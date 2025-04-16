import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      
      if (existingItem) {
        // If item already exists in cart, increase quantity
        existingItem.quantity += 1;
      } else {
        // If item doesn't exist, add it to cart with quantity 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      // Filter out the item with matching name
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      
      if (itemToUpdate) {
        // Update quantity, ensuring it doesn't go below 1
        itemToUpdate.quantity = Math.max(1, amount);
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
