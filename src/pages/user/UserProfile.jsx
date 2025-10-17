import React, { useContext } from 'react'
import Layout from "../../components/layout/Layout";
import myContext from '../../context/myContext';
import Loader from '../../components/loader/Loader';
import { User, Mail, Calendar, Package, Clock, CheckCircle } from 'lucide-react';

const UserProfile = () => {

    const user = JSON.parse(localStorage.getItem("users"));

    const context = useContext(myContext);
    const {loading,getAllOrder}=context

    return (
        <Layout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                {/* Profile Header */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
                    <p className="text-gray-600">Manage Your Account and View Your Orders</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 mb-8">
                    <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                                <User className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        
                        {/* User Info */}
                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            {/* Name - Left */}
                            <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                            
                            {/* Email - Middle */}
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-blue-600" />
                                <span className="text-xs sm:text-sm text-gray-900">{user?.email}</span>
                            </div>
                            
                            {/* Date - Right */}
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-blue-600" />
                                <span className="text-xs sm:text-sm text-gray-900">Joined {user?.date}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Package className="w-7 h-7 text-gray-900" />
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Order History</h2>
                    </div>

                    <div className="flex justify-center">
                        {loading && <Loader/>}
                    </div>

                    {/* Orders List */}
                    {!loading && getAllOrder.filter((obj) => obj.userid == user?.uid).length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 text-lg">No orders yet</p>
                            <p className="text-gray-500 text-sm mt-2">Start shopping to see your orders here</p>
                        </div>
                    ) : (
                        getAllOrder.filter((obj) => obj.userid == user?.uid).map((order, index) => (
                            <div key={index} className="mb-6">
                                {order.cartItems.map((item, itemIndex) => {
                                    const { id, quantity, price, title, productImageUrl, category } = item
                                    return (
                                        <div key={itemIndex} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mb-4 hover:shadow-lg transition-shadow duration-300">
                                            <div className="flex flex-col md:flex-row">
                                                {/* Order Info Sidebar */}
                                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 md:w-64 p-6 border-b md:border-b-0 md:border-r border-gray-200">
                                                    <div className="space-y-4">
                                                        <div>
                                                            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-1">
                                                                <Package className="w-4 h-4" />
                                                                Order ID
                                                            </div>
                                                            <div className="text-sm font-medium text-gray-900 break-all">#{id.slice(0, 8)}</div>
                                                        </div>

                                                        <div>
                                                            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-1">
                                                                <Clock className="w-4 h-4" />
                                                                Order Date
                                                            </div>
                                                            <div className="text-sm font-medium text-gray-900">{order.date}</div>
                                                        </div>

                                                        <div>
                                                            <div className="text-xs font-semibold text-gray-600 mb-1">Total Amount</div>
                                                            <div className="text-lg font-bold text-gray-900">₹{price * quantity}</div>
                                                        </div>

                                                        <div>
                                                            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-1">
                                                                <CheckCircle className="w-4 h-4" />
                                                                Status
                                                            </div>
                                                            <span className="inline-block px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full first-letter:uppercase">
                                                                {order.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Product Details */}
                                                <div className="flex-1 p-6">
                                                    <div className="flex flex-col sm:flex-row gap-4">
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                className="w-24 h-24 rounded-lg border-2 border-gray-200 object-contain bg-white"
                                                                src={productImageUrl}
                                                                alt={title}
                                                            />
                                                        </div>

                                                        <div className="flex-1 flex flex-col justify-between">
                                                            <div>
                                                                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                                                                <p className="text-sm text-gray-600 mb-2">
                                                                    <span className="font-medium">Category:</span> {category}
                                                                </p>
                                                                <p className="text-sm text-gray-600">
                                                                    <span className="font-medium">Quantity:</span> {quantity}
                                                                </p>
                                                            </div>

                                                            <div className="mt-4 flex items-center justify-between">
                                                                <div className="text-sm text-gray-600">
                                                                    <span className="font-medium">Price Per Item:</span> ₹{price}
                                                                </div>
                                                                <div className="text-lg font-bold text-gray-900">
                                                                    ₹{price * quantity}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default UserProfile;
