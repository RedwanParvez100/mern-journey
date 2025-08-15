import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import useStore from "../store/store";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isAuthenticated, logout } = useStore();

    const handleLogout = () => {
        logout();
        localStorage.removeItem("token");
    };

    return (
        <header className="bg-blue-800 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold">
                        NewsPortal
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-6">
                        <Link to="/" className="hover:text-blue-200">
                            Home
                        </Link>
                        <Link to="/news" className="hover:text-blue-200">
                            News
                        </Link>
                        <Link to="/contact" className="hover:text-blue-200">
                            Contact
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="hover:text-blue-200"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="hover:text-blue-200"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="hover:text-blue-200"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="hover:text-blue-200"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <XMarkIcon className="h-6 w-6" />
                        ) : (
                            <Bars3Icon className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <nav className="md:hidden mt-4 space-y-2 pb-2">
                        <Link
                            to="/"
                            className="block hover:bg-blue-700 p-2 rounded"
                        >
                            Home
                        </Link>
                        <Link
                            to="/news"
                            className="block hover:bg-blue-700 p-2 rounded"
                        >
                            News
                        </Link>
                        <Link
                            to="/contact"
                            className="block hover:bg-blue-700 p-2 rounded"
                        >
                            Contact
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="block hover:bg-blue-700 p-2 rounded"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left hover:bg-blue-700 p-2 rounded"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="block hover:bg-blue-700 p-2 rounded"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="block hover:bg-blue-700 p-2 rounded"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                )}
            </div>
        </header>
    );
}
