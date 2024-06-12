import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setExpenses } from "../redux/slices/expensesSlice";
import { useSelector, useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import jsonApi from "../axios/jsonApi";

// Detail Component
const Detail = () => {
  const queryClient = useQueryClient();

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { expenses } = useSelector((state) => state.expenses);
  // const { expense } = location.state.expense;
  // save ref
  const saveDateRef = useRef(expense.date);
  const saveItemRef = useRef(expense.item);
  const saveAmountRef = useRef(expense.amount);
  const saveDescriptionRef = useRef(expense.description);

  // 수정 함수 (개인)
  const handleDateInputChange = (e) => {
    saveDateRef.current = e.target.value;
  };
  const handleItemInputChange = (e) => {
    saveItemRef.current = e.target.value;
  };
  const handleAmountInputChange = (e) => {
    saveAmountRef.current = e.target.value;
  };
  const handleDescriptionInputChange = (e) => {
    saveDescriptionRef.current = e.target.value;
  };

  // 수정 함수 (전체)
  const handleSubmit = (e) => {
    e.preventDefault();
    const date = saveDateRef.current;
    const item = saveItemRef.current;
    const amount = saveAmountRef.current;
    const description = saveDescriptionRef.current;

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
    const updateExpense = {
      id: expense.id,
      date,
      item,
      amount: +amount,
      description,
    };
    // dispatch 사용해 전역관리 state 업데이트
    dispatch(
      setExpenses(
        expenses.map((expense) => {
          if (updateExpense.id !== expense.id) {
            return expense;
          } else if (updateExpense.id === expense.id) {
            return updateExpense;
          }
        })
      )
    );
    navigate(`/`);
  };

  // 삭제 함수
  const handleDelete = () => {
    confirm("정말로 삭제하시겠습니까?");
    const deleteExpenseId = expense.id;
    jsonApi.delete(`/expenses/${deleteExpenseId}`);
  };

  // 삭제 mutation
  const deleteMutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      navigate(`/home`);
      queryClient.invalidateQueries(["expenses"]);
    },
  });

  return (
    <StDiv>
      <StLabel>날짜</StLabel>
      <StInput
        placeholder="YYYY-MM-DD"
        type="text"
        defaultValue={expense.date}
        onChange={handleDateInputChange}
      />
      <StLabel>항목</StLabel>
      <StInput
        placeholder="지출 항목"
        type="text"
        defaultValue={expense.item}
        onChange={handleItemInputChange}
      />
      <StLabel>금액</StLabel>
      <StInput
        placeholder="지출 금액"
        type="number"
        defaultValue={expense.amount}
        onChange={handleAmountInputChange}
      />
      <StLabel>내용</StLabel>
      <StInput
        placeholder="지출 내용"
        type="text"
        defaultValue={expense.description}
        onChange={handleDescriptionInputChange}
      />
      <StBtnBox>
        <StButton $backColor="#1467ff" onClick={handleSubmit}>
          수정
        </StButton>
        <StButton
          $backColor="#ff2e2e"
          onClick={(e) => {
            e.preventDefault();
            deleteMutation.mutate();
          }}
        >
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
