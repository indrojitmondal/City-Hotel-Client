import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loader from '../../../components/Loader/Loader';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaCheckCircle } from 'react-icons/fa';
import { MdDone } from 'react-icons/md';

const AgreementRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { isPending: isAgreementPending, error, data: agreements = {}, refetch } = useQuery({
        queryKey: ['agreements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/agreement');
            return res.data;
        }
    });

    const handleAccept = async (id, email) => {
        await axiosSecure.patch(`/agreement/${id}`);
        await axiosSecure.patch(`/users/${email}`);
        refetch();
        console.log('Accept ID', id);
    }
    const handleReject = async (id) =>{
        console.log('Reject ID: ', id);
        await axiosSecure.delete(`/agreement/${id}`);
        refetch();

    }


    return (
        <div className="overflow-x-auto p-4 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-950 min-h-screen text-white">
            <h2 className="text-3xl font-bold mb-6 text-center tracking-wider text-indigo-300">
                🧝‍♂️ All Agreement Requests
            </h2>
            {isAgreementPending ?
                <Loader></Loader> :

                <table className="w-full border border-indigo-700 rounded-lg overflow-hidden shadow-lg backdrop-blur-md">
                    <thead className="bg-indigo-800 text-indigo-100">
                        <tr>
                            <th className="py-3 px-4">👤 Name</th>
                            <th className="py-3 px-4">📧 Email</th>
                            <th className="py-3 px-4">🏢 Floor</th>
                            <th className="py-3 px-4">📦 Block</th>
                            <th className="py-3 px-4">🚪 Room</th>
                            <th className="py-3 px-4">💰 Rent</th>
                            <th className="py-3 px-4">📅 Request Date</th>
                            <th className="py-3 px-4">⚙️ Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {agreements?.map((a) => (
                            <tr key={a._id} className="border-t border-indigo-700 hover:bg-indigo-800/40 transition">
                                <td className="py-3 px-4">{a.userName}</td>
                                <td className="py-3 px-4">{a.email}</td>
                                <td className="py-3 px-4">{a.floorNo}</td>
                                <td className="py-3 px-4">{a.blockName}</td>
                                <td className="py-3 px-4">{a.apartmentNo}</td>
                                <td className="py-3 px-4">${a.rent}</td>
                                <td className="py-3 px-4">{a.acceptDate}</td>
                                <td className="py-3 px-4 flex justify-center gap-2">
                                   
                                    <button
                                        onClick={() => handleAccept(a._id, a.email)}
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-full shadow glow-green flex items-center gap-2"
                                    >
                                        {a.status === 'checked' ? (
                                            <>
                                                <FaCheckCircle className="text-white" /> Accepted
                                            </>
                                        ) : (
                                            <>
                                                <MdDone className="text-white" /> Accept
                                            </>
                                        )}
                                    </button>

                                    <button onClick={()=> handleReject(a._id) }
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-full shadow glow-red"
                                    >
                                        ❌ Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
};

export default AgreementRequests;