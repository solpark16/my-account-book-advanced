import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import { updateProfile } from "../lib/api/auth";

const MyPage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [newNickname, setNewNickname] = useState("");
  const [newAvatar, setNewAvatar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setNewNickname(user.nickname);
    } else {
    }
  }, [user]);

  const handleProfileChange = async (e) => {
    e.preventDefault();
    if (newNickname.length < 1 || 10 < newNickname.length) {
      alert("닉네임은 1~10 글자로 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", newAvatar);
    formData.append("nickname", newNickname);

    const response = await updateProfile(formData);

    if (response.success) {
      setUser(
        response.avatar
          ? { ...user, nickname: response.nickname, avatar: response.avatar }
          : { ...user, nickname: response.nickname }
      );
      navigate("/");
    }
  };

  return (
    <StDiv>
      <StProfileBox>
        <StProfileTitle>프로필 수정</StProfileTitle>
        {user && <StProfileImg src={user.avatar} />}
        <StProfileForm onSubmit={handleProfileChange}>
          <label>닉네임</label>
          <StNicknameInput
            type="text"
            value={newNickname}
            onChange={(e) => {
              setNewNickname(e.target.value);
            }}
          />
          <label>아바타 이미지</label>
          <input
            type="file"
            onChange={(e) => {
              setNewAvatar(e.target.files[0]);
            }}
          />
          <StProfileBtn type="submit">프로필 수정하기</StProfileBtn>
        </StProfileForm>
      </StProfileBox>
    </StDiv>
  );
};

const StDiv = styled.div`
  padding: 40px;
`;
const StProfileBox = styled.div`
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
const StProfileTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #eb6530;
`;
const StProfileImg = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
`;
const StProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  label {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
  }
  input {
    margin-bottom: 20px;
    box-sizing: border-box;

    height: 40px;
    padding: 10px;
    font-size: 16px;
    width: 100%;
  }
`;
const StNicknameInput = styled.input`
  border: 1px solid #c4c4c4;
  border-radius: 10px;
`;
const StProfileBtn = styled.button`
  width: 100%;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #49914b;
  color: #fff;
  cursor: pointer;
`;
export default MyPage;
