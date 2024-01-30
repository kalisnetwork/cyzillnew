import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center h-screen p-4">
            <div className="w-full md:w-1/2 text-center p-4">
                <h1 className="text-6xl text-red-600">404</h1>
                <h2 className="text-4xl mt-2 text-red-600">Page Not Found</h2>
                <p className="mt-2">The page you are looking for might have been removed or is temporarily unavailable.</p>
                <Link to='/' className="mt-5 inline-block bg-blue-500 text-white py-2 px-4 rounded">Go Home</Link>
            </div>
            <div className="w-full md:w-1/2">
                <img src='../../../../lost-home.webp' alt='Lost Home' className="mx-auto w-auto md:w-1/2" />
            </div>
        </div>
    );
};

export default NotFoundPage;
