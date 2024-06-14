import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getExpenses } from "../lib/api/expense";
import { useQuery } from "@tanstack/react-query";

// component
const ExpenseSummary = () => {
  // useSelector
  const { selectedMonth } = useSelector((state) => state.selectedMonth);
  const {
    data: expenses = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  const selectedMonthExpenses = expenses.filter((expense) => {
    return expense.month === +selectedMonth;
  });

  // 각 항목별 컬러 배열
  const graphColor = ["#007BFF", "#28A745", "#DC3545", "#FFC107", "#17A2B8"];

  // 월별 총 지출 계산
  const expensesSummary = selectedMonthExpenses.reduce((acc, cur) => {
    return acc + Number(cur.amount);
  }, 0);

  // 항목별 지출 금액 계산
  const expensesItemList = () => {
    const expensesItemList = {};
    selectedMonthExpenses.forEach((expense) => {
      if (Object.keys(expensesItemList).includes(expense.item)) {
        expensesItemList[expense.item] += +expense.amount;
      } else {
        expensesItemList[expense.item] = +expense.amount;
      }
    });

    return Object.entries(expensesItemList)
      .sort((a, b) => b[1] - a[1])
      .reduce((acc, cur, idx) => {
        if (idx < 4) {
          acc.push(cur);
        } else if (idx === 4) {
          acc.push(["기타", `${+cur[1]}`]);
        } else {
          acc[4][1] = +acc[4][1] + cur[1];
        }
        return acc;
      }, []);
  };

  return (
    <StDiv>
      <StTitle>
        {selectedMonth}월 총 지출: {expensesSummary.toLocaleString()}원
      </StTitle>
      <StGraph>
        {expensesItemList().map((item, idx) => {
          return (
            <StGraphItem
              key={item[0]}
              $backColor={graphColor[idx]}
              $width={((item[1] / expensesSummary) * 100).toFixed(2)}
            ></StGraphItem>
          );
        })}
      </StGraph>
      <StUl>
        {expensesItemList().map((item, idx) => {
          return (
            <StLi key={item[0]}>
              <StColorItem $backColor={graphColor[idx]}></StColorItem>
              {item[0]}: {item[1].toLocaleString()}원 (
              {((item[1] / expensesSummary) * 100).toFixed(2)}%)
            </StLi>
          );
        })}
      </StUl>
    </StDiv>
  );
};

// styled-components
const StDiv = styled.div`
  background-color: #fff;
  padding: 30px;
  display: flex;
  border-radius: 30px;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
const StUl = styled.ul`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 10px;
`;
const StLi = styled.li`
  display: flex;
  align-items: center;
`;
const StTitle = styled.p`
  font-size: 24px;
  font-weight: bold;
`;
const StGraph = styled.div`
  margin-top: 20px;
  overflow: hidden;
  display: flex;
  height: 50px;
  background-color: #e1e1e1;
  border-radius: 10px;
`;
const StGraphItem = styled.div`
  background-color: ${(props) => props.$backColor};
  box-sizing: border-box;
  height: 100%;
  width: ${(props) => props.$width}%;
`;
const StColorItem = styled.div`
  width: 20px;
  height: 10px;
  background-color: ${(props) => props.$backColor};
  margin-right: 8px;
`;

export default ExpenseSummary;
