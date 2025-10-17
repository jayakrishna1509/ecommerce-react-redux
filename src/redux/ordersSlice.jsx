import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';

const persistedOrders = JSON.parse(localStorage.getItem('orders')) || [];

const initialState = {
    orders: persistedOrders,
    loading: false,
    error: null
};

// Async thunk for placing an order to Firebase
export const placeOrderAsync = createAsyncThunk(
    'orders/placeOrderAsync',
    async (orderData, { rejectWithValue }) => {
        try {
            const orderRef = collection(fireDB, 'order');
            const timestamp = Timestamp.now();
            const dateString = new Date().toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
            });
            
            // Add to Firebase with Timestamp
            const docRef = await addDoc(orderRef, {
                ...orderData,
                time: timestamp,
                date: dateString
            });
            
            // Return serializable data only (no Timestamp)
            return { 
                id: docRef.id, 
                ...orderData,
                date: dateString,
                timestamp: timestamp.toMillis() // Convert to milliseconds (serializable)
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk for fetching user orders from Firebase
export const fetchOrdersAsync = createAsyncThunk(
    'orders/fetchOrdersAsync',
    async (userId, { rejectWithValue }) => {
        try {
            const ordersRef = collection(fireDB, 'order');
            const q = query(ordersRef, where('userid', '==', userId));
            const querySnapshot = await getDocs(q);
            const orders = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                // Convert Timestamp to milliseconds for serialization
                const orderData = {
                    id: doc.id,
                    ...data,
                    timestamp: data.time ? data.time.toMillis() : Date.now()
                };
                // Remove the non-serializable Timestamp object
                delete orderData.time;
                orders.push(orderData);
            });
            return orders;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        placeOrder(state, action) {
            const order = action.payload;
            state.orders.push(order);
            localStorage.setItem('orders', JSON.stringify(state.orders));
        },
        clearOrders(state) {
            state.orders = [];
            localStorage.setItem('orders', JSON.stringify(state.orders));
        }
    },
    extraReducers: (builder) => {
        builder
            // Place Order Async
            .addCase(placeOrderAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(placeOrderAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.push(action.payload);
                localStorage.setItem('orders', JSON.stringify(state.orders));
            })
            .addCase(placeOrderAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Orders Async
            .addCase(fetchOrdersAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                localStorage.setItem('orders', JSON.stringify(state.orders));
            })
            .addCase(fetchOrdersAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { placeOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;


