import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import "./App.css";
import BlogOp from "./pages/BlogOp";
import CommentOp from "./pages/CommentOp";
import UserOp from "./pages/UserOp";
import Home from "./pages/Home";
import NavbarComp from "./components/NavbarComp";
import AdminLogin from "./pages/AdminLogin";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <BrowserRouter>
        {<NavbarComp />}
        <Routes>
          <Route path="/blogs" element={<BlogOp />} />
          <Route path="/comments" element={<CommentOp />} />
          <Route path="/users" element={<UserOp />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AdminLogin onLogin={handleLogin} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
