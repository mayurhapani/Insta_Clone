import { useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { loginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { setIsLoggedIn } = useContext(loginContext);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const logout = async () => {
      try {
        const response = await axios.get("http://localhost:8001/logout", {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (response.status === 200 && isMounted) {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
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
  }, [navigate, setIsLoggedIn]);

  return null;
}
