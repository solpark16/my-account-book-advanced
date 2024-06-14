import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { getUserInfo, login } from "../lib/api/auth";

const SignIn = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // 유저 정보가 있을 경우 (로그인 되어 있을 경우) home 화면으로 이동
  useEffect(() => {
    getUserInfo().then((res) => {
      if (res) {
        navigate("/");
      }
    });
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!id.trim() || !password.trim()) {
      alert("아이디, 비밀번호를 모두 입력해주세요.");
      return;
    }
    const { userId, nickname, avatar } = await login({ id, password });
    setUser({ userId, nickname, avatar });
    alert("로그인 되었습니다.");
    navigate("/");
  };
  return (
    <StDiv>
      <StSignInBox>
        <StSignInTitle>로그인</StSignInTitle>
        <StSignInForm onSubmit={handleSignIn}>
          <StInputBox>
            <label>아이디</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="아이디를 입력하세요."
            />
          </StInputBox>
          <StInputBox>
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요."
            />
          </StInputBox>
          <StSignInBtn type="submit">로그인</StSignInBtn>
        </StSignInForm>
        <StSignUpBtn
          onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입 페이지로
        </StSignUpBtn>
      </StSignInBox>
    </StDiv>
  );
};
const StDiv = styled.div`
  padding: 40px;
`;
const StSignInBox = styled.div`
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 30px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;
const StSignInTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #eb6530;
`;
const StSignInForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const StInputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    width: 100%;
    margin-top: 10px;
    border-radius: 10px;
    box-sizing: border-box;
    border: 1px solid #c4c4c4;
    height: 50px;
    padding: 10px;
    font-size: 16px;
  }
`;
const StSignInBtn = styled.button`
  width: 100%;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  background-color: #eb6530;
  color: #fff;
`;
const StSignUpBtn = styled.button`
  width: 100%;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  background-color: #49914b;
  color: #fff;
`;
export default SignIn;
