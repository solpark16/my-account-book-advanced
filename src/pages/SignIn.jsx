import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";

const SignIn = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onClickSignUpBtnHandler = () => {
    navigate("/signup");
  };
  const handleSubmit = async (e) => {
    if (!id.trim() || !password.trim()) {
      alert("아이디, 비밀번호를 모두 입력해주세요.");
      return;
    }
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login",
        {
          id,
          password,
        }
      );
      const data = response.data;
      if (data.success) {
        login(data.accessToken);
        navigate("/home");
      } else {
        alert("존재하지 않는 아이디거나, 비밀번호입니다.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  return (
    <StSignInBox>
      <StSignInTitle>로그인</StSignInTitle>
      <StSignInForm onSubmit={handleSubmit}>
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
      <StSignUpBtn onClick={() => onClickSignUpBtnHandler()}>
        회원가입
      </StSignUpBtn>
    </StSignInBox>
  );
};
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
