import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import { getUserInfo } from "../lib/api/auth";
import { AuthContext } from "../context/AuthContext";

export default function Layout() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    getUserInfo().then((res) => {
      if (res) {
        setUser({
          userId: res.id,
          nickname: res.nickname,
          avatar: res.avatar,
        });
      } else {
        handleLogout();
      }
    });
  }, []);

  const handleLogout = () => {
    if (confirm("정말 로그아웃하시겠습니까?")) {
      setUser(null);
      navigate("/signin");
      localStorage.clear();
    }
  };

  return (
    <>
      <StHeader>
        <Link to="/">
          <StHeaderTitle>HOME</StHeaderTitle>
        </Link>
        <Link to="/mypage">
          <StHeaderMyPage>내 프로필</StHeaderMyPage>
        </Link>
        {user && (
          <StNav>
            <StProfileImg src={user.avatar} />
            <p>{user.nickname}님, 안녕하세요!</p>
            <StLogOutBtn onClick={handleLogout}>로그아웃</StLogOutBtn>
          </StNav>
        )}
      </StHeader>
      <Outlet />
    </>
  );
}
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
