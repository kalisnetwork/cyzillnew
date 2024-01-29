import React, { useState, useEffect } from 'react';
import { Select, SelectItem, Textarea } from "@nextui-org/react";

const useInput = (initialValue, key, formData, saveFormData, resetCallback) => {
    const [value, setValue] = useState(formData?.[key] !== undefined ? formData[key] : initialValue);

    useEffect(() => {
        const newValue = formData?.[key] !== undefined ? formData[key] : initialValue;
        if (value !== newValue) {
            setValue(newValue);
        }
    }, [formData, initialValue, key, value]);

    const handleChange = (e) => {
        if (e && e.target) {
            const newValue = e.target.value;
            setValue(newValue);
            if (saveFormData) {
                saveFormData({ ...formData, [key]: newValue });
            }
        }
    };


    const reset = () => {
        setValue(initialValue);
        if (saveFormData) {
            saveFormData({ ...formData, [key]: initialValue });
        }
        if (resetCallback) {
            resetCallback();
        }
    };

    return [value, handleChange, reset];
};

const Description = ({ formData, saveFormData }) => {
    const [description, setDescriptionChange] = useInput('Default description', 'description', formData, saveFormData);
    const [listingManagerType, handlelistingManagerType] = useInput('', 'listingManagerType', formData, saveFormData);
    const [listingTransactionType, handlelistingTransactionType] = useInput('', 'listingTransactionType', formData, saveFormData);
    const [listingType, handlelistingType, resetTotalFlats] = useInput('', 'listingType', formData, saveFormData);
    const [totalFlats, handleTotalFlatsChange] = useInput('', 'totalFlats', formData, saveFormData);
    const [warning, setWarning] = useState('');
    const maxDescriptionLength = 1000;

    const handleDescriptionChange = (e) => {
        if (e && e.target) {
            const inputText = e.target.value;
            const hasFiveDigits = /\d{5}/.test(inputText);
            if (hasFiveDigits) {
                setWarning('*Please do not include any phone numbers or personal information in the description.');
            } else if (inputText.length <= maxDescriptionLength) {
                setDescriptionChange(inputText);
                if (saveFormData) {
                    saveFormData({ ...formData, description: inputText });
                }
                setWarning('');
            }
        }
    };

    useEffect(() => {
        if (listingType !== 'flat' && totalFlats !== '') {
            resetTotalFlats();
        }
    }, [listingType, totalFlats, resetTotalFlats]);



    return (
        <>
            <div className="w-full mx-auto mt-4">
                <h2 className="text-2xl font-semibold mb-4">Description</h2>
                <div className="mx-auto p-10 max-w-2xl">
                    <form className="space-y-4">
                        <div>
                            <Select
                                value={listingManagerType}
                                onChange={handlelistingManagerType}
                                isRequired
                                label="I am"
                                placeholder="Select an option"
                                className="max-w-xs"
                            >
                                <SelectItem value="owner">Owner</SelectItem>
                                <SelectItem value="agent">Agent</SelectItem>
                            </Select>
                        </div>
                        <div>
                            <Select
                                value={listingTransactionType}
                                onChange={handlelistingTransactionType}
                                isRequired
                                label="For Sale / Rent"
                                placeholder="Select an option"
                                className="max-w-xs"
                            >
                                <SelectItem value="sale">Sale</SelectItem>
                                <SelectItem value="rent">Rent</SelectItem>
                            </Select>
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Property Type:</label>
                            <select value={listingType} onChange={handlelistingType} className="w-full border rounded-md px-3 py-2">
                                <option value=""></option>
                                <optgroup label="ALL RESIDENTIAL">
                                    <option value="flat">Flat/Apartment</option>
                                    <option value="residentailhouse">Residential House</option>
                                    <option value="Villa">Villa</option>
                                    <option value="residentialland">Residential Land</option>
                                    <option value="penthouse">Penthouse</option>
                                </optgroup>
                                <optgroup label="ALL COMMERCIAL">
                                    <option value="commercialoffice">Commercial Office Space</option>
                                    <option value="commercialshop">Commercial Shop</option>
                                    <option value="commercialland">Commercial Land</option>
                                    <option value="warehouse">Warehouse/Godown</option>
                                    <option value="industialland">Industrial Land</option>
                                    <option value="industrialbuilding">Industrial Building</option>
                                </optgroup>
                            </select>
                        </div>
                        {listingType === 'flat' && (
                            <div>
                                <label className="block mb-1 font-medium">Total Number of Flats:</label>
                                <select value={totalFlats} onChange={handleTotalFlatsChange} className="w-full border rounded-md px-3 py-2">
                                    <option value=""></option>
                                    <option value="below50">Below 50</option>
                                    <option value="between50and100">Between 50 and 100</option>
                                    <option value="above100">Above 100</option>
                                </select>
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">What makes this place special?</label>
                            <Textarea
                                value={description}
                                onChange={handleDescriptionChange}
                                placeholder="Enter description about the property (max 1000 words)"
                                rows="10"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {description.length}/{maxDescriptionLength}
                            </p>
                            {warning && <p className="text-xs text-red-500 mt-1">{warning}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Description;