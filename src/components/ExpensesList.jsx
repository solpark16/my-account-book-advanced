import React, { useEffect } from "react";
import ExpenseItem from "./ExpenseItem";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../lib/api/expense";

// component
const ExpensesList = () => {
  // useSelector
  const { selectedMonth } = useSelector((state) => state.selectedMonth);
  // useDispatch
  const dispatch = useDispatch();

  const {
    data: expenses = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  // form을 통해 추가될 때마다 expensesList 변경으로 바로 화면에 나오도록 함.

  const selectedMonthExpenses = expenses.filter((expense) => {
    return expense.month === +selectedMonth;
  });
  if (isPending) {
    return <div>로딩중입니다...</div>;
  }

  if (isError) {
    return <div>데이터 조회 중 오류가 발생했습니다.</div>;
  }
  return (
    <StUl>
      {selectedMonthExpenses.length > 0 ? (
        [...selectedMonthExpenses]
          .sort((a, b) => {
            return b.date.split("-").join("") - a.date.split("-").join("");
          })
          .map((expense) => {
            return <ExpenseItem key={expense.id} expense={expense} />;
          })
      ) : (
        <StDiv>지출이 없습니다.</StDiv>
      )}
    </StUl>
  );
};

// styled-components
const StUl = styled.ul`
  background-color: #fff;
  padding: 30px;
  display: flex;
  border-radius: 30px;
  flex-direction: column;
  gap: 10px;
`;
const StDiv = styled.div`
  background-color: #f9f9f9;
  text-align: center;
  padding: 30px;
  color: #989898;
  border-radius: 20px;
`;

export default ExpensesList;
