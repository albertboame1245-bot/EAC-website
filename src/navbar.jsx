import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-8 py-4 bg-white h-20 md:h-24 shadow-sm">
            {/* Logo and Company Name */}
            <div className="flex items-center gap-3">
                <Link to="/" className="flex items-center gap-3">
                    {/* Company Logo - Path from public folder */}
                    <img 
                        src="../assets/companyLogo (2).jpg" 
                        alt="EAC Electrical Solutions" 
                        className="h-10 w-10 md:h-12 md:w-12 object-contain"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            console.log('Logo failed to load. Check path: ../assets/companyLogo (2).jpg');
                        }}
                    />
                    {/* Company Name */}
                    <h1 className="text-xl md:text-2xl font-bold text-blue-600">
                        EAC Electricals Solution
                    </h1>
                </Link>
            </div>

            {/* Rest of your code remains the same */}
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
                <ul className="flex items-center gap-8">
                    <li>
                        <Link 
                            to="/" 
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/about" 
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                        >
                            About us
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/teams" 
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                        >
                            Our Team
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/services" 
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                        >
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/projects" 
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                        >
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/contact" 
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
                
                {/* Get Started Button - Desktop */}
                <Link 
                    to="/signin"
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                    Get Started
                </Link>
            </div>

            {/* Mobile Menu Button (Hamburger) */}
            <div className="md:hidden flex items-center gap-4">
                <Link 
                    to="/signin"
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
                >
                    Sign In
                </Link>
                
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-700 hover:text-blue-600 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    <svg 
                        className="w-6 h-6" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6">
                    <ul className="flex flex-col gap-4">
                        <li>
                            <Link 
                                to="/" 
                                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/about" 
                                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                About us
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/teams" 
                                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                Our Team
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/services" 
                                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/projects" 
                                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/contact" 
                                className="block py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                    
                    {/* Mobile Get Started Button */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <Link 
                            to="/signin"
                            className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
                            onClick={() => setIsOpen(false)}
                        >
                            Sign In to Your Account
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;