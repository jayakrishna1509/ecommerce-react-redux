import React, { useContext, useEffect, useState } from 'react'

import Layout from "../../components/layout/Layout";
import myContext from '../../context/myContext';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import Loader from '../../components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../redux/cartSlice';
import toast from 'react-hot-toast';

// Import product images
import allenSolyShirt from '../../assets/products/Allen-Soly-Causual-Shirt.jpg';
import divisiveKurta from '../../assets/products/Divisive-Kurta.jpg';
import glowicHoodie from '../../assets/products/Glowic-Mens-Hoodie.jpg';
import jackJonesJacket from '../../assets/products/Jack-Jones-Jacket.jpg';
import motoEdge60 from '../../assets/products/Moto-Edge60.jpg';
import oneplus13 from '../../assets/products/Oneplus-13.jpg';
import samsungA55 from '../../assets/products/Samsung-A55.jpg';
import vivoV60 from '../../assets/products/Vivo-V60.jpg';

const ProductInfo = () => {
    const context = useContext(myContext);
    const {loading,setLoading} = context;

    const[product,setProduct] = useState('')

    const {id} = useParams();

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

    const getProductData = async () =>{
        setLoading(true);
        try {
            // Check if it's a best selling product
            const staticProduct = bestSellingProducts.find(p => p.id === id);
            if (staticProduct) {
                setProduct(staticProduct);
                setLoading(false);
                return;
            }
            
            // Otherwise fetch from Firebase
            const productTemp = await getDoc(doc(fireDB,"product",id));
            // console.log(productTemp.data())
            setProduct({...productTemp.data(),id:productTemp.id});
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
            
        }
    }
    // console.log(product)

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Add To Cart")
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Delete Cart")
    }

    // Wishlist functionality
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const isProductInWishlist = wishlist.some(item => item.id === product.id);
        setIsInWishlist(isProductInWishlist);
    }, [product]);

    const toggleWishlist = () => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const isProductInWishlist = wishlist.some(item => item.id === product.id);

        if (isProductInWishlist) {
            const updatedWishlist = wishlist.filter(item => item.id !== product.id);
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            setIsInWishlist(false);
            window.alert('Removed from Wishlist');
        } else {
            wishlist.push(product);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            setIsInWishlist(true);
            window.alert('Added to Wishlist');
        }
    };

    useEffect(()=>{
        getProductData();
    },[])
    return (
        <Layout>
            <section className="py-6 sm:py-8 lg:py-16 font-poppins bg-gray-50">
                {loading?
                
                <>
                <div className='flex justify-center items-center min-h-[60vh]'>
                    <Loader/>
                </div>
                </>
                :

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="flex flex-wrap">
                            {/* Image Section */}
                            <div className="w-full px-6 py-8 mb-8 md:w-1/2 md:mb-0">
                                <div className="sticky top-24">
                                    <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg">
                                        <img
                                            className="w-full h-[500px] lg:h-[600px] object-contain p-8"
                                            src={product?.productImageUrl}
                                            alt={product?.title}
                                        />
                                        {/* Wishlist Heart Icon */}
                                        <button
                                            onClick={toggleWishlist}
                                            className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform duration-200"
                                        >
                                            <svg
                                                className={`w-6 h-6 ${isInWishlist ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                                                fill={isInWishlist ? 'currentColor' : 'none'}
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
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Product Details Section */}
                            <div className="w-full px-6 py-8 md:w-1/2">
                                <div className="lg:pl-8">
                                    {/* Brand Badge */}
                                    <div className="inline-block bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                                        E-Kart
                                    </div>
                                    
                                    {/* Product Title */}
                                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                       {product?.title}
                                    </h1>
                                    
                                    {/* Rating Section */}
                                    <div className="flex items-center mb-6">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, index) => (
                                                <svg
                                                    key={index}
                                                    className={`w-5 h-5 ${index < Math.floor(product?.rating || 0) ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="ml-2 text-gray-600 text-sm font-medium">{product?.rating} (128 reviews)</span>
                                    </div>
                                    
                                    {/* Price */}
                                    <div className="mb-8">
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-4xl font-bold text-gray-900">₹{product?.price}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Description */}
                                    <div className="mb-8">
                                        <h2 className="text-xl font-bold text-gray-900 mb-3">
                                            Product Description
                                        </h2>
                                        <p className="text-gray-700 leading-relaxed">{product?.description}</p>
                                    </div>

                                    {/* Features */}
                                    <div className="mb-8">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                                        <ul className="space-y-2">
                                            <li className="flex items-center text-gray-700">
                                                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                                </svg>
                                                Premium Quality Material
                                            </li>
                                            <li className="flex items-center text-gray-700">
                                                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                                </svg>
                                                Fast & Free Delivery
                                            </li>
                                            <li className="flex items-center text-gray-700">
                                                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                                </svg>
                                                7 Days Easy Return
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-4">
                                        {cartItems.some((p)=> p.id === product.id)
                                        ?
                                        <button
                                            onClick={() => deleteCart(product)}
                                            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Remove From Cart
                                        </button>

                                        :

                                        <button
                                            onClick={() => addCart(product)}
                                            className="btn-primary btn-block"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            Add To Cart
                                        </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
                
            </section>

        </Layout>
    );
}

export default ProductInfo;
