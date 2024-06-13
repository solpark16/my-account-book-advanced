import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMonth } from "../redux/slices/selectedMonthSilce";
import { setExpensesList } from "../redux/slices/expensesListSlice";
import jsonApi from "../axios/jsonApi";
import { useQuery } from "@tanstack/react-query";

// component
const MonthsList = () => {
  // useSelector
  const { selectedMonth } = useSelector((state) => state.selectedMonth);
  const getExpenses = async () => {
    const response = await jsonApi.get("/expenses");
    return response.data;
  };

  const {
    data: expenses,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });
  // useDispatch
  const dispatch = useDispatch();

  // month 배열
  const monthsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // month 바뀔 때마다 로컬 스토리지에도 변경 및 expensesList 변경
  const changeMonthHandler = (number) => {
    window.localStorage.setItem("selectedMonth", number);
    dispatch(setSelectedMonth(number));
    const selectedMonthExpensesList = expenses.filter((expense) => {
      return +expense.date.slice(5, 7) === number;
    });
    dispatch(setExpensesList(selectedMonthExpensesList));
  };

  // selectedMonth가 null일 경우 1로 설정
  useEffect(() => {
    if (selectedMonth === null) {
      window.localStorage.setItem("selectedMonth", 1);
      dispatch(setSelectedMonth(1));
    }
  }, []);

  return (
    <StMonthsListDiv>
      {monthsList.map((month) => {
        return (
          <StMonthButton
            $clicked={month === +selectedMonth}
            onClick={() => changeMonthHandler(month)}
            key={month}
          >
            {month}월
          </StMonthButton>
        );
      })}
    </StMonthsListDiv>
  );
};

// styled-components
const StMonthsListDiv = styled.div`
  padding: 30px;
  border-radius: 30px;
  background-color: #fff;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const StMonthButton = styled.button`
  border-radius: 20px;
  font-size: 20px;
  border: none;
  width: 150px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
  color: ${(props) => (props.$clicked ? "#fff" : "#000")};
  background-color: ${(props) => (props.$clicked ? "#eb6530" : "#e1e1e1")};
  &:hover {
    background-color: ${(props) => (props.$clicked ? "#b64e25" : "darkgray")};
  }
`;

export default MonthsList;
