import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Agreement from '../../../components/Agreement/Agreement';
import { Circles } from 'react-loader-spinner';
import useMember from '../../../hooks/useMember';
import Loader from '../../../components/Loader/Loader';

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isMember, isMemberLoading] = useMember();

    const { isPending, error, data: agreement = [] } = useQuery({
        queryKey: ['agreement'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/agreement?email=${user?.email}`);
            return res.data;
        }
    });

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#1a103d] via-[#301934] to-[#1f1b2e] text-white p-8 font-serif">
            {
                isPending ? 
                <Loader></Loader>
                :
                    <div className="max-w-4xl mx-auto bg-[#2d1c3a] border border-[#c084fc] rounded-2xl shadow-xl p-8 space-y-6">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <img
                                className="w-40 h-40 rounded-full border-4 border-[#d6bb7a] shadow-lg"
                                src={user?.photoURL}
                                alt="Profile"
                            />
                            <div>
                                <h2 className="text-3xl font-bold text-[#facc15]">🧝‍♂️ {user?.displayName}</h2>
                                <h3 className="text-lg text-[#e0f2fe] mt-2">📧 {user?.email}</h3>
                            </div>
                        </div>

                        <div className="mt-6">
                           
                             {isMemberLoading && <Loader></Loader>}
                             
                             <>
                               <h3 className="text-2xl text-[#fcd34d] font-semibold mb-4">📜 Your Agreement</h3>
                            
                            <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#1e1b4b] via-[#3b0764] to-[#111827] text-white font-serif">
                                <div className="max-w-3xl mx-auto bg-[#2a183d] rounded-xl shadow-2xl border border-[#d6bb7a] p-8">
                                    <h2 className="text-2xl font-bold text-[#facc15] mb-4">🧾 Agreement Details</h2>

                                    {isPending ? (
                                        <div className="flex justify-center items-center h-40">
                                            <Circles height="80" width="80" color="#facc15" ariaLabel="loading" />
                                        </div>
                                    ) : agreement[0] ? (
                                        <>
                                            <h3 className="text-lg mb-4">📅 Accept Date: <span className="text-[#eab308]">{agreement[0].acceptDate}</span></h3>
                                            <div className="card bg-[#3e1d4f] border border-[#c084fc] rounded-lg shadow-md hover:shadow-[#facc15]/50 transition duration-300">
                                                <figure className="overflow-hidden rounded-t-lg">
                                                    <img
                                                        className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
                                                        src={agreement[0]?.apartmentImage}
                                                        alt={agreement[0]?.apartmentNo}
                                                    />
                                                </figure>
                                                <div className="card-body p-6">
                                                    <h2 className="text-xl font-semibold text-[#fcd34d]">🏠 Apartment No: {agreement[0]?.apartmentNo}</h2>
                                                    <p className="mt-2">🧱 Floor No: <span className="text-[#e0f2fe]">{agreement[0]?.floorNo}</span></p>
                                                    <p>🏰 Block Name: <span className="text-[#e0f2fe]">{agreement[0]?.blockName}</span></p>
                                                    <p>💰 Rent: <span className="text-[#f87171]">{agreement[0]?.rent} Tk.</span></p>
                                                    <p>🟡 Status: <span className="text-[#e0f2fe]">{agreement[0]?.status} </span></p>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-red-400 mt-4">❌ No agreement found for your account.</p>
                                    )}
                                </div>
                            </div> 
                            </>
                             
                            
                            
                        </div>
                    </div>
            }


        </div>
    );
};

export default MyProfile;