import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import jsonApi from "../axios/jsonApi";
import { AuthContext } from "../context/AuthContext";
import authApi from "../axios/authApi";

// component
const ExpenseForm = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const queryClient = useQueryClient();

  // 올릴 때 createdBy 작성자 나와야해서 가져온 유저정보. 나중에 전역적으로 리팩토링 할 수 있을지도
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const { data } = await authApi.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        logout();
      }
    };
    fetchUserInfo();
  }, [isAuthenticated]);

  // useSelector
  const { selectedMonth } = useSelector((state) => state.selectedMonth);

  // useState
  const [date, setDate] = useState(() => {
    // YYYY-MM-DD 형식
    return selectedMonth >= 10
      ? `2024-${selectedMonth}-01`
      : `2024-0${selectedMonth}-01`;
  });
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  // 지출 항목 추가 이벤트 함수
  const addExpenseHandler = async (newExpense) => {
    // 유효성 검사
    const format =
      /^(19[7-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if (!format.test(date.trim())) {
      alert("날짜를 YYYY-MM-DD 형식으로 입력해주세요.");
      return;
    }
    if (isNaN(amount) || !amount.trim()) {
      alert("금액은 숫자로 입력해주세요.");
      return;
    }
    if (!item.trim() || !description.trim()) {
      alert("항목, 금액, 내용을 모두 입력해주세요.");
      return;
    }

    // 기존 지출 항목들에 새로운 지출 항목 추가
    await jsonApi.post("/expenses", newExpense);

    // 각 인풋 초기화
    setDate(() => {
      return selectedMonth >= 10
        ? `2024-${selectedMonth}-01`
        : `2024-0${selectedMonth}-01`;
    });
    setItem("");
    setAmount("");
    setDescription("");
  };

  const mutation = useMutation({
    mutationFn: addExpenseHandler,
    onSuccess: () => {
      alert("데이터 삽입 완료");
      queryClient.invalidateQueries(["expenses"]);
    },
  });

  // selectedMonth 바뀔 때마다 input의 month 변경
  useEffect(() => {
    setDate(() => {
      return selectedMonth >= 10
        ? `2024-${selectedMonth}-01`
        : `2024-0${selectedMonth}-01`;
    });
  }, [selectedMonth]);

  return (
    <StForm
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate({
          id: uuidv4(),
          date,
          item,
          amount: +amount,
          description,
          createdBy: userInfo.nickname,
        });
      }}
    >
      <StInputBox>
        <label>날짜</label>
        <StInput
          placeholder="YYYY-MM-DD"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </StInputBox>
      <StInputBox>
        <label>항목</label>
        <StInput
          placeholder="지출 항목"
          type="text"
          value={item}
          onChange={(e) => {
            setItem(e.target.value);
          }}
        />
      </StInputBox>
      <StInputBox>
        <label>금액</label>
        <StInput
          placeholder="지출 금액"
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </StInputBox>
      <StInputBox>
        <label>내용</label>
        <StInput
          placeholder="지출 내용"
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </StInputBox>
      <StButton type="submit">저장</StButton>
    </StForm>
  );
};

// styled-components
const StForm = styled.form`
  background-color: #fff;
  border-radius: 30px;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;
const StInputBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const StInput = styled.input`
  margin-top: 10px;
  border-radius: 10px;
  box-sizing: border-box;
  border: 1px solid #c4c4c4;
  height: 30px;
  padding: 10px;
  font-size: 16px;
  width: 100%;
`;
const StButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #49914b;
  color: #fff;
  cursor: pointer;
`;

export default ExpenseForm;
