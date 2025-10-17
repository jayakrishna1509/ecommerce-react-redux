import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import myContext from '../../context/myContext';
import Loader from '../../components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../redux/cartSlice';
import toast from 'react-hot-toast';
import allenSolyShirt from '../../assets/products/Allen-Soly-Causual-Shirt.jpg';
import divisiveKurta from '../../assets/products/Divisive-Kurta.jpg';
import glowicHoodie from '../../assets/products/Glowic-Mens-Hoodie.jpg';
import jackJonesJacket from '../../assets/products/Jack-Jones-Jacket.jpg';
import motoEdge60 from '../../assets/products/Moto-Edge60.jpg';
import oneplus13 from '../../assets/products/Oneplus-13.jpg';
import samsungA55 from '../../assets/products/Samsung-A55.jpg';
import vivoV60 from '../../assets/products/Vivo-V60.jpg';
import notFoundImage from '../../assets/category/notfound.png';

const CategoryPage = () => {
  const {categoryname} = useParams();

  const context = useContext(myContext);
  const {getAllProduct,loading} = context;

  const navigate = useNavigate();

  const filterProduct = getAllProduct.filter((obj)=> obj.category.includes(categoryname));

  const shirtsExtras = [
    {
      id: 'id1',
      title: 'Allen Solly Casual Shirt',
      price: '1299',
      category: 'fashion',
      description: 'Premium Quality Casual Shirt Perfect for Everyday Wear.',
      rating: 4.5,
      productImageUrl: allenSolyShirt,
    },
    {
      id: 'id2',
      title: 'Divisive Traditional Kurta',
      price: '1899',
      category: 'fashion',
      description: 'Elegant Traditional Kurta with Modern Design and Casual Gatherings.',
      rating: 4.3,
      productImageUrl: divisiveKurta,
    }
  ];

  const jacketsExtras = [
    {
      id: 'id3',
      title: 'Glowic Mens Premium Hoodie',
      price: '2499',
      category: 'fashion',
      description: 'Comfortable and Stylish Hoodie with Premium Quality Fabric.',
      rating: 4.6,
      productImageUrl: glowicHoodie,
    },
    {
      id: 'id4',
      title: 'Jack & Jones Winter Jacket',
      price: '3999',
      category: 'fashion',
      description: 'Trendy Winter Jacket with Excellent Insulation.',
      rating: 4.7,
      productImageUrl: jackJonesJacket,
    }
  ];

  const mobilesExtras = [
    {
      id: 'id5',
      title: 'Moto Edge 60 5G',
      price: '24999',
      category: 'mobile',
      description: 'Powerful 5G Smartphone with Stunning Display and Advanced Camera System.',
      rating: 4.4,
      productImageUrl: motoEdge60,
    },
    {
      id: 'id6',
      title: 'OnePlus 13s 5G',
      price: '54999',
      category: 'mobile',
      description: 'Flagship Smartphone with Cutting-Edge Technology.',
      rating: 4.8,
      productImageUrl: oneplus13,
    },
    {
      id: 'id7',
      title: 'Samsung Galaxy A55 5G',
      price: '32999',
      category: 'mobile',
      description: 'Feature-Rich Smartphone with vibrant AMOLED display.',
      rating: 4.5,
      productImageUrl: samsungA55,
    },
    {
      id: 'id8',
      title: 'Vivo V60 5G',
      price: '29999',
      category: 'mobile',
      description: 'Sleek design with Powerful Camera Capabilities.',
      rating: 4.2,
      productImageUrl: vivoV60,
    }
  ];

  let displayedProducts = filterProduct;
  if (categoryname === 'Shirts') {
    displayedProducts = [...shirtsExtras, ...filterProduct];
  } else if (categoryname === 'Jackets') {
    displayedProducts = [...jacketsExtras, ...filterProduct];
  } else if (categoryname === 'Mobiles') {
    displayedProducts = [...mobilesExtras, ...filterProduct];
  }
  displayedProducts = displayedProducts.filter((p, i, self) => i === self.findIndex(q => q.id === p.id));
  const isFew = displayedProducts.length <= 2 && categoryname !== 'Jackets' && categoryname !== 'Shirts';
  const containerClasses = isFew ? 'container px-5 py-5 mx-auto max-w-5xl' : 'container px-5 py-5 mx-auto';
  const gridClasses = isFew ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 pb-8 justify-items-center' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8';

const cartItems = useSelector((state) => state.cart);
const dispatch = useDispatch();

const addCart = (item) =>{
    dispatch(addToCart(item));
    toast.success("Add To Cart")
}

const deleteCart = (item) =>{
    dispatch(deleteFromCart(item));
    toast.success("Delete Cart")
}

  return (
    <Layout>
      <div className="py-6 sm:py-8 lg:py-10">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-center mb-6 sm:mb-8 text-2xl sm:text-3xl font-bold text-gray-800 capitalize">{categoryname}</h1>
            </div>

            {loading?
          
          <div className="flex justify-center">
            <Loader/>
          </div>
          :
              <section className="text-gray-600 body-font">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    <div className={gridClasses}>
                        {displayedProducts.length > 0 ? (
                          <>
                            {displayedProducts.map((item, index) => {
                              const { id, title, price, productImageUrl, description, rating } = item;
                              return (
                                <div key={id} className="flex justify-center">
                                  <div className="w-full max-w-sm h-full border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-lg bg-white flex flex-col">
                                    {/* Image Container */}
                                    <div className="relative bg-white h-64 flex items-center justify-center">
                                      <img
                                        onClick={() => navigate(`/productInfo/${id}`)}
                                        className="max-w-small max-h-full object-contain cursor-pointer p-4"
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
                                          <h1 className="text-2xl font-bold text-gray-900">₹{price}</h1>
                                          {rating && (
                                            <div className="flex items-center text-yellow-400">
                                              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                              </svg>
                                              <span className="text-gray-600 text-sm ml-1">{rating}</span>
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      {/* Button Container */}
                                      <div className="mt-auto">
                                        {cartItems.some((p) => p.id === item.id) ? (
                                          <button onClick={() => deleteCart(item)} className="btn-danger btn-block">
                                            Remove From Cart
                                          </button>
                                        ) : (
                                          <button onClick={() => addCart(item)} className="btn-primary btn-block">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            Add To Cart
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          <div className="col-span-full flex flex-col items-center justify-center py-10">
                            <div className="flex justify-center mb-2">
                              <img src={notFoundImage} alt="NotFound" />
                            </div>
                            <h1 className="text-black text-xl text-center">No {categoryname} Product Found</h1>
                          </div>
                        )}
                    </div>
                </div>
            </section>
          }
         
      </div>
    </Layout>
  )
}

export default CategoryPage
