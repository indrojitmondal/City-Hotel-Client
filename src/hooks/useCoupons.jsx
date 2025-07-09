import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useCoupons = () => {
    const axiosPublic = useAxiosPublic();
  // Fetch coupons

 
  const {data: coupons=[], isPending: isCouponsPending, refetch}=useQuery({
    queryKey: ['coupons'],
    queryFn: async()=>{
        const res= await axiosPublic.get('/coupons');
        return res.data;
    }
  })
    return [coupons, isCouponsPending];
};

export default useCoupons;