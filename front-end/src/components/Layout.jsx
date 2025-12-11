import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Layout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    return (
        <div className="flex flex-col min-h-screen font-sans bg-wood-dark text-cream">
            {/* Navbar */}
            <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${isMenuOpen ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
                <div className="container mx-auto px-6 md:px-8 py-6 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-serif tracking-[0.2em] text-white/90 hover:text-white transition-colors uppercase z-50 relative">
                        Gỗ Mục
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-12 text-sm font-light tracking-widest uppercase">
                        <Link to="/" className="text-white/70 hover:text-white transition-all duration-300 relative group">
                            Trang Chủ
                            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link to="/collection" className="text-white/70 hover:text-white transition-all duration-300 relative group">
                            Triển Lãm
                            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link to="/contact" className="text-white/70 hover:text-white transition-all duration-300 relative group">
                            Liên Hệ
                            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button - Animated Hamburger */}
                    <button 
                        className="md:hidden z-50 text-white focus:outline-none w-8 h-8 relative flex items-center justify-center"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className={`block absolute h-0.5 w-6 bg-white transform transition duration-500 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
                        <span className={`block absolute h-0.5 w-6 bg-white transform transition duration-500 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                        <span className={`block absolute h-0.5 w-6 bg-white transform transition duration-500 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
                    </button>

                    {/* Mobile Menu Overlay - Smooth Fade & Scale */}
                    <div className={`fixed inset-0 bg-wood-dark/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isMenuOpen ? 'opacity-100 visible clip-circle-full' : 'opacity-0 invisible clip-circle-0'}`}>
                        <div className={`flex flex-col space-y-8 text-center text-xl font-light tracking-widest uppercase transition-all duration-700 delay-100 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                             <Link to="/" className="text-white/70 hover:text-white transition-colors hover:scale-110 transform duration-300">Trang Chủ</Link>
                             <Link to="/collection" className="text-white/70 hover:text-white transition-colors hover:scale-110 transform duration-300">Triển Lãm</Link>
                             <Link to="/contact" className="text-white/70 hover:text-white transition-colors hover:scale-110 transform duration-300">Liên Hệ</Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-black/20 text-wood-light py-8 mt-12 border-t border-wood-medium/30">
                <div className="container mx-auto px-6 text-center">
                    <p className="font-serif text-xl mb-4">Gỗ Mục - Tinh Hoa Gỗ Việt</p>
                    <p className="opacity-80 text-sm">&copy; {new Date().getFullYear()} Gỗ Mục. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
