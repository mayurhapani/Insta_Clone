import PropTypes from "prop-types";

export default function BlogCard({ post }) {
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
          <span className="material-symbols-outlined me-2 text-2xl">favorite</span>
          <span className="material-symbols-outlined me-2 text-2xl">maps_ugc</span>
          <span className="material-symbols-outlined text-2xl">send</span>
        </div>
        <span className="material-symbols-outlined text-2xl">bookmark</span>
      </div>

      {/* card footer */}
      <div className="px-2">
        <span className="pe-2">1</span>
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
  }).isRequired,
};
