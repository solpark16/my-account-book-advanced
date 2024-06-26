import React, { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import { postExpense } from "../lib/api/expense";

// component
const ExpenseForm = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

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
  const addExpenseHandler = (e) => {
    e.preventDefault();
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
    const newExpense = {
      id: uuidv4(),
      month: +date.slice(5, 7),
      date,
      item,
      amount: +amount,
      description,
      createdBy: user.userId,
      userId: user.userId,
    };

    // 기존 지출 항목들에 새로운 지출 항목 추가
    mutation.mutate(newExpense);

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
    mutationFn: postExpense,
    onSuccess: () => {
      alert("데이터 삽입 완료");
      queryClient.invalidateQueries(["expenses"]);
      Navigate(0);
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
    <form
      className="flex bg-white gap-5 justify-center flex-wrap p-30px rounded-[30px]"
      onSubmit={addExpenseHandler}
    >
      <div className="flex flex-col flex-1">
        <label>날짜</label>
        <input
          className="mt-[10px] rounded-[10px] p-[10px] w-full h-[30px] box-border text-base border border-solid border-input-border-gray"
          placeholder="YYYY-MM-DD"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col flex-1">
        <label>항목</label>
        <input
          className="mt-[10px] rounded-[10px] p-[10px] w-full h-[30px] box-border text-base border border-solid border-input-border-gray"
          placeholder="지출 항목"
          type="text"
          value={item}
          onChange={(e) => {
            setItem(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col flex-1">
        <label>금액</label>
        <input
          className="mt-[10px] rounded-[10px] p-[10px] w-full h-[30px] box-border text-base border border-solid border-input-border-gray"
          placeholder="지출 금액"
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col flex-1">
        <label>내용</label>
        <input
          className="mt-[10px] rounded-[10px] p-[10px] w-full h-[30px] box-border text-base border border-solid border-input-border-gray"
          placeholder="지출 내용"
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <button
        className="cursor-pointer px-5 py-10px border-none rounded-[5px] bg-[#49914b] text-white"
        type="submit"
      >
        저장
      </button>
    </form>
  );
};

export default ExpenseForm;
