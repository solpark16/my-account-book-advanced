import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import MyPage from "../pages/MyPage";

// PrivateRoute : 로그인이 필요한 페이지에 접근할 수 있도록 하는 컴포넌트
// 로그인이 되어있지 않은 사용자는 login 페이지로 리다이렉트
const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/" />;
};

// PublicRoute : 로그인이 필요없는 페이지에 접근할 수 있도록 하는 컴포넌트
// 로그인이 되어있는 사용자는 home으로 리다이렉트
const PublicRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? <Element {...rest} /> : <Navigate to="/home" />;
};

const Router = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/" element={<PublicRoute element={SignIn} />} />
        <Route path="/signup" element={<PublicRoute element={SignUp} />} />
        <Route path="/home" element={<PrivateRoute element={Home} />} />
        <Route path="/detail/:id" element={<PrivateRoute element={Detail} />} />
        <Route path="/mypage" element={<PrivateRoute element={MyPage} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
