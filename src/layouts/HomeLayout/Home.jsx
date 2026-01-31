import React from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/hero';
import AboutSection from '../../components/AboutSection';
import HeroSection from '../../components/HeroSection';
import ServicesSection from '../../components/ServicesSection';
import SpecialFlowerCollections from '../../components/SpecialFlowerCollections';
import NaturalFresh from '../../components/NaturalFresh';
import FlowerGallery from '../../components/FlowerGallery';
import Gallery from '../../components/Gallery';

const Home = () => {
    return (
        <div>
            {/* <Navbar></Navbar> */}
            <Hero></Hero>
            {/* <Features></Features> */}
            <AboutSection></AboutSection>
            <HeroSection></HeroSection>
            <ServicesSection></ServicesSection>
            <SpecialFlowerCollections></SpecialFlowerCollections>
            <NaturalFresh></NaturalFresh>
            <FlowerGallery></FlowerGallery>
            
            <Gallery></Gallery>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default Home;