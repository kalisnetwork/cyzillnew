import React, { useState } from 'react';
import { ModalProvider, Modal } from '../../../context/Modal';
import './PropertyCard.css';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaRegUser } from 'react-icons/fa';
import PropertyDetails from './PropertyDetails';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property, smallSize, onPropertyClick }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return `${text.substring(0, maxLength)}...`;
        }
        return text;
    };

    const handleImageClick = (imageIndex) => {
        if (smallSize) {
            setShowModal(true);
        } else {
            setActiveImageIndex(imageIndex);
            setSelectedProperty(property);
            navigate(`/property-details/${property._id}`, { state: { showModal: true }, replace: true });
        }
    };


    const handleToggleClick = (direction) => {
        let newIndex = activeImageIndex + direction;
        if (newIndex >= property.photos.length) {
            newIndex = 0;
        } else if (newIndex < 0) {
            newIndex = property.photos.length - 1;
        }
        setActiveImageIndex(newIndex);
    };

    const handleCardClick = (e) => {
        if (!e.target.closest('.toggler-icon')) {
            if (smallSize) {
                onPropertyClick();
            } else {
                setSelectedProperty(property);
                navigate(`/property-details/${property._id}`, { state: { showModal: true } });
            }
        }
    };

    return (
        <ModalProvider>
            <div className="property-card" key={property._id} onClick={handleCardClick}>
                <div className="property-info">
                    <div className="property-image">
                        {property.photos && property.photos.length > 0 ? (
                            <img src={property.photos[activeImageIndex]} alt={`Property ${property._id}`} />
                        ) : (
                            <div className="placeholder">No Image Available</div>
                        )}
                        <div className="toggler-icon left" onClick={() => handleToggleClick(-1)}>
                            <FaChevronLeft />
                        </div>
                        <div className="image-toggler">
                            {property.photos && property.photos.map((photo, index) => (
                                <div key={index} className={`image-toggle ${activeImageIndex === index ? 'active' : ''}`} onClick={() => handleImageClick(index)} />
                            ))}
                        </div>
                        <div className="toggler-icon right" onClick={() => handleToggleClick(1)}>
                            <FaChevronRight />
                        </div>
                    </div>
                    <div className="posted-on-overlay">
                        {moment(new Date(property.createdAt)).fromNow()}
                    </div>
                    <div className="property-details">
                        <div className="listing-details">
                            <div className="price-details">
                                <h2 className="price"> ₹{property.price} </h2>
                            </div>
                        </div>
                        <div className="property-features">
                            <div className="features-list">
                                <div className="feature">
                                    <div className="icon">
                                        <FaBed />
                                    </div>
                                    {property.bedrooms}&emsp;/
                                </div>
                                <div className="features-list">
                                    <div className="icon">
                                        <FaBath />
                                    </div>
                                    {property.bathrooms}&emsp;/
                                </div>
                                <div className="features-list">
                                    <div className="icon">
                                        <FaRulerCombined />
                                    </div>
                                    {property.coveredArea} sqft
                                </div>
                            </div>
                        </div>
                        <div className="location-details">
                            <div className="location-icon">
                                <FaMapMarkerAlt />
                            </div>
                            {truncateText(property.location.address, 30)}
                        </div>
                        <div className="agent-details">
                            <div>
                                <FaRegUser />
                            </div>
                            <div className="agent-name">{property.username}</div>
                        </div>
                    </div>
                </div>
            </div>
            {
                showModal && selectedProperty && (
                    <Modal onClose={() => setShowModal(false)}>
                        <PropertyDetails property={selectedProperty} />
                    </Modal>
                )
            }
        </ModalProvider >
    );
};

export default PropertyCard;
