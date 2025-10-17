import { createSlice } from "@reduxjs/toolkit";

// Safely load cart from localStorage with error handling
const loadCartFromStorage = () => {
    try {
        const cartData = localStorage.getItem('cart');
        if (!cartData) return [];
        
        const parsedCart = JSON.parse(cartData);
        // Validate that it's an array
        if (!Array.isArray(parsedCart)) {
            console.warn('Invalid cart data in localStorage, resetting to empty array');
            localStorage.removeItem('cart');
            return [];
        }
        return parsedCart;
    } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        // Clear corrupted data
        try {
            localStorage.removeItem('cart');
        } catch (e) {
            console.error('Error clearing corrupted cart data:', e);
        }
        return [];
    }
};

const initialState = loadCartFromStorage();
console.log('Cart items loaded:', initialState.length) 

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers : {
        addToCart(state,action){
            const item = {...action.payload, quantity: action.payload.quantity || 1};
            state.push(item);
        },
        deleteFromCart(state,action){
            return state.filter(item => item.id != action.payload.id)
        },
        incrementQuality(state,action){
            state = state.map(item =>{
                if(item.id == action.payload){
                    item.quantity++;
                }
                return item;
            })
        },
        decrementQuantity(state,action){
            const itemIndex = state.findIndex(item => item.id === action.payload);
            if (itemIndex !== -1) {
                if (state[itemIndex].quantity > 1) {
                    state[itemIndex].quantity--;
                } else {
                    // Remove item from cart if quantity becomes 0
                    return state.filter(item => item.id !== action.payload);
                }
            }
            return state;
        }
    }
})
export const { addToCart, deleteFromCart, incrementQuality, decrementQuantity }=cartSlice.actions

export default cartSlice.reducer