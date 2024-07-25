import { useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function Logout() {
  const { setIsLoggedIn, setLogInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const logout = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${process.env.BASE_URL}/logout`, {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (response.status === 200 && isMounted) {
          localStorage.removeItem("token");
          localStorage.removeItem("id");
          setIsLoggedIn(false);
          setLogInUser({});
          toast.success(response.data.message);
          navigate("/");
        }
      } catch (error) {
        if (isMounted) {
          toast.error("Logout failed. Please try again.");
        }
      }
    };

    logout();

    return () => {
      isMounted = false;
    };
  }, [navigate, setIsLoggedIn, setLogInUser]);

  return null;
}
