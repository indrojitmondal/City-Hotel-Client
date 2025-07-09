import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// your custom hook
import { useNavigate } from 'react-router';
import useAgreement from '../../../hooks/useAgreement';
import useCoupons from '../../../hooks/useCoupons';
import Loader from '../../../components/Loader/Loader';

const MakePayment = () => {
    const [agreement] = useAgreement();
    const navigate = useNavigate();
    const [finalRent, setFinalRent] = useState(agreement[0]?.rent || 0);
    const [couponMessage, setCouponMessage] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const [coupons, isCouponsPending]=useCoupons();
    useEffect(()=>{
      setFinalRent(agreement[0]?.rent || 0);
    },[agreement])
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    const onSubmit = data => {
        const paymentData = {
            ...data,
            rent: finalRent,
            apartmentId: agreement[0]?._id,
            status: 'checked',
        };
        console.log('Redirecting with:', paymentData);
        // Replace with your actual payment route logic
        navigate('/dashboard/checkout', { state: paymentData });
    };

    const handleCouponApply = () => {
        const code = document.getElementById('couponCode').value.trim();

        // Example static coupons
        // const coupons = {
        //     SAVE20: 20,
        //     HOTEL10: 10,
        //     SUMMER25: 50
        // };

        const newCoupons = coupons.reduce((acc, item) => {
            // Extract numeric value from discount string like "30%"
            const discountNumber = parseInt(item.discount);
            acc[item.code] = discountNumber;
            return acc;
        }, {});
        

        console.log('Hello coupons: ', coupons);

        if (newCoupons[code]) {
            const discount = (agreement[0]?.rent * newCoupons[code]) / 100;
            setFinalRent(agreement[0]?.rent - discount);
            setCouponMessage(`✅ Coupon applied! ${newCoupons[code]}% off.`);
            setCouponApplied(true);
        } else {
            setCouponMessage('❌ Invalid coupon code.');
            setFinalRent(agreement[0]?.rent);
            setCouponApplied(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#1e1b4b] via-[#3b0764] to-[#111827] text-white p-8">
           
            {isCouponsPending?
             <Loader></Loader> : 
           
            <div className="max-w-3xl mx-auto bg-[#2d1c3a] rounded-xl shadow-2xl border border-[#d6bb7a] p-8 space-y-6 font-serif">
                <h2 className="text-3xl font-bold text-center text-[#facc15]">💠 Make Payment</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            readOnly
                            defaultValue={agreement[0]?.email}
                            {...register("email")}
                            className="input input-bordered w-full bg-[#3e1d4f] border-[#c084fc] text-white"
                        />
                        <input
                            readOnly
                            defaultValue={agreement[0]?.floorNo}
                            {...register("floor")}
                            className="input input-bordered w-full bg-[#3e1d4f] border-[#c084fc] text-white"
                        />
                        <input
                            readOnly
                            defaultValue={agreement[0]?.blockName}
                            {...register("block")}
                            className="input input-bordered w-full bg-[#3e1d4f] border-[#c084fc] text-white"
                        />
                        <input
                            readOnly
                            defaultValue={agreement[0]?.apartmentNo}
                            {...register("apartmentNo")}
                            className="input input-bordered w-full bg-[#3e1d4f] border-[#c084fc] text-white"
                        />
                        <input
                            readOnly
                            value={`${finalRent} Tk`}
                            className="input input-bordered w-full bg-[#3e1d4f] border-[#fcd34d] text-white font-bold"
                        />
                        <input
                            type="text"
                            placeholder="Enter month (e.g., July 2025)"
                            {...register("month", { required: true })}
                            className="input input-bordered w-full bg-[#3e1d4f] border-[#c084fc] text-white"
                        />
                        {errors.month && <p className="text-red-400">* Month is required</p>}
                    </div>

                    {/* Coupon Section */}
                    <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                        <input
                            id="couponCode"
                            type="text"
                            placeholder="Enter coupon code"
                            className="input input-bordered bg-[#3e1d4f] border-[#c084fc] text-white w-full md:w-1/2"
                        />
                        <button
                            type="button"
                            onClick={handleCouponApply}
                            className="btn btn-outline border-yellow-400 hover:bg-yellow-400 hover:text-black"
                            disabled={couponApplied}
                        >
                            🎁 Apply Coupon
                        </button>
                    </div>
                    {couponMessage && <p className={`text-sm ${couponApplied ? 'text-green-400' : 'text-red-400'}`}>{couponMessage}</p>}

                    <div className="text-center mt-6">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-[#facc15] to-[#fcd34d] text-black font-bold px-6 py-3 rounded-lg shadow-md hover:scale-105 transition"
                        >
                            💳 Pay
                        </button>
                    </div>
                </form>
            </div> 
            }
        </div>
    );
};

export default MakePayment;
