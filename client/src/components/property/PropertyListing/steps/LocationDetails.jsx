import React from 'react';

const LocationDetails = ({ selectedPlace, handleLatitudeChange, handleLongitudeChange, address }) => {
    return (
        <form className="w-full max-w-md">
            <label className="w-full mb-4"> Address:
                <input type="text" value={address} readOnly className="w-full p-2 border border-gray-300 rounded-md " />
            </label>
        </form>
    );
};

export default LocationDetails;
