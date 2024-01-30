import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MdMyLocation } from 'react-icons/md';
import { FaChevronDown } from 'react-icons/fa';
import SortFilter from './SortFilter';
import SearchBar from '../../SearchBar/SearchBar';

const Filters = ({ onSearch, onFilterChange }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isDropdownOpen, setDropdownOpen] = useState(false)

    const initialFilters = {
        searchTerm: searchParams.get('searchTerm') || '',
        price: searchParams.get('price') || [10000, 20000, 50000],
        bedrooms: searchParams.get('bedrooms') || 'Any',
        bathrooms: searchParams.get('bathrooms') || 'Any',
        propertyType: searchParams.get('propertyType') || '',
        amenities: searchParams.getAll('amenities') || [],
        saleOrRent: searchParams.get('saleOrRent') || '',
    };
    const [filters, setFilters] = useState(initialFilters);

    const handleSaleOrRentChange = (value) => {
        handleFilterChange('saleOrRent', value);
        updateSearchParams('saleOrRent', value);
    };


    useEffect(() => {
        const queryParams = Object.fromEntries(searchParams.entries());
        setFilters({
            searchTerm: queryParams.searchTerm || '',
            price: [
                parseInt(queryParams.minPrice, 10) || 0,
                parseInt(queryParams.maxPrice, 10) || 1000000,
            ],
            bedrooms: queryParams.bedrooms || 'Any',
            bathrooms: queryParams.bathrooms || 'Any',
            propertyType: queryParams.propertyType || '',
            amenities: queryParams.amenities ? queryParams.amenities.split(',') : [],
            saleOrRent: queryParams.saleOrRent || 'sell',
        });
    }, [searchParams]);

    const updateSearchParams = (name, value) => {
        const params = new URLSearchParams(searchParams);
        params.set(name, value);
        navigate({ search: params.toString() });
    };

    const handleFilterChange = (name, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
        onFilterChange(name, value);
        updateSearchParams(name, value);
    };

    const handleSearchChange = (term) => {
        updateSearchParams('searchTerm', term);
    };

    const handleBedroomChange = (event) => {
        const { name, value } = event.target;
        handleFilterChange(name, value);
    };

    const handleBathroomChange = (event) => {
        const { name, value } = event.target;
        handleFilterChange(name, value);
    };

    const handlePropertyTypeChange = (event) => {
        const { name, value } = event.target;
        handleFilterChange(name, value);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handlePriceChange = (minOrMax, value) => {
        const newPrice = [...filters.price];
        newPrice[minOrMax === 'minimum' ? 0 : 1] = value;
        handleFilterChange('price', newPrice);
    };

    const handleCurrentLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const newPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                onSearch(newPosition);
            });
        }
    };

    useEffect(() => {
        console.log('Filters:', filters);
    }, [filters]);

    return (
        <div className='flex items-center justify-center gap-4'>
            <div className=" flex items-center">
                <SearchBar />
                <button onClick={handleCurrentLocationClick} className="ml-2 p-2 bg-blue-500 text-white rounded">
                    <MdMyLocation />
                </button>
            </div>
            <div className="relative inline-block text-left">
                <button onClick={toggleDropdown} className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none">
                    Price
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                {isDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-2 px-4 w-full" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
                            <span className="font-medium block mb-2">Price Range</span>
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label htmlFor="minimum">Minimum:</label>
                                    <select name="minimum" id="minimum" className="w-full py-1 px-2 border border-gray-300 rounded-md" value={filters.price[0]} onChange={(e) => handlePriceChange('minimum', e.target.value)}>
                                        <option value="1000">1000</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </div>
                                <div className="w-1/2">
                                    <label htmlFor="maximum">Maximum:</label>
                                    <select name="maximum" id="maximum" className="w-full py-1 px-2 border border-gray-300 rounded-md" value={filters.price[1]} onChange={(e) => handlePriceChange('maximum', e.target.value)}>
                                        <option value="5000">5000</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="filter inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none">
                <label htmlFor="bedrooms" >Beds:</label>
                <select id="bedrooms" name="bedrooms" value={filters.bedrooms} onChange={handleBedroomChange}>
                    <option value="Any">Any</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="5+">5+</option>
                </select>
            </div>
            <div className="filter">
                <label htmlFor="bathrooms">Baths:</label>
                <select id="bathrooms" name="bathrooms" value={filters.bathrooms} onChange={handleBathroomChange}>
                    <option value="Any">Any</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="5+">5+</option>
                </select>
            </div>
            <SortFilter />
            <div className="filter">
                <label htmlFor="propertyType">Property Type:</label>
                <select id="propertyType" name="propertyType" value={filters.propertyType} onChange={handlePropertyTypeChange}>
                    <option value="">Any</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="condo">Condo</option>
                </select>
            </div>
        </div>
    );
};

export default Filters;
