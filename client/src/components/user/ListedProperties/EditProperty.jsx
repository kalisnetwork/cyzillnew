import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../../config';

const EditProperty = ({ propertyId }) => {
    const [property, setProperty] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${BASE_URL}/api/property/properties/${propertyId}`);
            const data = await response.json();
            setProperty(data);
        };

        fetchData();
    }, [propertyId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`${BASE_URL}/api/property/properties/${propertyId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(property),
        });

        if (response.ok) {
            // Handle successful update
            alert('Property updated successfully!');
        } else {
            // Handle error

        }
    };

    if (!property) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* Add form fields for property details here */}
            <button type="submit">Update Property</button>
        </form>
    );
};

export default EditProperty;
