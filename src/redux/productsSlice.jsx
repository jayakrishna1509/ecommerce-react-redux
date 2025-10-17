import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [
        {
            id: 'id1',
            title: 'Allen Solly Casual Shirt',
            price: '1299',
            category: 'fashion',
            description: 'Premium Quality Casual Shirt Perfect for Everyday Wear.',
            rating: 4.5,
            productImageUrl: '/assets/products/Allen-Soly-Causual-Shirt.jpg'
        },
        {
            id: 'id2',
            title: 'Divisive Traditional Kurta',
            price: '1899',
            category: 'fashion',
            description: 'Elegant Traditional Kurta with Modern Design and Casual Gatherings.',
            rating: 4.3,
            productImageUrl: '/assets/products/Divisive-Kurta.jpg'
        },
        {
            id: 'id3',
            title: 'Glowic Mens Premium Hoodie',
            price: '2499',
            category: 'fashion',
            description: 'Comfortable and Stylish Hoodie with Premium Quality Fabric.',
            rating: 4.6,
            productImageUrl: '/assets/products/Glowic-Mens-Hoodie.jpg'
        },
        {
            id: 'id4',
            title: 'Jack & Jones Winter Jacket',
            price: '3999',
            category: 'fashion',
            description: 'Trendy Winter Jacket with Excellent Insulation.',
            rating: 4.7,
            productImageUrl: '/assets/products/Jack-Jones-Jacket.jpg'
        },
        {
            id: 'id5',
            title: 'Motorola Edge 60 5G',
            price: '24999',
            category: 'electronics',
            description: 'Powerful 5G Smartphone with Stunning Display and Advanced Camera System.',
            rating: 4.4,
            productImageUrl: '/assets/products/Moto-Edge60.jpg'
        },
        {
            id: 'id6',
            title: 'OnePlus 13s 5G',
            price: '54999',
            category: 'electronics',
            description: 'Flagship Smartphone with Cutting-Edge Technology.',
            rating: 4.8,
            productImageUrl: '/assets/products/Oneplus-13.jpg'
        },
        {
            id: 'id7',
            title: 'Samsung Galaxy A55 5G',
            price: '32999',
            category: 'electronics',
            description: 'Feature-Rich Smartphone with vibrant AMOLED display.',
            rating: 4.5,
            productImageUrl: '/assets/products/Samsung-A55.jpg'
        },
        {
            id: 'id8',
            title: 'Vivo V60 5G',
            price: '29999',
            category: 'electronics',
            description: 'Sleek design with Powerful Camera Capabilities.',
            rating: 4.2,
            productImageUrl: '/assets/products/Vivo-V60.jpg'
        }
    ],
    filters: {
        search: '',
        category: 'all',
        minPrice: 0,
        maxPrice: 1000000,
        minRating: 0
    }
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSearch(state, action) {
            state.filters.search = action.payload;
        },
        setCategory(state, action) {
            state.filters.category = action.payload;
        },
        setPriceRange(state, action) {
            const { minPrice, maxPrice } = action.payload;
            state.filters.minPrice = minPrice;
            state.filters.maxPrice = maxPrice;
        },
        setMinRating(state, action) {
            state.filters.minRating = action.payload;
        }
    }
});

export const { setSearch, setCategory, setPriceRange, setMinRating } = productsSlice.actions;

export default productsSlice.reducer;


