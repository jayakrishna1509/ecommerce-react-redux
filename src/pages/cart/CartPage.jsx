import React, { useEffect, useState } from 'react'

import Layout from "../../components/layout/Layout";
import { Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, deleteFromCart, incrementQuality } from '../../redux/cartSlice';
import { placeOrderAsync } from '../../redux/ordersSlice';
import toast from 'react-hot-toast';
import BuyNowModal from '../../components/buyNowModel/BuyNowModel';
import { useNavigate } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';

const CartPage = () => {

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const user = JSON.parse(localStorage.getItem('users'));

    const deleteCart = (item) =>{
        dispatch(deleteFromCart(item));
        toast.success("Delete Cart");
    }

    const handleIncrement = (id) => {
        dispatch(incrementQuality(id));
    };

    const handleDecrement = (id) =>{
        dispatch( decrementQuantity(id));
    };

    const cartItemTotal = cartItems.map(item => item.quantity || 1).reduce((prevValue,curValue) => prevValue + curValue, 0);

    const cartTotal = cartItems.map(item => parseInt(item.price) * (item.quantity || 1)).reduce((prevValue,curValue) =>prevValue + curValue, 0);

    // Log cart updates
    useEffect(() => {
        console.log('Cart Items:', cartItems);
        console.log('Total Items:', cartItemTotal);
        console.log('Total Price: ₹', cartTotal);
        localStorage.setItem('cart',JSON.stringify(cartItems));
    },[cartItems, cartItemTotal, cartTotal])

    const [addressInfo,setAddressInfo] = useState({
       name:"",
       address:"",
       pincode:"",
       mobileNumber:""
    });

    const [paymentMethod, setPaymentMethod] = useState('COD');

    const buyNowFunction = async () => {
        if(addressInfo.name == "" || addressInfo.address == "" || addressInfo.pincode == "" || addressInfo.mobileNumber == ""){
            return toast.error("All Fields are Required")
        }

        const orderInfo = {
            cartItems,
            addressInfo,
            email:user.email,
            userid:user.uid,
            status:"confirmed",
            paymentMethod,
        }

        try {
            // Dispatch async thunk action
            const resultAction = await dispatch(placeOrderAsync(orderInfo));
            
            if (placeOrderAsync.fulfilled.match(resultAction)) {
                // Order placed successfully
                const orderId = resultAction.payload.id;
                
                // Clear cart after successful order
                cartItems.forEach(item => {
                    dispatch(deleteFromCart(item));
                });
                
                toast.success("Order Placed Successfully");
                
                setAddressInfo({
                    name:"",
                    address:"",
                    pincode:"",
                    mobileNumber:"",
                });
                
                navigate(`/order/${orderId}`);
            } else {
                // Order failed
                toast.error(resultAction.payload || "Failed to place order");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to place order");
        }
    }
    return (
        <Layout>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="mx-auto max-w-2xl py-6 sm:py-8 lg:max-w-7xl">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                        Shopping Cart
                    </h1>
                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
                            <h2 id="cart-heading" className="sr-only">
                                Items in Your Shopping Cart
                            </h2>
                            <ul role="list" className="space-y-4">
                                {cartItems.length > 0 ?
                                
                                <>
                                {cartItems.map((item,index) => {
                                    const {id, title, price, productImageUrl, quantity ,category} = item
                                    return(
                                        <div key={id} className="border border-gray-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow bg-white">
                                        <li className="flex py-4">
                                            <div className="flex-shrink-0 bg-gray-50 rounded-lg p-2">
                                                <img
                                                    src={productImageUrl}
                                                    alt={title}
                                                    className="h-32 w-32 rounded-md object-contain"
                                                />
                                            </div>

                                            <div className="ml-6 flex flex-1 flex-col justify-between">
                                                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                    <div>
                                                        <div className="flex justify-between">
                                                            <h3 className="text-lg font-bold text-gray-900">
                                                                {title}
                                                            </h3>
                                                        </div>
                                                        <div className="mt-2 flex items-center gap-2">
                                                            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">{category}</span>
                                                        </div>
                                                        <div className="mt-3 flex items-center">
                                                            <p className="text-2xl font-bold text-gray-900">
                                                                ₹{parseInt(price)}
                                                            </p>
                                                            <span className="ml-2 text-sm text-gray-500">per item</span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 sm:mt-0 sm:pr-6">
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-sm text-black-600">Subtotal:</p>
                                                            <p className="text-lg font-bold text-black-600">₹{parseInt(price) * (quantity || 1)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <div className="mt-4 flex items-center justify-between border-t pt-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                                                <div className="flex items-center border border-gray-300 rounded-lg">
                                                    <button onClick={()=> handleDecrement(id)} type="button" className="h-8 w-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg font-bold">
                                                        -
                                                    </button>
                                                    <input
                                                        type="text"
                                                        className="h-8 w-12 border-x text-center font-semibold text-gray-900"
                                                        value={quantity || 1}
                                                        readOnly
                                                    />
                                                    <button onClick={()=> handleIncrement(id)} type="button" className="h-8 w-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg font-bold">
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex text-sm">
                                                <button 
                                                onClick={()=> deleteCart(item)}
                                                type="button" className="flex items-center gap-2 btn-danger">
                                                    <Trash size={16} />
                                                    <span>Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                }
                                    
                                    
                                    
                                )}
                                </>
                            
                                :

                                <div className="text-center py-16">
                                    <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    <h3 className="mt-4 text-2xl font-semibold text-gray-900">Your Cart is Empty🧺</h3>
                                    <p className="mt-2 text-gray-600">Add More Products to Your Cart!</p>
                                </div>
                            }
                                
                            </ul>
                        </section>
                        {/* Order summary */}
                        <section
                            aria-labelledby="summary-heading"
                            className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
                        >
                            <h2
                                id="summary-heading"
                                className=" border-b border-gray-200 px-4 py-3 text-lg font-bold theme-primary-text sm:p-4"
                            >
                                Price Details
                            </h2>
                            <div>
                                <dl className=" space-y-1 px-2 py-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-800">Price ({cartItemTotal} item)</dt>
                                        <dd className="text-sm font-medium text-gray-900">₹ {cartTotal}</dd>
                                    </div>
                                    
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="flex text-sm text-gray-800">
                                            <span>Delivery Charges</span>
                                        </dt>
                                        <dd className="text-sm font-medium text-green-700">Free</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-y border-dashed py-4 ">
                                        <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                                        <dd className="text-base font-medium text-gray-900">₹ {cartTotal}</dd>
                                    </div>
                                </dl>
                                <div className="px-2 pb-4 font-medium text-green-700">
                                    <div className="payment-methods">
                                        <div className="payment-title">Select Payment Method</div>
                                        <label className="payment-option"><input type="radio" name="payment" checked={paymentMethod==='COD'} onChange={()=>setPaymentMethod('COD')} /> Cash on Delivery</label>
                                    </div>
                                    <div className="flex gap-4 mb-6">
                                        {user ?
                                        <BuyNowModal
                                        addressInfo={addressInfo}
                                        setAddressInfo={setAddressInfo}
                                        buyNowFunction={buyNowFunction}
                                        />
                                        :
                                        <button
                                            onClick={() => navigate('/signin', { replace: true })}
                                            className='w-full text-white text-center py-2.5 font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-200 text-sm'
                                            style={{backgroundColor: '#1d4ed8'}}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = '#1e40af'}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                                        >
                                            Sign In to Checkout
                                        </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default CartPage;