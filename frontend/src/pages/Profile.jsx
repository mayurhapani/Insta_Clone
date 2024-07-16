export default function Profile() {
  return (
    <div className="pt-32 flex flex-col items-center">
      <div className="flex items-center">
        <img
          className="rounded-full w-24 h-24"
          src="https://via.placeholder.com/150"
          alt="User Avatar"
        />
        <div className="ps-5">
          <h1 className="text-2xl font-bold text-center mb-5 ">John Doe</h1>
          <div className="flex items-center">
            <p className="text-sm text-gray-600 me-4">
              <span>40</span> Posts
            </p>
            <p className="text-sm text-gray-600 me-4">
              <span>40</span> Followers
            </p>
            <p className="text-sm text-gray-600">
              <span>40</span> Following
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
