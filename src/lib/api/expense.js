import jsonApi from "../../axios/jsonApi";

export const getExpenses = async () => {
  try {
    const response = await jsonApi.get("/expenses");
    return response.data;
  } catch (err) {
    console.log(err);
    alert("지출 데이터를 받아오지 못했습니다.");
  }
};

export const getExpense = async ({ queryKey }) => {
  try {
    const response = await jsonApi.get(`/expenses/${queryKey[1]}`);
    return response.data;
  } catch (err) {
    console.log(err);
    alert("지출 데이터를 받아오지 못했습니다.");
  }
};

export const postExpense = async (newExpense) => {
  try {
    await jsonApi.post("/expenses", newExpense);
  } catch (err) {
    console.log(err);
    alert("지출 등록이 실패하였습니다.");
  }
};

export const patchExpense = async (updatedExpense) => {
  const { id, ...rest } = updatedExpense;
  try {
    await jsonApi.patch(`/expenses/${id}`, rest);
  } catch (err) {
    console.log(err);
    alert("지출 수정이 실패하였습니다.");
  }
};

export const deleteExpense = async (id) => {
  try {
    await jsonApi.delete(`/expenses/${id}`);
  } catch (err) {
    console.log(err);
    alert("지출 삭제가 실패하였습니다.");
  }
};
