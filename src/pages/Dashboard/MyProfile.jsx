import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { isPending, error, data: agreement = {} } = useQuery({
        queryKey: ['agreement'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/agreement?email=${user?.email}`);
            return res.data;
        }
    });

    console.log(agreement);


    return (
        <div className='p-5'>

            <div>

                <img className='w-80' src={user?.photoURL} alt="url" />
                <h2>Name:  {user?.displayName}</h2>
                <h2>Email:  {user?.email}</h2>
                {agreement[0] &&
                <div>
                    <h2>Agreement accept date:  {agreement[0]?.acceptDate}</h2>
                    <h2>Rented apartment info : </h2>
                    <div className="card bg-base-200 shadow-lg rounded-lg ">
                        <figure>
                            <img
                                className='w-full  object-cover'
                                src={agreement[0]?.apartmentImage}
                                alt={agreement[0]?.apartmentNo} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Apartment No: {agreement[0]?.apartmentNo}</h2>
                            <h4 className='text-lg'>Floor No: {agreement[0]?.floorNo}</h4>
                            <h4 className='text-lg'>Block Name: {agreement[0]?.blockName}</h4>
                            <h4 className='text-lg'>Rent: {agreement[0]?.rent}Tk.</h4>

                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    );
};

export default MyProfile;