import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import myContext from '../../context/myContext';
import Loader from '../loader/Loader';
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

const HomePageProductCard = () => {
    const navigate=useNavigate();

    const context = useContext(myContext);
    const {loading,getAllProduct} = context;

    const cartItems = useSelector((state)=>state.cart);
    console.log(cartItems);

    const dispatch = useDispatch();

    // Static product data with uploaded images
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

    const addCart = (item) =>{
        dispatch(addToCart(item));
        toast.success("Added to Cart")
    }

    const deleteCart = (item) =>{
        dispatch(deleteFromCart(item));
        toast.success("Delete Cart")
    }

    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cartItems));
    },[cartItems]);
    return (
        <div className="mt-8 sm:mt-10 mb-12 sm:mb-16">
            {/* Heading  */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
                <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Best Selling Products</h1>
                <p className="text-center text-gray-600 text-sm">Discover Our Top-Rated Products Loved By Customers</p>
            </div>

            {/* main  */}
            <section className="text-gray-600 body-font">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-5">
                    <div className='flex justify-center'>
                        {loading && <Loader/>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pb-8">
                        {bestSellingProducts.map((item, index) => {
                            const { id, title, price, productImageUrl, description, rating } = item
                            return (
                                <div key={id} className="transform transition-all duration-300 hover:-translate-y-2">
                                    <div className="h-full border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:border-blue-400 bg-white flex flex-col transition-all duration-300">
                                        {/* Image Container */}
                                        <div className="relative bg-white h-64 flex items-center justify-center overflow-hidden">
                                            <img
                                                onClick={()=> navigate(`/productInfo/${id}`)}
                                                className="max-w-full max-h-full object-contain cursor-pointer p-4 transform transition-transform duration-500 hover:scale-110"
                                                src={productImageUrl}
                                                alt={title}
                                            />
                                        </div>
                                        
                                        {/* Content Container */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            <div className="flex-grow">
                                                <h2 className="tracking-wider text-xs title-font font-semibold theme-primary-text mb-2 uppercase transition-colors duration-300">
                                                    E-Kart
                                                </h2>
                                                <h1 className="title-font text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                                                    {title}
                                                </h1>
                                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                    {description}
                                                </p>
                                                <div className="flex items-center justify-between mb-4">
                                                    <h1 className="text-2xl font-bold text-gray-900">
                                                        ₹{price}
                                                    </h1>
                                                    <div className="flex items-center text-yellow-400">
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                                                        </svg>
                                                        <span className="text-gray-600 text-sm ml-1">{rating}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Button Container */}
                                            <div className="mt-auto">
                                                {cartItems.some((p)=>p.id === item.id)
                                                ?
                                                <button
                                                    onClick={() => deleteCart(item)}
                                                    className="btn-danger btn-block transform transition-all duration-300 hover:scale-105 active:scale-95">
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
                </div>
            </section>
        </div>
    );
}

export default HomePageProductCard;