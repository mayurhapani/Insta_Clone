import img1 from "../assets/images/demo_user.png";
export default function Profile() {
  return (
    <div className="container mx-auto ">
      <div className="pt-32 flex flex-col items-center w-1/2 mx-auto">
        {/* header */}
        <div className="w-full">
          <div className="flex items-center">
            <img
              className="rounded-full w-32 h-32"
              src="https://via.placeholder.com/150"
              alt="User Avatar"
            />
            <div className="ps-5">
              <h1 className="text-3xl font-bold text-center mb-5 ">John Doe</h1>
              <div className="flex items-center">
                <p className="text-sm text-gray-600 font-semibold me-4">
                  <span>40</span> Posts
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
          <div className="w-1/3 p-1 ">
            <div className="border border-gray-300">
              <img className="w-full h-full" src={img1} alt="" />
            </div>
          </div>
          <div className="w-1/3 p-1 ">
            <div className="border border-gray-300">
              <img className="w-full h-full" src={img1} alt="" />
            </div>
          </div>
          <div className="w-1/3 p-1 ">
            <div className="border border-gray-300">
              <img className="w-full h-full" src={img1} alt="" />
            </div>
          </div>
          <div className="w-1/3 p-1 ">
            <div className="border border-gray-300">
              <img className="w-full h-full" src={img1} alt="" />
            </div>
          </div>
          <div className="w-1/3 p-1 ">
            <div className="border border-gray-300">
              <img className="w-full h-full" src={img1} alt="" />
            </div>
          </div>
          <div className="w-1/3 p-1 ">
            <div className="border border-gray-300">
              <img className="w-full h-full" src={img1} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
