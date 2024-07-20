import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

export default function BlogCard({ post, user }) {
  const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));
  const [likesCount, setLikesCount] = useState(post.likes.length);

  const likePost = async () => {
    try {
      const response = await axios.get(`http://localhost:8001/post/like/${post._id}`, {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      // Toggle the like state and update the likes count
      if (isLiked) {
        setLikesCount(likesCount - 1);
      } else {
        setLikesCount(likesCount + 1);
      }
      setIsLiked(!isLiked);

      toast.success(response.data.message);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {}, [isLiked, likesCount]);

  return (
    <div className="card border border-[rgb(173, 173, 173)] rounded-sm mb-1">
      {/* card header */}
      <div className="flex justify-start items-center p-2">
        <img className="w-[40px] rounded-full me-5" src={post.user.image} alt="" />
        <span className="font-semibold">@ {post.user.username}</span>
      </div>

      {/* card post image */}
      <div className="">
        <img className="w-full h-max" src={post.image} alt="" />
      </div>

      {/* card content */}
      <div className="py-2 px-1 flex justify-between items-center border border-[rgb(173, 173, 173)]">
        <div className="">
          {isLiked ? (
            <span
              onClick={likePost}
              className="material-symbols-outlined material-symbols-outlined-red me-2 text-2xl cursor-pointer"
            >
              favorite
            </span>
          ) : (
            <span
              onClick={likePost}
              className="material-symbols-outlined me-2 text-2xl cursor-pointer"
            >
              favorite
            </span>
          )}
          <span className="material-symbols-outlined me-2 text-2xl">maps_ugc</span>
          <span className="material-symbols-outlined text-2xl">send</span>
        </div>
        <span className="material-symbols-outlined text-2xl">bookmark</span>
      </div>

      {/* card footer */}
      <div className="px-2">
        <span className="pe-2">{likesCount}</span>
        <span>likes</span>
      </div>

      {/* comments */}
      <div className="p-2">
        <p>@ {post.disc}</p>
      </div>

      {/* add comments */}
      <div className="flex items-center">
        <span className="material-symbols-outlined">mood</span>
        <input
          className="outline-none border border-gray-200 p-1 text-sm rounded-lg w-full mx-2"
          type="text"
          placeholder="Add Comments..."
        />
        <button className="px-1 pb-2 text-lg text-blue-800 font-semibold">post</button>
      </div>
    </div>
  );
}

BlogCard.propTypes = {
  post: PropTypes.shape({
    user: PropTypes.shape({
      image: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    image: PropTypes.string.isRequired,
    disc: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
