import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import authApi from "../axios/authApi";
import { register } from "../lib/api/auth";

const SignUp = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!id.trim() || !password.trim() || !nickname.trim()) {
      alert("아이디, 비밀번호, 닉네임을 모두 입력해주세요.");
      return;
    }
    if (id.length < 4 || 10 < id.length) {
      alert("아이디는 4~10 글자로 입력해주세요.");
      return;
    }
    if (password.length < 4 || 15 < password.length) {
      alert("비밀번호는 4~15 글자로 입력해주세요.");
      return;
    }
    if (nickname.length < 1 || 10 < nickname.length) {
      alert("닉네임은 1~10 글자로 입력해주세요.");
      return;
    }
    const response = await register({ id, password, nickname });
    console.log(response);
    if (response.success) {
      alert("회원가입이 완료되었습니다.");
      navigate("/signin");
    }
  };

  return (
    <StDiv>
      <StSignUpBox>
        <StSignUpTitle>회원가입</StSignUpTitle>
        <StSignUpForm onSubmit={handleSubmit}>
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
          <StInputBox>
            <label>닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요."
            />
          </StInputBox>
          <StSignUpBtn type="submit">회원가입</StSignUpBtn>
        </StSignUpForm>
        <StSignInBtn
          onClick={() => {
            navigate("/signin");
          }}
        >
          로그인 페이지로
        </StSignInBtn>
      </StSignUpBox>
    </StDiv>
  );
};
const StDiv = styled.div`
  padding: 40px;
`;
const StSignUpBox = styled.div`
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
const StSignUpTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #eb6530;
`;
const StSignUpForm = styled.form`
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
const StSignUpBtn = styled.button`
  width: 100%;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  background-color: #eb6530;
  color: #fff;
`;
const StSignInBtn = styled.button`
  width: 100%;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  background-color: #49914b;
  color: #fff;
`;
export default SignUp;
