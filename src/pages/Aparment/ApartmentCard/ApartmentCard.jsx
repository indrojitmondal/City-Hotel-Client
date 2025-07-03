import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';

const ApartmentCard = ({ apartment }) => {
    
    const {user, logOut}= useAuth();
    const navigate= useNavigate();
    const location = useLocation();
    const handleAgreement= ()=>{
         if(!user){

               
               
                    navigate('/login', {state: {from: location}});
               
                
            }
                
    }
    return (

        <div className="card bg-base-200 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
        <figure>
          <img 
            className='w-full h-80 object-cover'
            src={apartment.apartmentImage}
            alt={apartment.apartmentNo} />
        </figure>
        <div className="card-body">
          <h2 className="card-title"> Apartment No: {apartment.apartmentNo}</h2>
          <h4 className='text-lg'>Floor No: {apartment.floorNo} </h4>
          <h4 className='text-lg'>Block Name: {apartment.blockName} </h4>
          <h4 className='text-lg'>Rent: {apartment.rent}Tk. </h4>
          <div className="card-actions justify-center">
            <button onClick={handleAgreement} className="btn btn-primary">Agreement Now</button>
          </div>
        </div>
      </div>

    );
};

export default ApartmentCard;
