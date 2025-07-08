import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useAgreement = () => {
    const axiosSecure = useAxiosSecure();
    const {user}= useAuth();

    const { isPending: isAgreementPending, error, data: agreement = [] } = useQuery({
        queryKey: ['agreement'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/agreement?email=${user?.email}`);
            return res.data;
        }
    });
    return [agreement, isAgreementPending, error];
};

export default useAgreement;