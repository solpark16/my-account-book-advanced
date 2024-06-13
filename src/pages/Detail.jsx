import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import jsonApi from "../axios/jsonApi";
import { getExpense, patchExpense, deleteExpense } from "../lib/api/expense";

// Detail Component
const Detail = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: expense,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["expenses", id],
    queryFn: getExpense,
  });

  // save ref
  const [date, setDate] = useState("");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (expense) {
      setDate(expense.date);
      setItem(expense.item);
      setAmount(expense.amount);
      setDescription(expense.description);
    }
  }, [expense]);

  // 수정 mutation
  const updateMutation = useMutation({
    mutationFn: patchExpense,
    onSuccess: () => {
      navigate("/home");
    },
  });

  // 수정 함수 (전체)
  const handleSubmit = (e) => {
    e.preventDefault();
    // 유효성 검사
    const format =
      /^(19[7-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if (!format.test(date.trim())) {
      alert("날짜를 YYYY-MM-DD 형식으로 입력해주세요.");
      return;
    }
    if (isNaN(amount)) {
      alert("금액은 숫자로 입력해주세요.");
      return;
    }
    if (!item.trim() || !description.trim()) {
      alert("항목, 금액, 내용을 모두 입력해주세요.");
      return;
    }
    // update할 객체
    const updatedExpense = {
      id,
      date,
      item,
      amount: +amount,
      month: expense.month,
      description,
      createdBy: expense.createdBy,
    };

    updateMutation.mutate(updatedExpense);
  };

  // 삭제 mutation
  const deleteMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      navigate("/home");
    },
  });

  // 삭제 함수
  const handleDelete = () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isPending) {
    return <div>로딩중입니다...</div>;
  }

  if (isError) {
    return <div>데이터 조회 중 오류가 발생했습니다.</div>;
  }
  return (
    <StDiv>
      <StLabel>날짜</StLabel>
      <StInput
        placeholder="YYYY-MM-DD"
        type="text"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <StLabel>항목</StLabel>
      <StInput
        placeholder="지출 항목"
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <StLabel>금액</StLabel>
      <StInput
        placeholder="지출 금액"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <StLabel>내용</StLabel>
      <StInput
        placeholder="지출 내용"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <StBtnBox>
        <StButton $backColor="#1467ff" onClick={handleSubmit}>
          수정
        </StButton>
        <StButton $backColor="#ff2e2e" onClick={handleDelete}>
          삭제
        </StButton>
        <StButton
          $backColor="#6e6e6e"
          onClick={() => {
            navigate(`/`);
          }}
        >
          뒤로 가기
        </StButton>
      </StBtnBox>
    </StDiv>
  );
};

// styled-components
const StDiv = styled.div`
  background-color: #fff;
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
  padding: 30px;
  box-sizing: border-box;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
`;
const StLabel = styled.label`
  margin-bottom: 10px;
`;
const StInput = styled.input`
  border-radius: 10px;
  border: 1px solid #c4c4c4;
  margin-bottom: 10px;
  height: 30px;
  padding: 10px;
  font-size: 16px;
`;
const StBtnBox = styled.div`
  display: flex;
  gap: 10px;
`;
const StButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.$backColor};
  color: #fff;
  cursor: pointer;
`;

export default Detail;
