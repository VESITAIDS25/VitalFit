import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


const PageNotFound = () => {

  const navigate = useNavigate()
  return (
    <div>
      <ToastContainer />
      <h1>Page Not found</h1>
      <button onClick={() =>navigate('/') }>click</button>
      <button onClick={() =>toast('check') }>Check</button>
    </div>
  );
};

export default PageNotFound;
