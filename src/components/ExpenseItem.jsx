import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// component
const ExpenseItem = ({ expense }) => {
  // useNavigate
  const navigate = useNavigate();
  const { id, date, item, description, amount, createdBy } = expense;
  // expense를 넘기면서 해당 id를 가진 detail 페이지로 이동하는 함수
  const onClickLiHandler = (expense) => {
    navigate(`/detail/${id}`, {
      state: {
        expense: { expense },
      },
    });
  };
  return (
    <StLi onClick={() => onClickLiHandler(expense)}>
      <StItemLeft>
        <p>{date}</p>
        <StDescription>
          {item} - {description} (by {createdBy})
        </StDescription>
      </StItemLeft>
      <StItemRight>{amount.toLocaleString()}원</StItemRight>
    </StLi>
  );
};

// styled-components
const StLi = styled.li`
  background-color: #f9f9f9;
  line-height: 1.5;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  border-radius: 20px;
  transition: 0.3s;
  &:hover {
    transform: scale(1.02);
  }
`;
const StDescription = styled.p`
  color: #eb6530;
  font-weight: bold;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StItemLeft = styled.div`
  overflow: hidden;
  white-space: nowrap;
`;
const StItemRight = styled.div`
  color: #eb6530;
  font-weight: bold;
  font-size: 18px;
  white-space: nowrap;
`;

export default ExpenseItem;
