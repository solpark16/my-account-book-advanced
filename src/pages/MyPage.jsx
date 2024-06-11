import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [newNickname, setNewNickname] = useState("");
  const [newImage, setNewImage] = useState({});
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      navigate("/");
    } else {
      const fetchUserInfo = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const { data } = await axios.get(
            "https://moneyfulpublicpolicy.co.kr/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserInfo(data);
          setNewNickname(data.nickname);
          setNewImage(data.avatar);
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      };
      fetchUserInfo();
    }
  }, [isAuthenticated, navigate]);

  const handleProfileChange = async (e) => {
    e.preventDefault();
    if (newNickname.length < 1 || 10 < newNickname.length) {
      alert("닉네임은 1~10 글자로 입력해주세요.");
      return;
    }
    if (newImage === userInfo.avatar && newNickname === userInfo.nickname) {
      alert("변경 사항이 없습니다.");
      return;
    }
    try {
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("avatar", newImage);
      formData.append("nickname", newNickname);
      // 요청 시 Content-Type에 유의
      const { data } = await axios.patch(
        `https://moneyfulpublicpolicy.co.kr/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setUserInfo({
          ...userInfo,
          nickname: data.nickname,
          avatar: data.avatar ? data.avatar : userInfo.avatar,
        });
        alert("프로필 변경이 완료되었습니다.");
        navigate("/home");
      } else {
        alert("프로필 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("Failed to update nickname:", error);
      alert("닉네임 변경에 실패했습니다.");
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }
  return (
    <StDiv>
      <StProfileBox>
        <StProfileTitle>프로필 수정</StProfileTitle>
        <StProfileImg src={userInfo.avatar} />
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
            name="file"
            onChange={(e) => {
              setNewImage(e.target.files[0]);
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
