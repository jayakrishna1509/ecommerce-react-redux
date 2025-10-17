import React from 'react'
import { useNavigate } from 'react-router-dom';

// Import category images
import fashionImg from '../../assets/category/fashion.png';
import shirtsImg from '../../assets/category/shirts.png';
import jacketsImg from '../../assets/category/jackets.png';
import mobileImg from '../../assets/category/mobile.png';
import laptopImg from '../../assets/category/laptop.png';
import shoesImg from '../../assets/category/shoes.png';
import homeImg from '../../assets/category/home.png';
import booksImg from '../../assets/category/books.png';

// category 
const category = [
    {
        image: fashionImg,
        name: 'Fashion'
    },
    {
        image: shirtsImg,
        name: 'Shirts'
    },
    {
        image: jacketsImg,
        name: 'Jackets'
    },
    {
        image: mobileImg,
        name: 'Mobiles'
    },
    {
        image: laptopImg,
        name: 'Laptops'
    },
    {
        image: shoesImg,
        name: 'Shoes'
    },
    {
        image: homeImg,
        name: 'Home'
    },
    {
        image: booksImg,
        name: 'Books'
    }
]

const Category = () => {
    const navigate = useNavigate();
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col mt-5 mb-5">
                {/* main 1 */}
                <div className="flex overflow-x-auto lg:overflow-x-visible lg:justify-center hide-scroll-bar">
                    {/* main 2  */}
                    <div className="flex gap-2 sm:gap-4 lg:gap-8 py-2">
                        {/* category  */}
                        {category.map((item, index) => {
                            return (
                                <div key={index} className="flex-shrink-0">
                                    {/* Image  */}
                                    <div 
                                    onClick={()=>navigate(`/category/${item.name}`)}
                                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full theme-primary-bg transition-all cursor-pointer mb-2 flex items-center justify-center hover:scale-110" >
                                        <div className="flex justify-center items-center w-full h-full p-2">
                                            {/* Image tag  */}
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                        </div>
                                    </div>

                                    {/* Name Text  */}
                                    <h1 className='text-xs sm:text-sm lg:text-base text-center font-medium title-font first-letter:uppercase whitespace-nowrap'>{item.name}</h1>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* style  */}
            <style dangerouslySetInnerHTML={{ __html: ".hide-scroll-bar {  -ms-overflow-style: none;  scrollbar-width: none;}.hide-scroll-bar::-webkit-scrollbar {  display: none;}" }} />
        </div>
    );
}

export default Category;
