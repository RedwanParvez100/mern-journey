import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">NewsPortal</h3>
                        <p className="text-gray-400">
                            Your trusted source for the latest news and updates
                            from around the world.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/news"
                                    className="text-gray-400 hover:text-white"
                                >
                                    News
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">
                            Contact Us
                        </h4>
                        <address className="text-gray-400 not-italic">
                            <p>123 News Street</p>
                            <p>Media City, MC 12345</p>
                            <p>Email: info@newsportal.com</p>
                            <p>Phone: (123) 456-7890</p>
                        </address>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
                    <p>
                        &copy; {new Date().getFullYear()} NewsPortal. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
