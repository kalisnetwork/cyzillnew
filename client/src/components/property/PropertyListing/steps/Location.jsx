import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleMap } from '@react-google-maps/api';

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
                // Get the address from the latitude and longitude
                const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${newPosition.lat},${newPosition.lng}&key=AIzaSyBzE9bz84Bdwy24I5DAjwVhgjijqgrEEdU`);
                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    const address = data.results[0].formatted_address;
                    setAddress(address);
                    // Update the form data with the address
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
            <input ref={inputRef} type="text" placeholder="Search for a location" className="w-full p-2 mb-4 border border-gray-300 rounded-md " />
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

                        const newFormData = {
                            ...formData,
                            location: newPosition,
                        };
                        saveFormData(newFormData);
                        console.log(newFormData);
                        markerRef.current.setPosition(newPosition);
                        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${newPosition.lat},${newPosition.lng}&key=AIzaSyBzE9bz84Bdwy24I5DAjwVhgjijqgrEEdU`);
                        const data = await response.json();
                        if (data.results && data.results.length > 0) {
                            const address = data.results[0].formatted_address;
                            setAddress(address);

                            saveFormData({
                                ...newFormData,
                                location: {
                                    ...newFormData.location,
                                    address: address,
                                },
                            });
                        } else {
                            console.log(data);
                        }
                    }}
                    mapContainerStyle={{ height: '100%', width: '100%' }}
                    options={{ scrollwheel: true, fullscreenControl: false, mapTypeControl: true, disableDefaultUI: true, clickableIcons: false }}
                />
            </div>
            <form className="w-full max-w-md">
                <div className="flex mb-4">
                    <label className="w-1/2 mr-2">
                        Latitude:
                        <input type="number" value={selectedPlace.lat} onChange={handleLatitudeChange} placeholder="Latitude" className="w-full p-2 border border-gray-300 rounded-md " />
                    </label>
                    <label className="w-1/2">
                        Longitude:
                        <input type="number" value={selectedPlace.lng} onChange={handleLongitudeChange} placeholder="Longitude" className="w-full p-2 border border-gray-300 rounded-md " />
                    </label>
                </div>
                <label className="w-full mb-4">
                    Address:
                    <input type="text" value={address} readOnly className="w-full p-2 border border-gray-300 rounded-md " />
                </label>
            </form>
        </div>
    );
};

export default Location;
