import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthProvider";

import Header from "./components/Header";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Logout from "./components/Logout";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
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
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
