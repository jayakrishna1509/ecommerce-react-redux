import React from 'react'
import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () => {
    return (
        <div>
            {/* footer  */}
            <footer className="theme-primary-bg">
                {/* main  */}
                <div className="container mx-auto">
                    <div className="footer-container">
                        {/* Left: Logo and Copyright */}
                        <div className="footer-left">
                            {/* logo  */}
                            <a className="footer-logo">
                                EKart <span className="cart-icon">🛒</span>
                            </a>
                            {/* para  */}
                            <p className="footer-text">
                                © 2025 Ecommerce React Redux —
                                <Link   
                                to={'/'}
                                    className="text-gray-100 ml-1"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    @EKart
                                </Link>
                            </p>
                        </div>
                        
                        {/* Right: Social Media Icons */}
                        <div className="footer-right">
                            {/* facebook  */}
                            <a className="footer-icon">
                                <svg
                                    fill="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                </svg>
                            </a>

                            {/* X (formerly Twitter)  */}
                            <a className="footer-icon">
                                <svg
                                    fill="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>

                            {/* instagram  */}
                            <a className="footer-icon">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                                </svg>
                            </a>

                            {/* linkedIn  */}
                            <a className="footer-icon">
                                <svg
                                    fill="currentColor"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={0}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="none"
                                        d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                                    />
                                    <circle cx={4} cy={4} r={2} stroke="none" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
