import React, { useEffect, useState } from 'react';
import ApartmentCard from './ApartmentCard/ApartmentCard';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Circles } from 'react-loader-spinner';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';


const Apartment = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { isPending, error, data: apartments=[] } = useQuery({
        queryKey: ['apartments'],
        queryFn: async ()=>{

            const res= await axiosPublic.get('/apartments');
            return res.data;
        }
        
      })
      const {user}= useAuth();

      
      

    
    return (
        <div className='mt-3'>
             
             {isPending?   <div className='flex justify-center items-center'>
                <Circles
               
               height="80"
               width="80"
               color="#4fa94d"
               ariaLabel="circles-loading"
               wrapperStyle={{}}
               wrapperClass=""
               visible={true}
           /> 
                
                </div> : <>
                <h2 className="text-3xl text-center">Total Apartments: {apartments.length}</h2>
             
             <div className='w-11/12 lg:w-10/12 mx-auto pt-5'>
             <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3  '>
              {
                apartments.map((apartment)=><ApartmentCard key={apartment._id}    apartment={apartment}></ApartmentCard>)
              }
            </div>
             </div>
                </> }
                
            
        </div>
    );
};

export default Apartment;