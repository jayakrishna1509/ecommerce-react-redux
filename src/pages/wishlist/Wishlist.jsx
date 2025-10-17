import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        loadWishlist();
    }, []);

    const loadWishlist = () => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlistItems(wishlist);
    };

    const removeFromWishlist = (productId) => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const updatedWishlist = wishlist.filter(item => item.id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        setWishlistItems(updatedWishlist);
        window.alert('Removed from Wishlist');
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gray-60 py-6 sm:py-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    {/* Header */}
                    <div className="mb-6 sm:mb-8">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">My Wishlist</h1>
                        <p className="text-gray-600">
                            {wishlistItems.length} {wishlistItems.length === 1 ? 'Product' : 'Products'} in Your Wishlist
                        </p>
                    </div>

                    {/* Wishlist Items */}
                        {wishlistItems.length === 0 ? (
                        <div className="text-center py-16">
                            <svg
                                className="mx-auto h-24 w-24 text-gray-400 mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your Wishlist is Empty</h2>
                            <p className="text-gray-600 mb-6">Add Favourite Products in Wishlist!</p>
                            <Link
                                to="/allproducts"
                                className="inline-block btn-primary"
                            >
                                Browse Products
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {wishlistItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                                >
                                    {/* Product Image */}
                                    <div className="relative h-80 bg-white">
                                        <Link to={`/productInfo/${item.id}`}>
                                            <img
                                                src={item.productImageUrl}
                                                alt={item.title}
                                                className="w-full h-full object-contain p-6 hover:scale-105 transition-transform duration-300"
                                            />
                                        </Link>
                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeFromWishlist(item.id)}
                                            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md"
                                        >
                                            <svg
                                                className="w-5 h-5 text-red-500"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Product Details */}
                                    <div className="p-5 flex flex-col flex-grow">
                                        {/* Category Badge */}
                                        <div className="mb-2">
                                            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full uppercase">
                                                {item.category}
                                            </span>
                                        </div>

                                        {/* Product Title */}
                                        <Link to={`/productInfo/${item.id}`}>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                                                {item.title}
                                            </h3>
                                        </Link>

                                        {/* Product Description */}
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {item.description}
                                        </p>

                                        {/* Price and Rating */}
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-2xl font-bold text-gray-900">
                                                ₹{item.price}
                                            </span>
                                            {item.rating && (
                                                <div className="flex items-center">
                                                    <svg
                                                        className="w-5 h-5 text-yellow-400 fill-current"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                    </svg>
                                                    <span className="ml-1 text-sm font-medium text-gray-700">
                                                        {item.rating}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* View Details Button aligned to bottom */}
                                        <div className="mt-auto">
                                            <Link
                                                to={`/productInfo/${item.id}`}
                                                className="btn-primary btn-block text-center"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Wishlist;
