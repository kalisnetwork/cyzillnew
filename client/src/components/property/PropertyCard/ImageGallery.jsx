import React from 'react';
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const ImageGallery = ({ images, activeImage, setActiveImage, setShowGallery }) => {
    const handleImageClick = (index) => {
        setActiveImage(index);
    };

    const handleCloseGallery = () => {
        setShowGallery(false);
    };

    const handlePrevImage = () => {
        const prevIndex = (activeImage - 1 + images.length) % images.length;
        setActiveImage(prevIndex);
    };

    const handleNextImage = () => {
        const nextIndex = (activeImage + 1) % images.length;
        setActiveImage(nextIndex);
    };

    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black">
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <div className=" rounded-lg h-full w-full max-w-screen-lg flex flex-col relative">
                    <div className="absolute top-0 right-0 p-2">
                        <AiOutlineClose className="cursor-pointer text-4xl text-white hover:bg-red-600" onClick={handleCloseGallery} />
                    </div>
                    <div className="flex justify-center items-center flex-1 overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src={images[activeImage]}
                            alt={`Image ${activeImage + 1}`}
                        />
                    </div>
                    <div className="flex justify-between items-center absolute bottom-1/2 w-full">
                        <button onClick={handlePrevImage} className="text-white"><AiOutlineLeft className="text-3xl" /></button>
                        <button onClick={handleNextImage} className="text-white"><AiOutlineRight className="text-3xl" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;
