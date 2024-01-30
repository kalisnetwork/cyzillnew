import React from 'react';
import './Hero.css';
import RentProperties from './RentProperties/RentProperties';

const Hero = () => {
    return (
        <>
            <div className="hero-container">
                <div className="background-video w-full">
                    <video loop autoPlay muted className='w-full h-auto cover-full'>
                        <source src="/hero-section.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <RentProperties />
            </div>
        </>
    );
};

export default Hero;
