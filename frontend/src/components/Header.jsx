import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

export default function Header() {
  return (
    <div className=" bg-red-100">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <img className="w-40" src={logo} alt="" />
          <nav>
            <ul className="flex">
              <Link to="/signin">
                <li className="py-3 px-10 text-xl font-semibold">SignIn</li>
              </Link>
              <Link to="/signup">
                <li className="py-3 px-10 text-xl font-semibold">Sign Up</li>
              </Link>
              <Link to="/profile">
                <li className="py-3 px-10 text-xl font-semibold">Profile</li>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
