
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import logo from '/logo.png'
import useAuth from '../../../hooks/useAuth';
import useAdmin from '../../../hooks/useAdmin';
const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  console.log(user);
  const [isAdmin]= useAdmin();
  console.log(user?.photoURL);
  const location = useLocation();

  if (loading) {
    console.log('Loading');
  }

  const [image, setImage] = useState('https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp')

  useEffect(() => {
    setImage(user?.photoURL);
  }, [user, loading, user?.photoURL])

  if (user?.photoURL === "") {
    console.log("Photo URL is an empty string!");
  }
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate('/');
      })
  }
  return (
    <div className="relative bg-gradient-to-b from-[#2e1a47] to-[#0E151F]  text-white flex justify-between px-5 py-2 items-center">
      <img className='w-20 h-20 md:w-40 md:h-30' src={logo} alt="" />

      <div

        className="absolute left-1/2 transform -translate-x-1/2 flex gap-4 text-lg md:text-2xl "
      >
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
        
        <NavLink to="/apartment">Apartment</NavLink>
      </div>

      <div>
        {!user && <NavLink to="/login" className={({ isActive }) => isActive ? "active text-2xl" : "text-2xl"}>Login</NavLink>}
      </div>

      {user && (
        <div className=" dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn  w-20 h-20 btn-ghost btn-circle avatar ">
            <div className="w-full overflow-hidden  rounded-full">
              {/* Add these console logs here */}
              {console.log("Inside user block - user:", user)}
              {console.log("Inside user block - user.photoURL:", user.photoURL)}
              {console.log("Inside user block - typeof user.photoURL:", typeof user.photoURL)}
              {console.log("Inside user block - user.photoURL === '' :", user.photoURL === '')}
              {console.log("Inside user block - user.photoURL?.length:", user.photoURL?.length)}

              <img
                alt="User Avatar"
                className='w-full h-full object-cover'
                src={image}
              />

            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu  dropdown-content -mr-5 bg-gradient-to-b from-[#2e1a47] to-[#0E151F]  text-lg rounded-box z-1  w-52 p-2 shadow"
          >
            <li>

              <Link to={'/'}>{user?.displayName} </Link>
          
            </li>
            {!isAdmin &&
            <li>  <NavLink to="/dashboard/my-profile" className={({ isActive }) => isActive ? "active" : ""}>Dashboard</NavLink>
        </li>
        }
        { isAdmin&&
        <li>  <NavLink to="/dashboard/admin-profile" className={({ isActive }) => isActive ? "active" : ""}>Dashboard</NavLink>
        </li>
        }
            <li> <button onClick={handleLogout} className='btn'>Logout</button> </li>
          </ul>
        </div>
      )}

    </div>

  );
};

export default Navbar;
