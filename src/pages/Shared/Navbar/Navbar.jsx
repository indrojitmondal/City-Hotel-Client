import React from 'react';
import { Link, useNavigate } from 'react-router';
import logo from '../../../assets/logo.png'
import useAuth from '../../../hooks/useAuth';
const Navbar = () => {
     const {user, logOut}= useAuth();
     console.log(user); 
     const navigate = useNavigate();
     const handleLogout = ()=>{
         logOut()
         .then(()=>{
            navigate('/');
         })
     }
    return (
        <div className="relative bg-[#0E151F] text-white flex justify-between px-5 py-2 items-center">
      <img className='w-30 h-20' src={logo} alt="" />

  <div
    
    className="absolute left-1/2 transform -translate-x-1/2 flex gap-4 text-xl"
  >
    <Link to="/">Home</Link>
    <Link to="/">Apartment</Link>
  </div>

  <div>
    {!user && <Link className='text-lg' to="/login">Login</Link>}
  </div>

  {user && (
    <div className=" dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ">
        <div className="w-30   rounded-full">
          <img 
            className=''
            alt="User Avatar"
            src={user.photoURL}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-[#0E151F]  rounded-box z-1 mt-3 w-52 p-2 shadow"
      >
        <li>
          <h2>{user?.displayName}</h2>
        </li>
        <li><a>Dashboard</a></li>
        <li> <button onClick={handleLogout} className='btn'>Logout</button> </li>
      </ul>
    </div>
  )}

</div>

    );
};

export default Navbar;