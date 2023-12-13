import { useState, useEffect } from "react";
import { useAuth } from "../../Context/authContext";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

// import axios from "axios";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setauth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      if (auth?.roles) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    authCheck();
  }, [auth?.roles]);
  return ok ? <Outlet /> : <Spinner />;
}
