import React from 'react'
import {RiLoader4Line} from "react-icons/ri";

const LoadingOverlay = () => {
  return (
    <div className="absolute z-10 inset-0 flex items-center justify-center bg-grey opacity-10 w-full h-full ">
          <RiLoader4Line size={50} className="animate-spin"/>
        </div>
  );
};

export default LoadingOverlay;