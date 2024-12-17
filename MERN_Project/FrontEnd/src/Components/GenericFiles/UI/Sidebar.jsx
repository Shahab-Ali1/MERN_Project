import React from "react";
import { Link, useLocation } from "react-router"; // Updated import for `useLocation`

const Sidebar = () => {
    const location = useLocation(); // Get the current URL

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="bg-white shadow-md hidden sm:block" style={{width: "100%"}}>
                <nav className="mt-4">
                    <ul>
                        {/* Home */}
                        <li className={`p-3 border-b transition duration-300 ${(location.pathname === "/" || location.pathname === "/home") ? "bg-orange-700 text-white" : "hover:bg-orange-300 hover:text-gray-800"}`}>
                            <Link
                                to="/"
                                className={`flex items-center space-x-2 ${
                                    (location.pathname === "/" || location.pathname === "/home")
                                        ? "text-white"
                                        : ""
                                } focus:outline-none`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 10h11M9 21V10M12 3H4a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2h-8z"
                                    />
                                </svg>
                                <span>Home</span>
                            </Link>
                        </li>

                        {/* Category */}
                        <li className={`p-3 border-b transition duration-300 ${location.pathname === "/category"? "bg-orange-700 text-white" : "hover:bg-orange-300 hover:text-gray-800"}`}>
                            <Link
                                to="/category"
                                className={`flex items-center space-x-2 ${
                                    location.pathname === "/category"
                                        ? "text-white"
                                        : ""
                                } focus:outline-none`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 10h11M9 21V10M12 3H4a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2h-8z"
                                    />
                                </svg>
                                <span>Category</span>
                            </Link>
                        </li>

                        {/* Contact */}
                        <li className={`p-3 border-b transition duration-300 ${location.pathname === "/contact" ? "bg-orange-700 text-white" : "hover:bg-orange-300 hover:text-gray-800"}`}>
                            <Link
                                to="/contact"
                                className={`flex items-center space-x-2 ${
                                    location.pathname === "/contact"
                                        ? "text-white"
                                        : ""
                                } focus:outline-none`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8c2.28 0 4-1.72 4-4S14.28 0 12 0C9.72 0 8 1.72 8 4s1.72 4 4 4zm0 2c-4.418 0-8 3.134-8 7v1h16v-1c0-3.866-3.582-7-8-7zm4 9H8c-1.11 0-2 .9-2 2v1h12v-1c0-1.1-.89-2-2-2z"
                                    />
                                </svg>
                                <span>Contact</span>
                            </Link>
                        </li>

                        {/* About */}
                        <li className={`p-3 border-b transition duration-300 ${location.pathname === "/about" ? "bg-orange-700 text-white" : "hover:bg-orange-300 hover:text-gray-800"}`}>
                            <Link
                                to="/about"
                                className={`flex items-center space-x-2 ${
                                    location.pathname === "/about"
                                        ? "text-white"
                                        : ""
                                } focus:outline-none`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 20l-5.447-2.724C2.463 16.943 2 16.218 2 15.447V8.553c0-.771.463-1.496 1.553-1.829L9 4l5.447 2.724C15.537 7.057 16 7.782 16 8.553v6.894c0 .771-.463 1.496-1.553 1.829L9 20z"
                                    />
                                </svg>
                                <span>About</span>
                            </Link>
                        </li>

                    </ul>
                </nav>
            </aside>
        </div>
    );
};

export default Sidebar;
