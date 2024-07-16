import axios from "axios";
import img1 from "../assets/images/demo_user.png";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [image, setImage] = useState(null);
  const [disc, setDisc] = useState("");

  const navigate = useNavigate();

  const notify1 = (msg) => toast.error(msg);
  const notify2 = (msg) => toast.success(msg);

  // console.log(image, disc);

  const shareData = async () => {
    try {
      const token = localStorage.getItem("token");

      // image upload
      const dataImage = new FormData();
      dataImage.append("file", image);
      dataImage.append("upload_preset", "instaClone");
      dataImage.append("cloud_name", "instaclone21");

      const responseImage = await axios.post(
        "https://api.cloudinary.com/v1_1/instaclone21/upload",
        dataImage
      );
      const uploadedImagePath = responseImage.data.url;

      // data send to backend
      const response = await axios.post(
        "http://localhost:8001/createPost",
        {
          disc: disc,
          image: uploadedImagePath,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      if (response) {
        notify2(response.data.message);
        navigate("/");
      } else {
        notify1(response.data.message);
        navigate("/createPost");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadFile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src);
    };
    setImage(event.target.files[0]);
  };

  return (
    <div className="container mx-auto ">
      <div className="pt-32 flex flex-col items-center">
        <div className="max-w-80 border border-[rgb(173, 173, 173)] rounded-sm">
          {/* header */}
          <div className="flex p-2 border-b border-[rgb(173, 173, 173)]">
            <h1 className="w-full text-center font-bold">Create New Post</h1>
            <button
              onClick={() => {
                shareData();
              }}
              className="font-bold text-blue-600 text-sm"
            >
              Share
            </button>
          </div>

          {/* image upload */}
          <div className="">
            <img
              className="w-full h-max"
              src={image ? URL.createObjectURL(image) : img1}
              alt=""
              id="output"
            />
            <div className="flex items-center justify-between bg-grey-lighter mb-3 w-full">
              <label className="w-full flex justify-evenly items-center p-4 bg-zinc-300 rounded-lg shadow-lg tracking-wide uppercase border border-zinc-300 cursor-pointer hover:bg-zinc-600 hover:text-white">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">Select a profile image</span>
                <input
                  onChange={loadFile}
                  accept="image/*"
                  type="file"
                  name="image"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* content */}
          <div className="flex items-center p-1">
            <img className="w-7 rounded-full" src={img1} alt="" />
            <span className="ms-3 text-sm font-bold">User Name</span>
          </div>
          <textarea
            className="w-full p-2 outline-none"
            placeholder="Write a caption....."
            onChange={(e) => {
              setDisc(e.target.value);
            }}
            name=""
            id=""
          ></textarea>
        </div>
      </div>
    </div>
  );
}
