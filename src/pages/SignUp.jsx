import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignUp = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
  const onClickSignInBtnHandler = () => {
    navigate("/");
  };
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

    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/register",
        {
          id,
          password,
          nickname,
        }
      );
      const data = response.data;
      if (data.success) {
        console.log("됐슴다");
        navigate("/");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed");
    }
  };

  return (
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
      <StSignInBtn onClick={() => onClickSignInBtnHandler()}>
        로그인
      </StSignInBtn>
    </StSignUpBox>
  );
};
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
