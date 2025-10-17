import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import myContext from '../../context/myContext';
import Loader from '../../components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../redux/cartSlice';
import toast from 'react-hot-toast';
import { ChevronDown } from 'lucide-react';

// Import product images
import allenSolyShirt from '../../assets/products/Allen-Soly-Causual-Shirt.jpg';
import divisiveKurta from '../../assets/products/Divisive-Kurta.jpg';
import glowicHoodie from '../../assets/products/Glowic-Mens-Hoodie.jpg';
import jackJonesJacket from '../../assets/products/Jack-Jones-Jacket.jpg';
import motoEdge60 from '../../assets/products/Moto-Edge60.jpg';
import oneplus13 from '../../assets/products/Oneplus-13.jpg';
import samsungA55 from '../../assets/products/Samsung-A55.jpg';
import vivoV60 from '../../assets/products/Vivo-V60.jpg';

const AllProducts = () => {
    const navigate = useNavigate();

    const context = useContext(myContext);
    const {loading,getAllProduct} = context;

    const cartItems = useSelector((state)=> state.cart);
    const dispatch = useDispatch();

    // Filter states - Load from sessionStorage for persistence
    const [selectedCategory, setSelectedCategory] = useState(() => {
        try {
            const saved = sessionStorage.getItem('filterCategory');
            return saved || 'all';
        } catch (error) {
            console.error('Error loading filter category:', error);
            return 'all';
        }
    });
    const [selectedPriceRanges, setSelectedPriceRanges] = useState(() => {
        try {
            const saved = sessionStorage.getItem('filterPriceRanges');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading price ranges:', error);
            return [];
        }
    });
    const [selectedRating, setSelectedRating] = useState(() => {
        try {
            const saved = sessionStorage.getItem('filterRating');
            return saved || '';
        } catch (error) {
            console.error('Error loading rating filter:', error);
            return '';
        }
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Static product data
    const bestSellingProducts = [
        {
            id: 'id1',
            title: 'Allen Solly Casual Shirt',
            price: '1299',
            category: 'fashion',
            description: 'Premium Quality Casual Shirt Perfect for Everyday Wear.',
            rating: 4.5,
            productImageUrl: allenSolyShirt
        },
        {
            id: 'id2',
            title: 'Divisive Traditional Kurta',
            price: '1899',
            category: 'fashion',
            description: 'Elegant Traditional Kurta with Modern Design and Casual Gatherings.',
            rating: 4.3,
            productImageUrl: divisiveKurta
        },
        {
            id: 'id3',
            title: 'Glowic Mens Premium Hoodie',
            price: '2499',
            category: 'fashion',
            description: 'Comfortable and Stylish Hoodie with Premium Quality Fabric.',
            rating: 4.6,
            productImageUrl: glowicHoodie
        },
        {
            id: 'id4',
            title: 'Jack & Jones Winter Jacket',
            price: '3999',
            category: 'fashion',
            description: 'Trendy Winter Jacket with Excellent Insulation.',
            rating: 4.7,
            productImageUrl: jackJonesJacket
        },
        {
            id: 'id5',
            title: 'Motorola Edge 60 5G',
            price: '24999',
            category: 'electronics',
            description: 'Powerful 5G Smartphone with Stunning Display and Advanced Camera System.',
            rating: 4.4,
            productImageUrl: motoEdge60
        },
        {
            id: 'id6',
            title: 'OnePlus 13s 5G',
            price: '54999',
            category: 'electronics',
            description: 'Flagship Smartphone with Cutting-Edge Technology.',
            rating: 4.8,
            productImageUrl: oneplus13
        },
        {
            id: 'id7',
            title: 'Samsung Galaxy A55 5G',
            price: '32999',
            category: 'electronics',
            description: 'Feature-Rich Smartphone with vibrant AMOLED display.',
            rating: 4.5,
            productImageUrl: samsungA55
        },
        {
            id: 'id8',
            title: 'Vivo V60 5G',
            price: '29999',
            category: 'electronics',
            description: 'Sleek design with Powerful Camera Capabilities.',
            rating: 4.2,
            productImageUrl: vivoV60
        }
    ];

    // Filter logic - Memoized for performance
    const uniqueProducts = React.useMemo(() => {
        let filtered = [...bestSellingProducts];

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        // Filter by price ranges
        if (selectedPriceRanges.length > 0) {
            filtered = filtered.filter(product => {
                const price = parseInt(product.price);
                return selectedPriceRanges.some(range => {
                    if (range === 'under1000') return price < 1000;
                    if (range === '1000-5000') return price >= 1000 && price <= 5000;
                    if (range === '5000-25000') return price > 5000 && price <= 25000;
                    if (range === 'above25000') return price > 25000;
                    return false;
                });
            });
        }

        // Filter by rating
        if (selectedRating) {
            const minRating = parseFloat(selectedRating);
            filtered = filtered.filter(product => product.rating >= minRating);
        }

        return filtered;
    }, [selectedCategory, selectedPriceRanges, selectedRating]);
    
    // To include Firebase products without duplicates, use this instead:
    // const allProducts = [...bestSellingProducts, ...getAllProduct];
    // const uniqueProducts = allProducts.filter((product, index, self) =>
    //     index === self.findIndex((p) => p.id === product.id)
    // );

    const addCart = (item) =>{
        dispatch(addToCart(item));
        toast.success("Added to Cart")
    }

    const deleteCart = (item) =>{
        dispatch(deleteFromCart(item));
        toast.success("Delete Cart")
    }

    // Reset filters
    const resetFilters = () => {
        setSelectedCategory('all');
        setSelectedPriceRanges([]);
        setSelectedRating('');
        // Clear from sessionStorage
        try {
            sessionStorage.removeItem('filterCategory');
            sessionStorage.removeItem('filterPriceRanges');
            sessionStorage.removeItem('filterRating');
        } catch (error) {
            console.error('Error clearing filters from sessionStorage:', error);
        }
        toast.success('Filters Reset');
    };

    // Handle price checkbox change
    const handlePriceChange = (range) => {
        setSelectedPriceRanges(prev => 
            prev.includes(range) 
                ? prev.filter(r => r !== range)
                : [...prev, range]
        );
    };

    // Save cart to localStorage with error handling
    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
            // Handle quota exceeded error
            if (error.name === 'QuotaExceededError') {
                toast.error('Storage limit reached. Please clear some data.');
            }
        }
    }, [cartItems]);

    // Save filters to sessionStorage
    useEffect(() => {
        try {
            sessionStorage.setItem('filterCategory', selectedCategory);
        } catch (error) {
            console.error('Error saving category filter:', error);
        }
    }, [selectedCategory]);

    useEffect(() => {
        try {
            sessionStorage.setItem('filterPriceRanges', JSON.stringify(selectedPriceRanges));
        } catch (error) {
            console.error('Error saving price ranges:', error);
        }
    }, [selectedPriceRanges]);

    useEffect(() => {
        try {
            sessionStorage.setItem('filterRating', selectedRating);
        } catch (error) {
            console.error('Error saving rating filter:', error);
        }
    }, [selectedRating]);
    return (
        <Layout>
    <div className="py-6 sm:py-8">
            {/* Heading  */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
                <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-2">All Products</h1>
                <p className="text-center text-gray-600 text-sm">Browse Our Complete Collection</p>
            </div>

            {/* Filter Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-md border border-blue-100 p-5">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filter Products
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        
                        {/* Filter by Categories - Dropdown */}
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                            <label className="block text-xs font-bold text-gray-800 mb-2 flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                Categories
                            </label>
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-3 py-2 text-left flex items-center justify-between hover:border-blue-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                                >
                                    <span className="text-gray-700 capitalize">
                                        {selectedCategory === 'all' ? 'All Categories' : selectedCategory}
                                    </span>
                                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                                        <div
                                            onClick={() => { setSelectedCategory('all'); setIsDropdownOpen(false); }}
                                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700"
                                        >
                                            All Categories
                                        </div>
                                        <div
                                            onClick={() => { setSelectedCategory('fashion'); setIsDropdownOpen(false); }}
                                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700 capitalize"
                                        >
                                            Fashion
                                        </div>
                                        <div
                                            onClick={() => { setSelectedCategory('electronics'); setIsDropdownOpen(false); }}
                                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700 capitalize"
                                        >
                                            Electronics
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Filter by Price - Checkboxes */}
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                            <label className="block text-xs font-bold text-gray-800 mb-2 flex items-center gap-1.5">
                                <span className="text-blue-600 font-bold text-sm">₹</span>
                                Price Range
                            </label>
                            <div className="space-y-1.5">
                                <label className="flex items-center cursor-pointer hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={selectedPriceRanges.includes('under1000')}
                                        onChange={() => handlePriceChange('under1000')}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-xs text-gray-700 font-medium">Under ₹1,000</span>
                                </label>
                                <label className="flex items-center cursor-pointer hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={selectedPriceRanges.includes('1000-5000')}
                                        onChange={() => handlePriceChange('1000-5000')}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-xs text-gray-700 font-medium">₹1,000 - ₹5,000</span>
                                </label>
                                <label className="flex items-center cursor-pointer hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={selectedPriceRanges.includes('5000-25000')}
                                        onChange={() => handlePriceChange('5000-25000')}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-xs text-gray-700 font-medium">₹5,000 - ₹25,000</span>
                                </label>
                                <label className="flex items-center cursor-pointer hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={selectedPriceRanges.includes('above25000')}
                                        onChange={() => handlePriceChange('above25000')}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-xs text-gray-700 font-medium">Above ₹25,000</span>
                                </label>
                            </div>
                        </div>

                        {/* Filter by Ratings - Radio Buttons */}
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                            <label className="block text-xs font-bold text-gray-800 mb-2 flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                Ratings
                            </label>
                            <div className="space-y-1.5">
                                <label className="flex items-center cursor-pointer hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
                                    <input
                                        type="radio"
                                        name="rating"
                                        value="4.5"
                                        checked={selectedRating === '4.5'}
                                        onChange={(e) => setSelectedRating(e.target.value)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-xs text-gray-700 font-medium flex items-center">
                                        4.5 ⭐ & Above
                                    </span>
                                </label>
                                <label className="flex items-center cursor-pointer hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
                                    <input
                                        type="radio"
                                        name="rating"
                                        value="4.0"
                                        checked={selectedRating === '4.0'}
                                        onChange={(e) => setSelectedRating(e.target.value)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-xs text-gray-700 font-medium flex items-center">
                                        4.0 ⭐ & Above
                                    </span>
                                </label>
                                <label className="flex items-center cursor-pointer hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
                                    <input
                                        type="radio"
                                        name="rating"
                                        value="3.5"
                                        checked={selectedRating === '3.5'}
                                        onChange={(e) => setSelectedRating(e.target.value)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-xs text-gray-700 font-medium flex items-center">
                                        3.5 ⭐ & Above
                                    </span>
                                </label>
                                <label className="flex items-center cursor-pointer hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
                                    <input
                                        type="radio"
                                        name="rating"
                                        value=""
                                        checked={selectedRating === ''}
                                        onChange={(e) => setSelectedRating(e.target.value)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-xs text-gray-700 font-medium">All Ratings</span>
                                </label>
                            </div>
                        </div>

                    </div>
                    
                    {/* Reset Filters Button - Full Width */}
                    <div className="mt-4">
                        <button
                            onClick={resetFilters}
                            className="w-full text-white font-semibold py-2.5 px-4 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                            style={{backgroundColor: '#1d4ed8'}}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Reset Filters
                        </button>
                    </div>

                    {/* Active Filters Display */}
                    <div className="mt-4 pt-4 border-t-2 border-blue-200">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-bold text-gray-800">Active Filters:</span>
                            {selectedCategory !== 'all' && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    Category: {selectedCategory}
                                </span>
                            )}
                            {selectedPriceRanges.map(range => (
                                <span key={range} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Price: {range === 'under1000' ? 'Under ₹1K' : range === '1000-5000' ? '₹1K-₹5K' : range === '5000-25000' ? '₹5K-₹25K' : 'Above ₹25K'}
                                </span>
                            ))}
                            {selectedRating && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    Rating: {selectedRating}⭐ & Above
                                </span>
                            )}
                            {selectedCategory === 'all' && selectedPriceRanges.length === 0 && !selectedRating && (
                                <span className="text-sm text-black-500">No Filters Applied</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* main  */}
            <section className="text-gray-600 body-font">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className='flex justify-center'>
                        {loading && <Loader/>}
                    </div>
                    {uniqueProducts.length === 0 && !loading ? (
                        <div className="text-center py-16">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Found</h3>
                            <p className="text-gray-500 mb-4">Adjusting Your Filters to See More Products</p>
                            <button
                                onClick={resetFilters}
                                className="text-white font-semibold py-2 px-6 rounded-lg"
                                style={{backgroundColor: '#1d4ed8'}}
                            >
                                Clear All Filters
                            </button>
                        </div>
                    ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pb-8">
                        {uniqueProducts.map((item, index) => {
                            const { id, title, price, productImageUrl, description, rating } = item
                            return (
                                <div key={id}>
                                    <div className="h-full border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-lg bg-white flex flex-col">
                                        {/* Image Container */}
                                        <div className="relative bg-white h-64 flex items-center justify-center">
                                            <img
                                                onClick={()=> navigate(`/productInfo/${id}`)}
                                                className="max-w-full max-h-full object-contain cursor-pointer p-4"
                                                src={productImageUrl}
                                                alt={title}
                                            />
                                        </div>
                                        
                                        {/* Content Container */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            <div className="flex-grow">
                                                <h2 className="tracking-wider text-xs title-font font-semibold theme-primary-text mb-2 uppercase">
                                                    E-Kart
                                                </h2>
                                                <h1 className="title-font text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                                                    {title}
                                                </h1>
                                                {description && (
                                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                        {description}
                                                    </p>
                                                )}
                                                <div className="flex items-center justify-between mb-4">
                                                    <h1 className="text-2xl font-bold text-gray-900">
                                                        ₹{price}
                                                    </h1>
                                                    {rating && (
                                                        <div className="flex items-center text-yellow-400">
                                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                                            </svg>
                                                            <span className="text-gray-600 text-sm ml-1">{rating}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Button Container */}
                                            <div className="mt-auto">
                                                {cartItems.some((p)=>p.id === item.id)
                                                ?
                                                <button
                                                    onClick={() => deleteCart(item)}
                                                    className="btn-danger btn-block">
                                                    Remove From Cart
                                                </button>
                                                :
                                                <button 
                                                    onClick={() => addCart(item)}
                                                    className="btn-primary btn-block">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    Add To Cart
                                                </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    )}
                </div>
            </section>
        </div>
        </Layout>
    );
}

export default AllProducts;
