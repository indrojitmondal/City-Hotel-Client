import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ApartmentCard = ({ apartment }) => {

    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [hasApplied, setHasApplied] = useState(false);


    const handleAgreement = async () => {
        if (!user) {
            navigate('/login', { state: { from: location } });
            return;
        }

        const agreementData = {
            apartmentImage: apartment.apartmentImage,
            floorNo: apartment.floorNo,
            blockName: apartment.blockName,
            apartmentNo: apartment.apartmentNo,
            rent: apartment.rent,
            email: user.email,
            userName: user.displayName, // Include user name
            status: 'pending'
        };

        try {
            const res = await axiosSecure.post('/agreement', agreementData);
            console.log(res.data);

            if (res.data.insertedId) {
                Swal.fire({
                    title: `${apartment.apartmentNo} is successfully agreed!`,
                    icon: "success"
                });
            }
        } catch (err) {
            if (err.response?.status === 409) {
                Swal.fire({
                    title: "You have already applied for an apartment",
                    icon: "warning"
                });
            } else {
                Swal.fire({
                    title: "Something went wrong!",
                    text: err.message,
                    icon: "error"
                });
            }
        }
    };
    useEffect(() => {
        const checkExistingAgreement = async () => {
            if (!user) return;

            try {
                const res = await axiosSecure.get(`/agreement/?email=${user.email}`);
                if (res.data.length > 0) {
                    setHasApplied(true);
                }
            } catch (error) {
                console.error("Agreement check failed:", error);
            }
        };

        checkExistingAgreement();
    }, [user, axiosSecure]);
    return (

        <div className="card bg-base-200 shadow-lg rounded-lg ">
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
                    <button
                        onClick={handleAgreement}
                        disabled={hasApplied}
                        className={`btn btn-primary ${hasApplied ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {hasApplied ? "Already Applied" : "Agreement Now"}
                    </button>
                </div>
            </div>
        </div>

    );
};

export default ApartmentCard;
