import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function OtherUserProfile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [userPost, setUserPost] = useState({});
  const [viewPost, setViewPost] = useState(null);

  const [comment, setComment] = useState(null);
  // const [userPostId, setUserPostId] = useState("");

  const { logInUser } = useContext(AuthContext);
  console.log(logInUser);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/oUser/getUser/${id}`, {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setUser(response.data);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      }
    };

    // Fetch posts when component mounts
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/oUser/getUserPosts/${id}`, {
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

    fetchUserData();
    fetchUserPosts();
  }, [id]);

  return (
    <>
      <div className="container mx-auto ">
        {user ? (
          <div className="pt-32 flex flex-col items-center w-1/2 mx-auto">
            {/* header */}
            <div className="w-full">
              <div className="flex items-center">
                <img
                  className="rounded-full w-32 h-32"
                  src={user.image}
                  alt="https://via.placeholder.com/150"
                />
                <div className="ps-5">
                  <h1 className="text-3xl font-bold text-center mb-5 ">{user.username}</h1>
                  <div className="flex items-center">
                    <p className="text-sm text-gray-600 font-semibold me-4">
                      <span>{posts.length || 0}</span> Posts
                    </p>
                    <p className="text-sm text-gray-600 font-semibold me-4">
                      <span>40</span> Followers
                    </p>
                    <p className="text-sm text-gray-600 font-semibold">
                      <span>40</span> Following
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="w-full mx-auto mt-2 mb-10" />

            {/* posts */}
            <div className=" flex flex-wrap">
              {posts.map((post) => (
                <div key={post._id} className="w-1/3 p-1 ">
                  <div
                    onClick={() => {
                      setUserPost(post);
                      setViewPost(true);
                      // setUserPostId(post._id);
                    }}
                    className="border border-gray-300 w-full aspect-square cursor-pointer"
                  >
                    <img className="w-full h-full" src={post.image} alt="" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full h-screen flex justify-center items-center">
            <p className="text-black text-2xl font-semibold">Loading...</p>
          </div>
        )}
      </div>

      {/* view my post */}
      {viewPost && (
        <div className=" fixed w-screen h-screen top-0 left-0 bottom-0 bg-[rgba(27,28,24,0.34)]">
          <div className="w-[80%] xl:w-[60%] h-[70%]  mt-[8%] mx-auto bg-white flex">
            <div className="w-full">
              <img className="w-full h-full aspect-auto" src={userPost.image} alt="" />
            </div>
            <div className="flex flex-col w-full">
              {/* card header */}
              <div className="flex justify-start items-center p-2 border-b-2 h-[12%]">
                <img className="w-[40px] rounded-full me-5" src={userPost.user.image} alt="" />
                <span className="font-semibold me-auto">@ {userPost.user.username}</span>
              </div>

              {/* comment section */}
              <div className="h-[76%] overflow-y-scroll">
                {userPost.comments.length > 0 ? (
                  userPost.comments.map((comment, index) => (
                    <div className="p-2 flex items-center justify-between" key={index}>
                      <p className="">
                        <span className="font-bold me-2">@ {comment.user.username} : </span>
                        {comment.comment}
                      </p>
                      {comment.user == logInUser._id && (
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            // deleteComment(comment._id, userPost._id);
                          }}
                        >
                          <span className="material-symbols-outlined text-red-800 text-lg font-bold">
                            close
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="h-full w-full flex justify-center items-center">
                    <p>No Comments Yet</p>
                  </div>
                )}
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
                  // onClick={() => {
                  //   addComment(userPost);
                  // }}
                  className="px-1 pb-2 text-lg text-blue-800 font-semibold"
                >
                  post
                </button>
              </div>
            </div>
          </div>

          {/* close comment section */}
          <div
            className=" fixed top-5 right-5 cursor-pointer"
            onClick={() => {
              setViewPost(false);
              // setUserPostId("");
            }}
          >
            <span className="material-symbols-outlined text-white text-4xl font-bold">close</span>
          </div>
        </div>
      )}
    </>
  );
}
