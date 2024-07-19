import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import { useState } from "react";
import { loginContext } from "./context/LoginContext";
import Logout from "./components/Logout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <BrowserRouter>
        <loginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
          <ToastContainer />
        </loginContext.Provider>
        ;
      </BrowserRouter>
    </>
  );
}

export default App;
