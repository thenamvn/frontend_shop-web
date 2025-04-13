import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  
  const categories = ['Áo', 'Quần', 'Váy', 'Phụ kiện', 'Giày dép', 'Sale'];
  
  return (
    <nav className="bg-primary text-white">
      {/* Top navbar */}
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="mr-4 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <Link to="/" className="text-2xl font-bold">FashionStore</Link>
        </div>
        
        {/* Search bar */}
        <div className="hidden md:block flex-1 mx-10 relative">
          <div className="flex">
            <input 
              type="text" 
              className="w-full p-2 text-dark rounded-l-md focus:outline-none"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-secondary text-white px-4 rounded-r-md hover:bg-opacity-90 transition">
              <FiSearch className="text-lg" />
            </button>
          </div>
        </div>
        
        {/* User actions */}
        <div className="flex items-center space-x-6">
          <Link to="/cart" className="relative">
            <FiShoppingCart className="text-2xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/account">
            <FiUser className="text-2xl" />
          </Link>
        </div>
      </div>
      
      {/* Mobile search bar */}
      <div className="md:hidden px-4 py-2">
        <div className="flex">
          <input 
            type="text" 
            className="w-full p-2 text-dark rounded-l-md focus:outline-none"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-secondary text-white px-4 rounded-r-md hover:bg-opacity-90 transition">
            <FiSearch className="text-lg" />
          </button>
        </div>
      </div>
      
      {/* Categories navbar */}
      <div className="bg-secondary relative">
        <div className="container mx-auto px-4 py-2">
          <ul className="hidden md:flex space-x-6 justify-center">
            {categories.map((category, index) => (
              <li key={index}>
                <Link to={`/category/${category.toLowerCase()}`} className="hover:text-gray-200 transition">
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-primary z-50 md:hidden">
            <div className="py-2 px-4">
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link 
                      to={`/category/${category.toLowerCase()}`} 
                      className="block py-2 hover:bg-secondary px-2 rounded"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;