import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <>
            <div className="hero-container">
                <div
                    className="background-image"
                    style={{
                        backgroundImage: `url(/assets/images/hero.png)`
                    }}
                >
                    <div className="content-container">
                        <h1 className="title">Find Your Dream Home</h1>
                        <p className="subtitle">Search for properties that match your criteria.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
