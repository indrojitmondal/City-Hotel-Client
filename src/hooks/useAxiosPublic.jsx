import axios from 'axios';

const useAxiosPublic = () => {
    const axiosPublic= axios.create({
        baseURL: 'https://a12-ph-server.vercel.app',
    })
    return axiosPublic;
};

export default useAxiosPublic;