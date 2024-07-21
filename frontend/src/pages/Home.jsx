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
  const { isLoggedIn, myPost, setMyPost, viewMyPost, setViewMyPost } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  console.log(posts);
  console.log(viewMyPost);

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

  // useEffect(() => {}, [viewMyPost]);

  // add comments
  const addComment = async (post) => {
    console.log(post);
    // try {
    //   const response = await axios.post(
    //     `http://localhost:8001/post/addComment/${post._id}`,
    //     { comment },
    //     {
    //       withCredentials: true,
    //       headers: {
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     }
    //   );
    //   setComment("");
    //   setMyPost({});
    //   toast.success(response.data.message);
    // } catch (error) {
    //   if (error.response) {
    //     toast.error(error.response.data.message);
    //   } else {
    //     toast.error(error.message);
    //   }
    // }
  };

  return (
    <div className="">
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
      {viewMyPost && (
        <div className=" fixed w-screen h-screen top-0 left-0 bg-[rgba(27,28,24,0.34)]">
          <div className="w-[80%] min-h-[250px] mx-h-[80%]  mt-[10%] mx-auto bg-white flex">
            <div className="w-full">
              <img
                className="w-full h-full aspect-auto"
                src="https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721347200&semt=ais_user"
                alt=""
              />
            </div>
            <div className="flex flex-col w-full">
              {/* card header */}
              <div className="flex justify-start items-center p-2 border-b-2 h-[12%]">
                {/* <img className="w-[40px] rounded-full me-5" src={post.user.image} alt="" /> */}
                {/* <span className="font-semibold">@ {post.user.username}</span> */}
                <img
                  className="w-[40px] rounded-full me-5"
                  src="https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721347200&semt=ais_user"
                  alt=""
                />
                <span className="font-semibold">@ mayur</span>
              </div>

              {/* comment section */}
              <div className="h-[76%]">
                <p className="p-2">
                  <span className="font-bold me-2">@ mayur : </span>
                  hi this is mayur
                </p>
              </div>

              {/* comment form */}
              <div className="flex items-center h-[12%] border-t-2 p-2">
                <span className="material-symbols-outlined">mood</span>
                <input
                  className="outline-none border border-gray-200 p-1 text-sm rounded-lg w-full mx-2"
                  type="text"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  placeholder="Add Comments..."
                />
                <button
                  onClick={() => {
                    addComment(myPost);
                  }}
                  className="px-1 pb-2 text-lg text-blue-800 font-semibold"
                >
                  post
                </button>
              </div>
            </div>
          </div>
          <div className=" fixed top-5 right-5 cursor-pointer" onClick={() => setViewMyPost(false)}>
            <span className="material-symbols-outlined text-white text-4xl font-bold">close</span>
          </div>
        </div>
      )}
    </div>
  );
}
