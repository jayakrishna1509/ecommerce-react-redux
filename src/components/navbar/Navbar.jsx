import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import './Navbar.css';


const Navbar = () => {
    const user=JSON.parse(localStorage.getItem('users'));
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const logout = () =>{
        localStorage.clear('users');
        navigate('/');
        setIsMobileMenuOpen(false);
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // navList Data
    const navList = (
        <ul className="nav-list">
            {/* Home */}
            <li className="nav-item">
                <Link to={'/'} onClick={closeMobileMenu}>Home</Link>
            </li>

            {/* All Product */}
            <li className="nav-item">
                <Link to={'/allproducts'} onClick={closeMobileMenu}>All Products</Link>
            </li>

            {/* Signup */}
            {!user ?<li className="nav-item">
                <Link to={'/signup'} onClick={closeMobileMenu}>Sign Up</Link>
            </li>: ""}

            {/*Sign In */}
            {!user ?<li className="nav-item">
                <Link to={'/signin'} onClick={closeMobileMenu}>Sign In</Link>
            </li>: ""}

            {/* Wishlist */}
            <li className="nav-item">
                <Link to={'/wishlist'} onClick={closeMobileMenu}>
                    Wishlist
                </Link>
            </li>

            {/* Cart */}
            <li className="nav-item">
                {user ? (
                    <Link to={'/cart'} onClick={closeMobileMenu}>
                        Cart({cartItems.length})
                    </Link>
                ) : (
                    <span 
                        onClick={() => {
                            window.history.replaceState(null, '', '/');
                            navigate('/signin');
                            closeMobileMenu();
                        }} 
                        style={{ cursor: 'pointer' }}
                    >
                        Cart({cartItems.length})
                    </span>
                )}
            </li>


            {/* User */}
           {user && <li className="nav-item">
                <Link to={'/user-profile'} onClick={closeMobileMenu}>{user?.name}</Link>
            </li>}

            {/* logout */}
            {user && <li className="nav-item">
                <button className="logout-button" onClick={logout}>
                    <LogOut className="logout-icon" />
                    Logout
                </button>
            </li>}
        </ul>
    )
    return (
        <nav className="navbar">
            {/* main  */}
            <div className="navbar-container">
                {/* left  */}
                <div className="navbar-left">
                    <Link to={'/'}>
                    <h2 className="navbar-title">EKart <span className="cart-icon">🛒</span></h2>
                    </Link>
                </div>

                {/* center - Navigation Links */}
                <div className={`navbar-center ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                    {navList}
                    
                    {/* Mobile Search Bar - Only visible in mobile menu */}
                    <div className="mobile-search-container">
                        <SearchBar />
                    </div>
                </div>

                {/* right - Search Bar - Desktop only */}
                <div className="navbar-right">
                    <SearchBar />
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    className="mobile-menu-toggle" 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <X className="menu-icon" />
                    ) : (
                        <Menu className="menu-icon" />
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="mobile-menu-overlay" 
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </nav>
    );
}

export default Navbar;