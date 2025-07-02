import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import logo from '../../../assets/logo.png'
import useAuth from '../../../hooks/useAuth';
const Navbar = () => {
     const {user, logOut}= useAuth();
     console.log(user); 
     console.log(user?.photoURL);
     const navigate = useNavigate();
     const handleLogout = ()=>{
         logOut()
         .then(()=>{
            navigate('/');
         })
     }
    return (
        <div className="relative bg-[#0E151F] text-white flex justify-between px-5 py-2 items-center">
      <img className='w-40 h-30' src={logo} alt="" />

  <div
    
    className="absolute left-1/2 transform -translate-x-1/2 flex gap-4 text-2xl "
  >
    <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
    <NavLink to="/apartment">Apartment</NavLink>
  </div>

  <div>
    {!user && <Link className='text-2xl' to="/login">Login</Link>}
  </div>

  {user && (
    <div className=" dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn  w-20 h-20 btn-ghost btn-circle avatar ">
        <div className="w-full   rounded-full">
          <img 
            className=''
            alt="User Avatar"
            src={user.photoURL}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu  dropdown-content -mr-5 bg-[#0E151F] text-lg rounded-box z-1  w-52 p-2 shadow"
      >
        <li>
         
          <Link to={'/'}>{user?.displayName} </Link>
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