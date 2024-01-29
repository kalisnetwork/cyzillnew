import React, { useEffect, useState } from "react";
import PropertyCard from '../../property/PropertyCard/PropertyCard';
import Map from '../map/Map';
import Filters from '../filters/Filters';
import { BASE_URL } from "../../../config";
import ContactForm from "./ContactForm";
import { debounce } from 'lodash';
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import PropertyDetails from "../../property/PropertyCard/PropertyDetails";
import { Modal } from "../../../context/Modal";
import WithLoading from "../../common/Loading/WithLoading";

const Homes = () => {
    const [searchParams] = useSearchParams();
    const saleOrRent = searchParams.get('saleOrRent') || 'sell';
    const [selectedProperties, setSelectedProperties] = useState([]);
    const [visibleProperties, setVisibleProperties] = useState([]);
    const [propertyData, setPropertyData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [displayCount, setDisplayCount] = useState(6);
    const [showModal, setShowModal] = useState(false);
    const { propertyId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [filters, setFilters] = useState({
        searchTerm: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        propertyType: '',
        amenities: [],
        saleOrRent: searchParams.get('saleOrRent') || 'sell',
    });
    const [mapIsVisible] = useState(true);

    useEffect(() => {
        setFilters(prevFilters => ({
            ...prevFilters,
            saleOrRent: searchParams.get('saleOrRent') || 'sell',
        }));
    }, [searchParams]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${BASE_URL}/api/property/properties`);
                const data = await response.json();
                console.log('Fetched data:', data);
                setPropertyData(data.properties);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };
        if (!propertyData.length) {
            fetchData();
        }
    }, [propertyData]);

    useEffect(() => {
        const modalTimeout = setTimeout(() => {
            setShowModal(true);
        }, 7000);

        return () => clearTimeout(modalTimeout);
    }, []);

    useEffect(() => {
        if (!propertyData) {
            return;
        }
        if (Array.isArray(propertyData)) {
            const filteredProperties = propertyData.filter(property => {
                return (
                    (!filters.price || (property.price >= filters.price[0] && property.price <= filters.price[1])) &&
                    (!filters.bedrooms ||
                        (filters.bedrooms === 'Any' ? true :
                            filters.bedrooms === '5+' ? property.bedrooms >= 5 :
                                property.bedrooms == filters.bedrooms)) &&
                    (!filters.bathrooms ||
                        (filters.bathrooms === 'Any' ? true :
                            filters.bathrooms === '5+' ? property.bathrooms >= 5 :
                                property.bathrooms == filters.bathrooms)) &&
                    (!filters.propertyType || property.propertyType === filters.propertyType) &&
                    (!filters.amenities.length || filters.amenities.every(amenity => property.amenities.includes(amenity))) &&
                    property.location.address.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
                    (property.forDetails === filters.saleOrRent)
                );
            });

            console.log('Filtered properties:', filteredProperties);

            setVisibleProperties(filteredProperties.slice(0, displayCount));
        }
    }, [filters, propertyData, displayCount, mapIsVisible]);

    const handleFilterChange = (filterName, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
    };

    const handleSearch = (term) => {
        setFilters((prevFilters) => ({ ...prevFilters, searchTerm: term }));
    };

    const handleScroll = debounce((e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) {
            setDisplayCount(prevCount => prevCount + 6);
        }
    }, 300);

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/homes', { replace: true });
    };

    useEffect(() => {
        if (propertyId && propertyData) {
            const property = propertyData.find(p => p._id === propertyId);
            setSelectedProperty(property);
            if (location.state?.showModal) {
                setShowModal(true);
            }
        }
    }, [propertyId, propertyData, location.state]);

    if (!propertyData || propertyData.length === 0) {
        return <div>No properties found.</div>;
    }

    return (
        <div onScroll={handleScroll} style={{ height: '100vh', overflow: 'auto' }}>
            <div className="w-full h-screen flex flex-col">
                <div className="flex items-center justify-start p-2 border border-gray-200">
                    <Filters onSearch={handleSearch} onFilterChange={handleFilterChange} saleOrRent={saleOrRent} />
                </div>
                <div className="flex-grow overflow-auto">
                    <div className="flex flex-row h-full overflow-auto">
                        <div className="w-1/2 h-full overflow-auto lg:block hidden">
                            <Map setSelectedProperties={setSelectedProperties} setVisibleProperties={setVisibleProperties} filters={filters} propertyData={propertyData} visibleProperties={visibleProperties} saleOrRent={saleOrRent} />
                        </div>
                        <div className="w-full lg:w-1/2 h-full overflow-auto p-2">
                            <div className="py-4">
                                <p className="text-lg font-semibold text-gray-700">Real Estate & Homes For Sale</p>
                            </div>
                            {mapIsVisible && visibleProperties.length === 0 && (
                                <div className="no-properties-found-message text-lg"> We couldn't find any property </div>
                            )}
                            <div className="grid lg:grid-cols-2 gap-4 md:grid-cols-3 sm:grid-cols-2 ">
                                {visibleProperties.map(property => (
                                    <div className="property-card" key={property._id}>
                                        <PropertyCard property={property} />
                                    </div>
                                ))}
                            </div>
                            {visibleProperties.length >= propertyData.length && (
                                <div className="all-properties-loaded flex justify-center items-center"> All properties have been loaded. </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showModal && selectedProperty && (
                <ContactForm onClose={() => setShowModal(false)} />
            )}
            {showModal && selectedProperty && (
                <Modal onClose={handleCloseModal}>
                    <PropertyDetails property={selectedProperty} />
                </Modal>
            )}
        </div>
    );
};

export default WithLoading(Homes);