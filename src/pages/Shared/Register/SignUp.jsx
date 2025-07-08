import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import logo from '../../../assets/logo.png'
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Lottie from 'lottie-react';
import registerLottieAnimation from './registerLottifie.json'

import toast from 'react-hot-toast';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
const image_hosting_key=import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const SignUp = () => {
    const navigate= useNavigate();
    const [signUpError, setSignUpError]= useState('');
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm();
      const [showPassword, setShowPassword] = useState(false);
      const handlePasswordShow = () => {
        setShowPassword(!showPassword);
       }

       const {createUser,updateUserProfile, logOut}= useAuth();

       const axiosPublic = useAxiosPublic();
      
       const onSubmit = async(data) => {
        console.log(data);
        const imageFile= {image: data.image[0]}
        const res= await axiosPublic.post(image_hosting_api, imageFile,{
            headers: {'content-type': 'multipart/form-data'}
         })
       
        createUser(data.email, data.password)
        .then(result=>{
            const loggedUser = result.user;
            console.log(loggedUser);
            if(res.data.success){
                const menuItem={
                    name: data.name,
                    email: data.email,
                    image: res.data.data.display_url
                }
                console.log(menuItem);
                updateUserProfile(menuItem.name, menuItem.image)
                .then(()=>{
                    const userInfo={
                        name: data.name,
                        email: data.email,
                        role: 'user'
                    }
                    axiosPublic.post('/users',userInfo)
                    .then(res=>{
                        if(res.data.insertedId){

                            console.log('user added to the database');
                            reset();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "User created successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
                      
                    logOut()
                    .then(() => {
                        toast.success('Successfully SignUp')
                        navigate('/login');
                    })
                    .catch(error => {
                        console.log(error);
                    })
                })
    
            };
            
        })
        .catch(error=>{
            setSignUpError(error?.message);
        })
        
        
    }

    return (
        <div className=''>

         

            {/* <Link to={'/'}>

                <img className='h-60 mx-auto pt-5' src={logo} alt="" />

            </Link> */}
           
            {/* <div className='flex pt-6 justify-center'>
                <p className=' text-xl font-bold text-center text-gray-600 '>
                    Sign Up <br />

                </p>

            </div> */}
            


            <div className='flex  min-h-[calc(100vh-306px)] '>


                <div className='flex justify-center items-start w-full max-w-sm mx-auto overflow-hidden  bg-white rounded-lg shadow-lg  lg:max-w-4xl '>
                    <div className='w-full px-6 py-8 md:px-8 lg:w-1/2'>
                       <form onSubmit={handleSubmit(onSubmit)}>
                         
                            
                            <div className='mt-4'>
                                <label
                                    className='block mb-2 text-sm font-medium text-gray-600 '
                                    htmlFor='name'
                                >
                                    Name
                                </label>
                                <input
                                    id='name'
                                    autoComplete='name'
                                    {...register('name',{required: true})}
                                    
                                    
                                    className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                    type='text'
                                />
                                  {errors.name && <span className='text-red-600'>Name is required</span>}
                            </div>
                            <div className='mt-4'>
                                <label
                                    className='block mb-2 text-sm font-medium text-gray-600 '
                                    htmlFor='LoggingEmailAddress'
                                >
                                    Email
                                </label>
                                <input
                                    id='LoggingEmailAddress'
                                    autoComplete='email'
                                    name='email'
                                    {...register('email',{required: true})}
                                    className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                    type='email'
                                />
                                  {errors.email && <span className='text-red-600'>Name is required</span>}
                            </div>

                            <div className='mt-4'>
                                <label
                                    className='block mb-2 text-sm font-medium text-gray-600 '
                                   
                                >
                                    Photo
                                </label>
                                <input type="file" {...register('image', {required: true})} className="file-input w-full" />
                                {errors.image && <span className='text-red-600'>Photo is required</span>}
                            </div>


                            <div className='mt-4 relative'>
                                <div className='flex justify-between'>
                                    <label
                                        className='block mb-2 text-sm font-medium text-gray-600 '
                                        htmlFor='loggingPassword'
                                    >
                                        Password
                                    </label>
                                </div>

                                <input
                                    id='loggingPassword'
                                    autoComplete='current-password'
                                    {...register('password',{
                                        required: true,
                                        minLength: 6,
                
                                        pattern: /(?=.*?[A-Z])(?=.*?[a-z])/,
                                    })}
                                    className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'

                                    type={showPassword ? 'text' : 'password'}

                                />
                                <button type='button' onClick={handlePasswordShow} className='absolute right-4 top-10'> {showPassword ? <FiEye /> : <FiEyeOff />}  </button>
                                {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className='text-red-600'>Password length must be at least 6 characters</p>}
                    
                                {errors.password?.type === 'pattern' && <p className='text-red-600'>Password must have one uppercase and one lowercase</p>}

                            </div>
                           
                             {signUpError && <p className='text-red-600'>{signUpError}</p>}
                           

                            <div className=" form-control mt-6">
                                <input type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50" value={'Sign Up'} />

                            </div>


                        </form>

                        <div className='flex items-center justify-between mt-4'>
                            <span className='w-1/5 border-b  md:w-1/4'></span>

                            <Link
                                to='/login'
                                className='text-xs text-gray-500 uppercase  hover:underline'
                            >
                                or sign in
                            </Link>

                            <span className='w-1/5 border-b  md:w-1/4'></span>
                        </div>
                    </div>
                    <div className='hidden bg-cover bg-center lg:block lg:w-1/2'>
                        
                        {/* <Lottie
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: registerLottieAnimation,
                                rendererSettings: {
                                    preserveAspectRatio: 'xMidYMid slice',
                                },
                            }}
                            height={300}
                            width={300}
                        /> */}
                        <Lottie className='h-full' animationData={registerLottieAnimation} loop={true} /> 
                    </div>
                </div>
            </div>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default SignUp;