import React from 'react';
import Banner from '../../components/Banner/Banner';
import About from './About';
import CouponSection from './CouponSection';
import LocationSection from './LocationSection';


const Home = () => {
    return (
        <div>
              <Banner></Banner>
              <About></About>
              <CouponSection></CouponSection>
              <LocationSection></LocationSection>
              
        </div>
    );
};

export default Home;