import React, { useContext } from 'react'

import { useState } from "react";
import myContext from '../../context/myContext';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

// Import product images
import allenSolyShirt from '../../assets/products/Allen-Soly-Causual-Shirt.jpg';
import divisiveKurta from '../../assets/products/Divisive-Kurta.jpg';
import glowicHoodie from '../../assets/products/Glowic-Mens-Hoodie.jpg';
import jackJonesJacket from '../../assets/products/Jack-Jones-Jacket.jpg';
import motoEdge60 from '../../assets/products/Moto-Edge60.jpg';
import oneplus13 from '../../assets/products/Oneplus-13.jpg';
import samsungA55 from '../../assets/products/Samsung-A55.jpg';
import vivoV60 from '../../assets/products/Vivo-V60.jpg';


const SearchBar = () => {
    const context = useContext(myContext);
    const { getAllProduct } = context;
   // Search State 
   const [search, setSearch] = useState("");
  
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

    // Only use static products for search
    // If you want to include Firebase products, uncomment the line below
    const allProducts = bestSellingProducts;
    
    // To include Firebase products, use this instead:
    // const allProducts = [...bestSellingProducts, ...getAllProduct];

   // Filter Search Data - search in both title and category
   const filterSearchData = allProducts.filter((obj) => 
       obj.title.toLowerCase().includes(search.toLowerCase()) || 
       obj.category.toLowerCase().includes(search.toLowerCase())
   ).slice(0, 8)

   const navigate = useNavigate();

  return (
    <div className="searchbar">
      <div className="searchbar-input-wrapper">
        <div className="searchbar-input-inner">
            <input
                type="text"
                placeholder='Search Here'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='searchbar-input'
            />
            <svg 
                className="searchbar-icon" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
      </div>

      <div className="searchbar-dropdown-wrapper">
        {search && <div className="searchbar-dropdown">
            {filterSearchData.length > 0 ?
                <>
                    {filterSearchData.map((item, index) => {
                        return (
                            <div 
                            onClick={()=>{
                                navigate(`/productinfo/${item.id}`);
                                setSearch('');
                            }}
                            key={item.id} className="searchbar-option">
                                <div className="searchbar-option-inner">
                                    <img className="searchbar-option-image" src={item.productImageUrl} alt={item.title} />
                                    <div className="searchbar-option-content">
                                        <p className="searchbar-option-title">{item.title}</p>
                                        <p className="searchbar-option-price">₹{item.price}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </>
                :
                <div className="searchbar-empty">
                    <img className="searchbar-empty-image" src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png" alt="img" />
                </div>
            }
        </div>}
      </div>
    </div>
  );
}

export default SearchBar;
