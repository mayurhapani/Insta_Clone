import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function BlogCard({
  post,
  user,
  newCommentAdd,
  setNewCommentAdd,
  delComment,
  setDelComment,
}) {
  const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [comment, setComment] = useState("");
  const [commentCount, setCommentCount] = useState(post.comments.length);
  const { myPostId, setMyPostId } = useContext(AuthContext);

  const likePost = async () => {
    try {
      const response = await axios.get(`http://localhost:8001/post/like/${post._id}`, {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      // Toggle the like state
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

  const addComment = async (post) => {
    try {
      const response = await axios.post(
        `http://localhost:8001/post/addComment/${post._id}`,
        { comment },
        {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setComment("");
      setCommentCount(commentCount + 1);
      toast.success(response.data.message);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    // if (!newCommentAdd) {
    //   return;
    // }

    console.log("delComment", delComment);

    if (myPostId == post._id && newCommentAdd) {
      setCommentCount(commentCount + 1);
      setNewCommentAdd(false);
    }

    if (myPostId == post._id && delComment) {
      setCommentCount(commentCount - 1);
      setDelComment(false);
    }
  }, [newCommentAdd, delComment]);

  useEffect(() => {}, [isLiked, likesCount, myPostId, commentCount]);

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

      {/* description  */}
      <div className="p-2">
        <p>@ {post.disc}</p>
      </div>

      {/* show comments */}
      <p
        className="font-bold cursor-pointer ms-2 text-sm"
        onClick={() => {
          setMyPostId(post._id);
        }}
      >
        Show All {commentCount} Comments
      </p>

      {/* add comments */}
      <div className="flex items-center">
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
            addComment(post);
          }}
          className="px-1 pb-2 text-lg text-blue-800 font-semibold"
        >
          post
        </button>
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
    comments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  newCommentAdd: PropTypes.bool.isRequired,
  setNewCommentAdd: PropTypes.func.isRequired,
  delComment: PropTypes.bool.isRequired,
  setDelComment: PropTypes.func.isRequired,
};
