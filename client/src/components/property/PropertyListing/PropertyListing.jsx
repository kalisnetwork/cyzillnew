import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleMap, StandaloneSearchBox } from '@react-google-maps/api';
import LocationDetails from './LocationDetails';
import { Input } from '@nextui-org/react';
import { SearchIcon } from '@nextui-org/shared-icons';

const Location = ({ formData, saveFormData }) => {
    const [mapPosition, setMapPosition] = useState({
        lat: formData.location?.lat || 17.406498,
        lng: formData.location?.lng || 78.47724389999999,
    });
    const [selectedPlace, setSelectedPlace] = useState(mapPosition);
    const [center, setCenter] = useState(mapPosition);
    const [isSaved, setIsSaved] = useState(false);
    const [address, setAddress] = useState('');
    const mapRef = useRef(null);
    const inputRef = useRef(null);
    const markerRef = useRef(null);
    const searchBoxRef = useRef(null);
    const [searchBox, setSearchBox] = useState(null);

    const onSearchBoxLoad = useCallback((ref) => {
        setSearchBox(ref);
    }, []);

    const onPlacesChanged = () => {
        if (searchBox) {
            const places = searchBox.getPlaces();
            if (places.length === 0) return;

            const place = places[0];
            const newPosition = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            };

            setSelectedPlace(newPosition);
            setMapPosition(newPosition);
            markerRef.current.setPosition(newPosition);
        }
    };


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const newPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                setSelectedPlace(newPosition);
                setMapPosition(newPosition);
                saveFormData((prevFormData) => ({
                    ...prevFormData,
                    location: newPosition,
                }));
                mapRef.current.panTo(newPosition);
                markerRef.current.setPosition(newPosition);
                const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${newPosition.lat},${newPosition.lng}&key=AIzaSyBzE9bz84Bdwy24I5DAjwVhgjijqgrEEdU`);
                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    const address = data.results[0].formatted_address;
                    setAddress(address);
                    saveFormData({
                        ...formData,
                        location: {
                            ...formData.location,
                            address: address,
                        },
                    });
                } else {
                    console.log(data);
                }
            });

        }
    }, []);




    useEffect(() => {
        setIsSaved(false);
    }, [selectedPlace]);

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
        markerRef.current = new window.google.maps.Marker({
            position: selectedPlace,
            map: mapRef.current,
            title: "Selected Location",
            icon: {
                url: 'https://img.icons8.com/color/48/000000/marker.png',
                scaledSize: new window.google.maps.Size(30, 30),
            },
        });
    }, [selectedPlace]);

    const handleLatitudeChange = (e) => {
        const newLat = parseFloat(e.target.value);
        const newPosition = { ...mapPosition, lat: newLat };
        setMapPosition(newPosition);
        setSelectedPlace(newPosition);
    };

    const handleLongitudeChange = (e) => {
        const newLng = parseFloat(e.target.value);
        const newPosition = { ...mapPosition, lng: newLng };
        setMapPosition(newPosition);
        setSelectedPlace(newPosition);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-semibold mb-4">Location Details</h2>
            <input ref={searchBoxRef} type="text" placeholder="Search" />
            <StandaloneSearchBox
                onLoad={onSearchBoxLoad}
                onPlacesChanged={onPlacesChanged}
                ref={searchBoxRef}
            >
                <input
                    type="text"
                    placeholder="Search for a location"
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md "
                />
            </StandaloneSearchBox>
            <div className="w-full h-1/2 mb-4">
                <GoogleMap
                    zoom={10}
                    center={center}
                    onLoad={onMapLoad}
                    onClick={async (e) => {
                        const newPosition = {
                            lat: e.latLng.lat(),
                            lng: e.latLng.lng(),
                        };
                        setSelectedPlace(newPosition);
                        setMapPosition(newPosition);
                        markerRef.current.setPosition(newPosition);

                        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${newPosition.lat},${newPosition.lng}&key=AIzaSyBzE9bz84Bdwy24I5DAjwVhgjijqgrEEdU`);
                        const data = await response.json();

                        if (data.results && data.results.length > 0) {
                            const addressComponents = data.results[0].address_components;
                            const postalCodeComponent = addressComponents.find(component => component.types.includes('postal_code'));
                            const stateComponent = addressComponents.find(component => component.types.includes('administrative_area_level_1'));
                            const cityComponent = addressComponents.find(component => component.types.includes('locality'));
                            const mandalComponent = addressComponents.find(component => component.types.includes('administrative_area_level_2'));
                            const areaNameComponent = addressComponents.find(component => component.types.includes('sublocality_level_1'));

                            const postalCode = postalCodeComponent ? postalCodeComponent.long_name : '';
                            const state = stateComponent ? stateComponent.long_name : '';
                            const city = cityComponent ? cityComponent.long_name : '';
                            const mandal = mandalComponent ? mandalComponent.long_name : '';
                            const areaName = areaNameComponent ? areaNameComponent.long_name : '';

                            const newFormData = {
                                ...formData,
                                location: {
                                    ...formData.location,
                                    lat: newPosition.lat,
                                    lng: newPosition.lng,
                                    address: address,
                                    postalCode: postalCode,
                                    state: state,
                                    city: city,
                                    mandal: mandal,
                                    areaName: areaName,
                                },
                            };
                            saveFormData(newFormData);
                            console.log(newFormData);
                        } else {
                            console.log(data);
                        }
                    }}

                    mapContainerStyle={{ height: '100%', width: '100%' }}
                    options={{ scrollwheel: true, fullscreenControl: false, mapTypeControl: true, disableDefaultUI: true, clickableIcons: false }}
                />
            </div>
            <LocationDetails selectedPlace={selectedPlace} handleLatitudeChange={handleLatitudeChange} handleLongitudeChange={handleLongitudeChange} address={address} />
        </div>
    );
};

export default Location;
