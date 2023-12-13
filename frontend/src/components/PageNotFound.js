import React from "react";
import { ToastContainer, toast } from "react-toastify";

const PageNotFound = () => {
  return (
    <div>
      <ToastContainer />
      <h1>Page Not found</h1>
      <button onClick={() => toast("checking")}>click</button>
    </div>
  );
};

export default PageNotFound;
