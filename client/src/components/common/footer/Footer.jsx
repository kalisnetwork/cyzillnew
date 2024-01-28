import React from 'react';
import { Link } from 'react-router-dom';
// import { FaFacebook, FaDiscord, FaTwitter, FaGithub, FaDribbble } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900">
            <div className="mx-auto w-full max-w-screen-xl p-4">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link to="/">
                            <img className="image mr-4" src={"/logo.png"} alt="Logo" width={50} height={50} />
                        </Link>
                        <div className="max-w-screen-lg mx-auto">
                            <p className="text-base text-gray-500 dark:text-gray-400">
                                Elevating your living experience with curated real estate and rental solutions.<br />
                                Redefine your home—a haven where comfort, style, and dreams seamlessly intertwine.<br />
                                Your extraordinary living journey begins here.
                            </p>
                        </div>

                    </div>
                    <div className="grid grid-cols-3 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Explore </h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link to="/homes?saleOrRent=sell" className="hover:underline">Buy a Property</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/homes?saleOrRent=rent" className="hover:underline">Rent a Property</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/help" className="hover:underline">FAQ's</Link>
                                </li>
                            </ul>
                        </div>
                        {/* <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link to="https://github.com/themesberg/flowbite" className="hover:underline">
                                        <FaGithub className="inline-block mr-2" /> Github
                                    </Link>
                                </li>
                                <li>
                                    <Link to="https://discord.gg/4eeurUVvTy" className="hover:underline">
                                        <FaDiscord className="inline-block mr-2" /> Discord
                                    </Link>
                                </li>
                            </ul>
                        </div> */}
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link to="/terms-and-conditions" className="hover:underline">Terms &amp; Conditions</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © 2023 <Link to="/" className="hover:underline">Cyzill™</Link>. All Rights Reserved.
                    </span>
                    {/* <div className="flex mt-4 sm:justify-center sm:mt-0">
                        <Link to="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <FaFacebook className="w-4 h-4" />
                            <span className="sr-only">Facebook page</span>
                        </Link>
                        <Link to="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <FaTwitter className="w-4 h-4" />
                            <span className="sr-only">Twitter page</span>
                        </Link>
                        <Link to="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <FaDiscord className="w-4 h-4" />
                            <span className="sr-only">Discord community</span>
                        </Link>
                        <Link to="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <FaGithub className="w-4 h-4" />
                            <span className="sr-only">GitHub account</span>
                        </Link>
                        <Link to="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                            <FaDribbble className="w-4 h-4" />
                            <span className="sr-only">Dribbble account</span>
                        </Link>
                    </div> */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
