import React, { useState, useContext, useEffect } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { FiMenu, FiX, FiShoppingBag, FiSearch, FiHeart } from 'react-icons/fi';
    import { CartContext } from '../context/CartContext';
    import { AuthContext } from '../context/AuthContext';
    import { CSSTransition } from 'react-transition-group';

    function Navbar() {
      const [isOpen, setIsOpen] = useState(false);
      const [searchQuery, setSearchQuery] = useState('');
      const navigate = useNavigate();
      const { cart } = useContext(CartContext);
      const { user, logout } = useContext(AuthContext);
      const [cartCount, setCartCount] = useState(0);

      useEffect(() => {
        setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
      }, [cart]);

      const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
          navigate(`/shop?search=${searchQuery}`);
        } else {
          navigate('/shop');
        }
      };

      return (
        <nav className="bg-black border-b border-zinc-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-14 md:h-16">
              <div className="flex items-center space-x-2">
                <Link to="/" className="text-xl md:text-2xl font-light tracking-widest hover:opacity-80 transition-opacity duration-300" style={{ fontFamily: 'Calibri Light, sans-serif' }}>vulgar</Link>
                <img 
                  src="https://flagcdn.com/w20/tn.png" 
                  alt="Tunisia Flag" 
                  className="w-3 h-auto md:w-4 opacity-70 hover:opacity-100 transition-opacity duration-300"
                  title="Proudly Tunisian"
                />
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-1 pl-3 pr-8 text-sm focus:outline-none focus:border-zinc-600 transition-colors duration-300"
                  />
                  <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300">
                    <FiSearch size={14} />
                  </button>
                </div>
              </form>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-6">
                <Link to="/" className="nav-link text-sm text-gray-400 hover:text-white transition-colors duration-300">Home</Link>
                <Link to="/shop" className="nav-link text-sm text-gray-400 hover:text-white transition-colors duration-300">Shop</Link>
                <Link to="/about" className="nav-link text-sm text-gray-400 hover:text-white transition-colors duration-300">About</Link>
                {user ? (
                  <>
                    <Link to="/wishlist" className="text-gray-400 hover:text-white transition-colors duration-300">
                      <FiHeart size={16} />
                    </Link>
                    <button onClick={logout} className="text-sm text-gray-400 hover:text-white transition-colors duration-300">Logout</button>
                  </>
                ) : (
                  <Link to="/login" className="nav-link text-sm text-gray-400 hover:text-white transition-colors duration-300">Login</Link>
                )}
                <Link to="/cart" className="text-gray-400 hover:text-white transition-colors duration-300 relative">
                  <FiShoppingBag size={16} />
                  {cartCount > 0 && (
                    <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden bg-black border-t border-zinc-800">
              <div className="px-4 py-4 space-y-3">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-1 pl-3 pr-8 text-sm focus:outline-none focus:border-zinc-600"
                    />
                    <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <FiSearch size={14} />
                    </button>
                  </div>
                </form>
                <Link
                  to="/"
                  className="block text-sm text-gray-400 hover:text-white transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/shop"
                  className="block text-sm text-gray-400 hover:text-white transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Shop
                </Link>
                <Link
                  to="/about"
                  className="block text-sm text-gray-400 hover:text-white transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                {user ? (
                  <>
                    <Link
                      to="/wishlist"
                      className="block text-sm text-gray-400 hover:text-white transition-colors duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Wishlist
                    </Link>
                    <button onClick={logout} className="block text-sm text-gray-400 hover:text-white transition-colors duration-300">Logout</button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block text-sm text-gray-400 hover:text-white transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                )}
                <Link
                  to="/cart"
                  className="block text-sm text-gray-400 hover:text-white transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Cart
                </Link>
              </div>
            </div>
          )}
        </nav>
      );
    }

    export default Navbar;
