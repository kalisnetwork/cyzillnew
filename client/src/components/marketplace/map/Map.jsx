import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, InfoWindow } from "@react-google-maps/api";
import PropertyCard from '../../property/PropertyCard/PropertyCard';
import { debounce } from 'lodash';
import { OverlayView } from "@react-google-maps/api";
import { BASE_URL } from "../../../config";

const Map = ({ setSelectedProperties, setVisibleProperties, filters, propertyData, visibleProperties }) => {
    const [map, setMap] = useState(null);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [initialCenter] = useState({ lat: 17.422, lng: 78.488 });

    const onMapLoad = useCallback((map) => {
        setMap(map);
    }, []);

    const debouncedOnBoundsChanged = useCallback(
        debounce(() => {
            if (map) {
                const bounds = map.getBounds();
                const visibleProperties = propertyData.filter(property => {
                    return bounds.contains(property.location) &&
                        (filters.saleOrRent === 'sell' ? property.forDetails === 'sell' : property.forDetails === 'rent');
                });
                setSelectedProperties(visibleProperties);
                setVisibleProperties(visibleProperties);
            }
        }, 300),
        [map, propertyData, setSelectedProperties, setVisibleProperties, filters]
    );

    const formatPrice = (price) => {
        if (price >= 10000000) {
            const crore = price / 10000000;
            return `₹ ${crore.toFixed(1)} cr`;
        } else if (price >= 100000) {
            const lakh = price / 100000;
            return `₹ ${lakh.toFixed(1)} lac`;
        } else {
            const thousand = price / 1000;
            return `₹ ${thousand.toFixed(1)} k`;
        }
    };

    return (
        <GoogleMap
            id="map"
            mapContainerStyle={{ height: "100%", width: "100%" }}
            zoom={8}
            center={initialCenter}
            options={{ scrollwheel: true, fullscreenControl: false, gestureHandling: "greedy" }}
            onLoad={onMapLoad}
            onBoundsChanged={debouncedOnBoundsChanged}
        >
            {visibleProperties.map((property, index) => (
                <OverlayView key={index} position={property.location} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                    <div
                        style={{
                            backgroundColor: property.forDetails === 'sell' ? '#A020F0' : '#FF0000',
                            color: '#ffffff',
                            borderRadius: '15px',
                            padding: '5px 10px',
                            width: '60px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                        onClick={() => setSelectedProperty(property)}
                    >
                        {formatPrice(property.price)}
                    </div>
                </OverlayView>
            ))}

            {selectedProperty && (
                <InfoWindow
                    position={selectedProperty.location}
                    onCloseClick={() => setSelectedProperty(null)}
                >
                    <div>
                        <PropertyCard property={selectedProperty} smallSize={true} onPropertyClick={() => setSelectedProperty(selectedProperty)} />
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
};

export default Map;
