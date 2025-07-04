import React, { useState } from 'react';
import ApartmentCard from './ApartmentCard/ApartmentCard';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Circles } from 'react-loader-spinner';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import './Pagination.css'
const Apartment = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const { isPending, error, data: apartments = [] } = useQuery({
        queryKey: ['apartments'],
        queryFn: async () => {
            const res = await axiosPublic.get('/apartments');
            return res.data;
        }
    });

    // Pagination logic
    const totalPages = Math.ceil(apartments.length / itemsPerPage);
    const pages= [...Array(totalPages).keys()];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentApartments = apartments.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
     
    };

    return (
        <div className='mt-3'>
            {isPending ? (
                <div className='flex justify-center items-center'>
                    <Circles
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="circles-loading"
                        visible={true}
                    />
                </div>
            ) : (
                <>
                    <h2 className="text-3xl text-center mb-4">
                        Total Apartments: {apartments.length}
                    </h2>

                    <div className='w-11/12 lg:w-10/12 mx-auto pt-5'>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {currentApartments.map((apartment) => (
                                <ApartmentCard key={apartment._id} apartment={apartment} />
                            ))}
                        </div>

                        {/* Pagination */} 
                        <div className='pagination my-5'>
                         
                          {pages.map((page, index)=>  <button onClick={()=> handlePageChange (page +1) } className={`btn ${currentPage ===page + 1 && 'selected'}`}  key={index}>{[page + 1]}</button> )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Apartment;