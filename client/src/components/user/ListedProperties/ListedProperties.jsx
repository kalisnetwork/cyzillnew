import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlusCircle, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { BASE_URL } from '../../../config';

const ListedProperties = ({ username }) => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        console.log(username);
        const fetchData = async () => {
            const response = await fetch(`${BASE_URL}/api/property/properties/user/${username}`);
            const data = await response.json();
            setProperties(data);
        };

        fetchData();
    }, [username]);


    const handleDelete = async (propertyId) => {
        const response = await fetch(`${BASE_URL}/api/property/properties/${propertyId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setProperties(properties.filter((property) => property._id !== propertyId));
        } else {
        }
    };

    return (
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <h2 className="text-2xl font-semibold mb-4">Listed Properties</h2>
            <div className="mb-4 flex justify-end">
                <Link to="/property-listing" className="flex items-center text-blue-500 hover:text-blue-700">
                    <FiPlusCircle className="mr-1" />
                    Add Property
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
                {properties.map((property) => (
                    <div key={property._id} className="w-72 h-96 border rounded shadow p-4 flex flex-col items-center relative">
                        <img src={property.photos[0]} alt={property.description} className="w-full h-60 object-cover mb-2" />
                        <p className="mb-2 font-semibold">Price: {property.price}</p>
                        <p className="mb-2">Address: {property.location.address}</p>
                        <div className="absolute bottom-2 right-2 flex">
                            <Link to={`/edit-property/${property._id}`} className="mr-2 text-blue-500 hover:text-blue-700">
                                <FiEdit2 />
                            </Link>

                            <button onClick={() => handleDelete(property._id)} className="text-red-500 hover:text-red-700">
                                <FiTrash2 />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListedProperties;
