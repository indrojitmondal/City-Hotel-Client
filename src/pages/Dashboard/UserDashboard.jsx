import React from 'react';
import { NavLink } from 'react-router';
import useAgreement from '../../hooks/useAgreement';


const UserDashboard = () => {
    const [agreement]= useAgreement();
    console.log(agreement);
    
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#2e1a47] to-[#000000] text-white border-l-4 border-[#CEA86E] shadow-xl p-4">
            <ul className="menu rounded-box  bg-[#1f1433] shadow-2xl p-4 space-y-4 border border-[#CEA86E]">
               
               
               
                <>
                
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? "text-xl font-bold text-[#facc15] bg-[#3c2b50] p-2 rounded-lg shadow-inner border border-[#d6bb7a] transition-all duration-300"
                                : "text-xl text-[#d4d4d8] hover:text-[#facc15] hover:bg-[#2d1c3a] p-2 rounded-lg transition-all duration-300"
                        }
                        to={'/dashboard/my-profile'}
                    >
                        🧙‍♂️ My Profile
                    </NavLink>
                </li>
               
                {agreement?.length>0 && <>
                    <li>
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? "text-xl font-bold text-[#facc15] bg-[#3c2b50] p-2 rounded-lg shadow-inner border border-[#d6bb7a] transition-all duration-300"
                                : "text-xl text-[#d4d4d8] hover:text-[#facc15] hover:bg-[#2d1c3a] p-2 rounded-lg transition-all duration-300"
                        }
                        to={'/dashboard/make-payment'}
                    >
                        💰 Make payment
                    </NavLink>
                    </li>
                    <li>
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? "text-xl font-bold text-[#facc15] bg-[#3c2b50] p-2 rounded-lg shadow-inner border border-[#d6bb7a] transition-all duration-300"
                                : "text-xl text-[#d4d4d8] hover:text-[#facc15] hover:bg-[#2d1c3a] p-2 rounded-lg transition-all duration-300"
                        }
                        to={'/dashboard/payment-history'}
                    >
                        🧾 Payment History
                    </NavLink>
                    </li>
                </>}
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? "text-xl font-bold text-[#facc15] bg-[#3c2b50] p-2 rounded-lg shadow-inner border border-[#d6bb7a] transition-all duration-300"
                                : "text-xl text-[#d4d4d8] hover:text-[#facc15] hover:bg-[#2d1c3a] p-2 rounded-lg transition-all duration-300"
                        }
                        to={'/dashboard/announcements'}
                    >
                        📜 Announcements
                    </NavLink>
                </li>
                </>
              
            
               
            </ul>
        </div>
    );
};

export default UserDashboard;
