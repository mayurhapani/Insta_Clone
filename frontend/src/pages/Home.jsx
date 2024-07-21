import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { AuthContext } from "../context/AuthProvider";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Home() {
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(posts);

  useEffect(() => {
    const token = localStorage.getItem("token") || cookies.get("token");

    if (!token) {
      navigate("/signin");
      return;
    }

    // Fetch posts when component mounts
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8001/post/getPosts", {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setPosts(response.data);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8001/getUser", {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setUser(response.data.user);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      }
    };

    fetchUser();
    fetchPosts();
  }, [navigate, isLoggedIn]);

  return (
    <div className="container mx-auto ">
      <div className="pt-32 flex flex-col items-center">
        <div className="max-w-[22rem] rounded-sm">
          {posts.length > 0 ? (
            posts.reverse().map((post, index) => <BlogCard post={post} user={user} key={index} />)
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
}
