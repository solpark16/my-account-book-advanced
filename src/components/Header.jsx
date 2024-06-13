import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import authApi from "../axios/authApi";

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     // alert("로그인이 필요합니다.");
  //     // navigate("/signin");
  //   } else {
  //     const fetchUserInfo = async () => {
  //       try {
  //         const token = localStorage.getItem("accessToken");
  //         const { data } = await authApi.get("/user", {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  //         setUserInfo(data);
  //       } catch (error) {
  //         console.error("Failed to fetch user info:", error);
  //         logout();
  //       }
  //     };
  //     fetchUserInfo();
  //   }
  // }, [isAuthenticated, navigate]);

  // const handleLogout = () => {
  //   const confirmLogout = window.confirm("정말로 로그아웃 하시겠습니까?");
  //   if (confirmLogout) {
  //     logout();
  //     navigate("/signin");
  //   }
  // };
  // if (!userInfo) {
  //   return <StHeader></StHeader>;
  // }

  return (
    <StHeader>
      안냐새여
      {/* <Link to="/">
        <StHeaderTitle>HOME</StHeaderTitle>
      </Link>
      <Link to="/mypage">
        <StHeaderMyPage>내 프로필</StHeaderMyPage>
      </Link>
      <StNav>
        {isAuthenticated ? (
          <>
            <StProfileImg src={userInfo.avatar} />
            <p>{userInfo.nickname}님, 안녕하세요!</p>
            <StLogOutBtn onClick={handleLogout}>Logout</StLogOutBtn>
          </>
        ) : (
          <>
            <Link to="/signin">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </StNav> */}
    </StHeader>
  );
};

const StHeader = styled.header`
  min-width: 800px;
  width: 100%;
  background-color: #fff;
  display: flex;
  padding: 30px;
  box-sizing: border-box;
  height: 100px;
  align-items: center;
`;
const StHeaderTitle = styled.h1`
  color: #eb6530;
  font-weight: bold;
  font-size: 24px;
  margin-right: 20px;
`;
const StHeaderMyPage = styled.p`
  color: #eb6530;
  font-weight: bold;
  font-size: 24px;
`;
const StLogOutBtn = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #49914b;
  color: #fff;
  cursor: pointer;
`;
const StNav = styled.nav`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const StProfileImg = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
`;
export default Header;
