import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    username: "",
    roles: null,
  });

  useEffect(() => {
    async function authCall() {
      if (!auth.role) {
        try {
          const res = await axios.get("/authTest");
          if (res) {
            setAuth({
              ...auth,
              ...res.data.sessionUser,
            });
          }
        } catch (error) {
          if (error.response.status !== 401) {
            toast.error("Something went wrong");
          } else {
            // navigate('/login')
            console.log(error);
          }
        }
      }
    }
    authCall();
    //eslint-disable-next-line
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
