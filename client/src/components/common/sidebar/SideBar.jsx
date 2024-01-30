import React from 'react';
import Logout from '../../auth/Logout/Logout';
import { Link } from 'react-router-dom';
import { IoLogOutOutline, IoHeartOutline, IoListOutline, IoHelpCircleOutline, IoClose } from "react-icons/io5";
import { BsHouseDoor } from "react-icons/bs";
import './sidebar.css';
import { useSelector } from 'react-redux';

const SideBar = ({ isOpen, onClose }) => {
    const { currentUser } = useSelector(state => state.user);

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <IoClose onClick={onClose} className="cursor-pointer" />
            <div className="h-full p-3 space-y-2 w-60">
                <div className="flex items-center p-2 space-x-4">
                    <img src={currentUser?.photo} alt="" className="w-10 h-10 rounded-full dark:bg-gray-500" onError={(e) => { e.target.onerror = null; e.target.src = "default_image_url"; }} />
                    <div>
                        <h2 className="text-md font-semibold">{currentUser?.username}</h2>
                        <span className="flex items-center space-x-1">
                            <Link to={"/profile"} onClick={onClose} className="text-xs hover:underline dark:text-gray-400">View profile</Link>
                        </span>
                    </div>
                </div>
                <div className="divide-y dark:divide-gray-700">
                    <ul className="pt-2 pb-4 space-y-1 text-sm">
                        <li className="dark:bg-gray-800 dark:text-gray-50">
                            <Link to={"/listed-properties"} onClick={onClose} className="flex items-center p-2 space-x-3 rounded-md">
                                <IoListOutline />
                                <span>My Listings</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/wishlist"} onClick={onClose} className="flex items-center p-2 space-x-3 rounded-md">
                                <IoHeartOutline />
                                <span>Wishlist</span>
                            </Link>
                        </li>
                    </ul>
                    <div className="divide-y dark:divide-gray-700">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="dark:bg-gray-800 dark:text-gray-50">
                                <Link to={"/homes"} onClick={onClose} className="flex items-center p-2 space-x-3 rounded-md">
                                    <BsHouseDoor />
                                    <span>Market Place</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <ul className="pt-4 pb-2 space-y-1 text-sm">
                        <li>
                            <Link to="/help" onClick={onClose} className="flex items-center p-2 space-x-3 rounded-md">
                                <IoHelpCircleOutline />
                                <span>Help</span>
                            </Link>
                        </li>
                        <li>
                            <Link className="flex items-center p-2 space-x-3 rounded-md">
                                <IoLogOutOutline />
                                <Logout />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default SideBar