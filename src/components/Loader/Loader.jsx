import React from 'react';
import { Circles } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-40">
        <Circles height="80" width="80" color="#facc15" ariaLabel="loading" />
      </div> 
    );
};

export default Loader;