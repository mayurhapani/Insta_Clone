import img1 from "../assets/images/demo_user.png";
import { useState } from "react";

export default function CreatePost() {
  const [image, setImage] = useState(null);

  const loadFile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
    setImage(event.target.files[0]);
  };

  return (
    <div className="container mx-auto ">
      <div className="pt-32 flex flex-col items-center">
        <div className="max-w-80 border border-[rgb(173, 173, 173)] rounded-sm">
          {/* header */}
          <div className="flex p-2 border border-[rgb(173, 173, 173)]">
            <h1 className="w-full text-center font-bold">Create New Post</h1>
            <button className="font-bold text-blue-600 text-sm">Share</button>
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
            className="w-full px-2"
            placeholder="Write a caption....."
            name=""
            id=""
          ></textarea>
        </div>
      </div>
    </div>
  );
}
