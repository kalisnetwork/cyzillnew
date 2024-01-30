import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../../../config';

const Payment = ({ formData, saveFormData }) => {
    const { currentUser } = useSelector(state => state.user);
    const username = currentUser?.others?.username || currentUser?.username;
    const photo = currentUser?.photo || currentUser?.others?.photo;
    const phoneNumber = currentUser?.phoneNumber || currentUser?.others?.phoneNumber;
    const [price, setPrice] = useState(formData.price || '');
    const [advanceDeposit, setAdvanceDeposit] = useState(formData.advanceDeposit || '');
    const [maintenanceCharges, setMaintenanceCharges] = useState(formData.maintenanceCharges || '');
    const [excludeStampDuty, setExcludeStampDuty] = useState(formData.excludeStampDuty || false);
    const [priceIncludes, setPriceIncludes] = useState(formData.priceIncludes || '');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const response = await fetch(`${BASE_URL}/api/property/properties`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...formData,
                username: username,
                photo: photo,
                phoneNumber: phoneNumber
            })
        });

        if (response.ok) {
            console.log('Data saved successfully');
            setStatus('Saved Successfully');
            navigate('/listed-properties');
        } else {
            console.error('Error saving data');
            setStatus('Error saving data');
        }
    };

    const handleInputChange = (event, setter) => {
        setter(event.target.value);
        saveFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handlePriceIncludesChange = (e) => {
        setPriceIncludes(e.target.value);
        saveFormData({ ...formData, priceIncludes: e.target.value });
    };

    const handleCheckboxChange = (event) => {
        setExcludeStampDuty(event.target.checked);
        saveFormData({ ...formData, excludeStampDuty: event.target.checked });
    };

    return (
        <div className="flex">
            <div className="w-1/2 p-4">
                <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
                <label className="flex flex-col">
                    Price in INR(₹)
                    <input type="number" name="price" value={price} onChange={(e) => handleInputChange(e, setPrice)} className="mt-1 p-2 border rounded-md" />
                </label>
                <label className="flex flex-col">
                    Advance Deposit
                    <input type="number" name="advanceDeposit" value={advanceDeposit} onChange={(e) => handleInputChange(e, setAdvanceDeposit)} className="mt-1 p-2 border rounded-md" />
                </label>
                <label className="flex flex-col">
                    Price Includes:
                    <select value={priceIncludes} onChange={handlePriceIncludesChange} className="mt-1 p-2 border rounded-md">
                        <option value="">Select...</option>
                        <option value="Fixed">Fixed</option>
                        <option value="Negotiable">Negotiable</option>
                        <option value="Call For Price">Call For Price</option>
                    </select>
                </label>
                <label className="flex flex-col">
                    Maintenance Charges per Month
                    <input type="number" name="maintenanceCharges" value={maintenanceCharges} onChange={(e) => handleInputChange(e, setMaintenanceCharges)} className="mt-1 p-2 border rounded-md" />
                </label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" name="excludeStampDuty" checked={excludeStampDuty} onChange={handleCheckboxChange} className="form-checkbox" />
                    <span>Exclude Stamp Duty and Registration Charges</span>
                </label>
                <p>{status}</p>
                <button onClick={handleSubmit} className="mt-4 p-2 bg-blue-500 text-white rounded-md mx-auto block">
                    Submit
                </button>
            </div>
            <div className="w-1/2 p-4"></div>
        </div>
    );
};

export default Payment;
