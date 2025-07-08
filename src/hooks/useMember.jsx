import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";


const useMember = () => {
    const {user, loading}= useAuth();
    const axiosSecure= useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { data: isMember, isPending: isMemberLoading}= useQuery({
      queryKey: [user?.email, 'member'],
      queryFn: async()=>{
        const res= await axiosSecure.get(`/memberChecker/${user.email}`)
        console.log(res.data);
        return res.data?.member || false; 
     }
    })
    return [isMember, isMemberLoading];
};

export default useMember;