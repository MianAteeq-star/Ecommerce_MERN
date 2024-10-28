// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FaBagShopping } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
// import Cart from '../pages/Cart';



const Navbar = () => {
    const {products} = useSelector(state=>state.cart)
    console.log(products)
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);


    const handleToggle = () => {
        setIsCartOpen(!isCartOpen)
    }
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
        <nav className="bg-white dark:bg-gray-800 dark:text-white shadow-md sticky top-0 z-20">
            <div className="max-w-4xl container mx-auto px-4 sm:px-8 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-2xl font-bold">Logo</Link>
                        </div>
                    </div>
                    <div className="hidden md:flex md:items-center md:space-x-4 ml-6">
                        <Link to="/" className="hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/shop" className="hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Shop</Link>
                        <Link to="/contact" className="hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-4">
                        <Link to={"/search"}>
                        <IoSearchOutline/>
                        </Link>
                        <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
                        </button>
                        <Link to="/cart"  className="relative flex items-center p-1 rounded-md">
                            <FaBagShopping size={20} />
                            <span  className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs rounded-full px-1">{products.length}</span>
                        </Link>
                        <Link to="/login" className="hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                        <button onClick={toggleMobileMenu} className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                            {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                        </button>
                    </div>
                </div>
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <Link to="/" className="block hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/shop" className="block hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Shop</Link>
                        <Link to="/contact" className="block hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
                    </div>
                )}
            </div>
        </nav>



        </>
    );
};

export default Navbar;