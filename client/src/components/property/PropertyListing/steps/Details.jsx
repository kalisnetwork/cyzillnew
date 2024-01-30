import React, { useEffect, useState } from 'react';

const Details = ({ formData, saveFormData }) => {
    const [bedrooms, setBedrooms] = useState(formData.bedrooms || '');
    const [bathrooms, setBathrooms] = useState(formData.bathrooms || '');
    const [coveredArea, setCoveredArea] = useState(formData.coveredArea || '');
    const [carpetArea, setCarpetArea] = useState(formData.carpetArea || '');
    const [constructionYear, setConstructionYear] = useState(formData.constructionYear || '');
    const [totalFloors, setTotalFloors] = useState(formData.totalFloors || '');
    const [floorNumber, setFloorNumber] = useState(formData.floorNumber || '');
    const [furnishedStatus, setFurnishedStatus] = useState(formData.furnishedStatus || '');
    const [amenities, setAmenities] = useState(formData.amenities || []);

    useEffect(() => {
        setBedrooms(formData.bedrooms || '');
        setBathrooms(formData.bathrooms || '');
        setCoveredArea(formData.coveredArea || '');
        setCarpetArea(formData.carpetArea || '');
        setConstructionYear(formData.constructionYear || '');
        setTotalFloors(formData.totalFloors || '');
        setFurnishedStatus(formData.furnishedStatus || '');
        setAmenities(formData.amenities || []);
    }, [formData]);


    const handleFurnishedStatusChange = (e) => {
        saveFormData({ ...formData, furnishedStatus: e.target.value });
    };

    const handleAmenityChange = (e) => {
        const { checked, value } = e.target;
        const newAmenities = checked ? [...amenities, value] : amenities.filter((amenity) => amenity !== value);
        setAmenities(newAmenities);
        saveFormData({ ...formData, amenities: newAmenities });
    };

    const handleTotalFloorsChange = (e) => {
        saveFormData({ ...formData, totalFloors: e.target.value });
    };
    const handleFloorNumberChange = (e) => {
        saveFormData({ ...formData, floorNumber: e.target.value });
    };

    const handleBedroomsChange = (e) => {
        saveFormData({ ...formData, bedrooms: e.target.value });
    };

    const handleBathroomsChange = (e) => {
        saveFormData({ ...formData, bathrooms: e.target.value });
    };

    const handleCoveredAreaChange = (e) => {
        saveFormData({ ...formData, coveredArea: e.target.value });
    };

    const handleCarpetAreaChange = (e) => {
        saveFormData({ ...formData, carpetArea: e.target.value });
    };

    const handleConstructionYearChange = (e) => {
        saveFormData({ ...formData, constructionYear: e.target.value });
    };

    return (
        <div className="mx-auto p-10 grid grid-cols-2 gap-6">
            <div>
                <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Bedrooms</label>
                    <input
                        type="number"
                        value={formData.bedrooms || ''}
                        onChange={handleBedroomsChange}
                        className="w-full border rounded-md px-3 py-2"
                        placeholder="Enter number of bedrooms"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Bathrooms</label>
                    <input
                        type="number"
                        value={formData.bathrooms || ''}
                        onChange={handleBathroomsChange}
                        className="w-full border rounded-md px-3 py-2"
                        placeholder="Enter number of bathrooms"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Total Floors</label>
                    <input type="number" value={formData.totalFloors || ''} onChange={handleTotalFloorsChange} className="w-full border rounded-md px-3 py-2" placeholder="Enter total number of floors" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Floor Number</label>
                    <input
                        type="number"
                        value={formData.floorNumber || ''}
                        onChange={handleFloorNumberChange}
                        className="w-full border rounded-md px-3 py-2"
                        placeholder="Enter floor number"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Furnished Status</label>
                    <select value={furnishedStatus} onChange={handleFurnishedStatusChange} className='w-full border rounded-md px-3 py-2'>
                        <option value="">Select...</option>
                        <option value="Furnished">Furnished</option>
                        <option value="Semi-Furnished">Semi-Furnished</option>
                        <option value="Unfurnished">Unfurnished</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Covered Area (Sq.Ft)</label>
                    <input
                        type="number"
                        value={formData.coveredArea || ''}
                        onChange={handleCoveredAreaChange}
                        className="w-full border rounded-md px-3 py-2"
                        placeholder="Enter covered area"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Carpet Area (Sq.Ft)</label>
                    <input
                        type="number"
                        value={formData.carpetArea || ''}
                        onChange={handleCarpetAreaChange}
                        className="w-full border rounded-md px-3 py-2"
                        placeholder="Enter carpet area"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Year of Construction</label>
                    <input
                        type="number"
                        value={formData.constructionYear || ''}
                        onChange={handleConstructionYearChange}
                        className="w-full border rounded-md px-3 py-2"
                        placeholder="Enter construction year"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Amenities</label>
                    <div className="grid grid-cols-3 gap-2">
                        <label>
                            <input
                                type="checkbox"
                                value="Water"
                                checked={amenities.includes('Water')}
                                onChange={handleAmenityChange}
                                className="form-checkbox"
                            />
                            <span className="ml-2">Water</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Parking"
                                checked={amenities.includes('Parking')}
                                onChange={handleAmenityChange}
                                className="form-checkbox"
                            />
                            <span className="ml-2">Parking</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Pool"
                                checked={amenities.includes('Pool')}
                                onChange={handleAmenityChange}
                                className="form-checkbox"
                            />
                            <span className="ml-2">Pool</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Gym"
                                checked={amenities.includes('Gym')}
                                onChange={handleAmenityChange}
                                className="form-checkbox"
                            />
                            <span className="ml-2">Gym</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Wifi"
                                checked={amenities.includes('Wifi')}
                                onChange={handleAmenityChange}
                                className="form-checkbox"
                            />
                            <span className="ml-2">Wifi</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Security"
                                checked={amenities.includes('Security')}
                                onChange={handleAmenityChange}
                                className="form-checkbox"
                            />
                            <span className="ml-2">Security</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Lift"
                                checked={amenities.includes('Lift')}
                                onChange={handleAmenityChange}
                                className="form-checkbox"
                            />
                            <span className="ml-2">Lift</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="PowerBackup"
                                checked={amenities.includes('PowerBackup')}
                                onChange={handleAmenityChange}
                                className="form-checkbox"
                            />
                            <span className="ml-2">Power Backup</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
