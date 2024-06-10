import styled from "styled-components";
import ExpenseForm from "../components/ExpenseForm";
import MonthsList from "../components/MonthsList";
import ExpensesList from "../components/ExpensesList";
import ExpenseSummary from "../components/ExpenseSummary";

const Home = () => {
  return (
    <StDiv>
      <ExpenseForm />
      <MonthsList />
      <ExpenseSummary />
      <ExpensesList />
    </StDiv>
  );
};

// styled-components
const StDiv = styled.div`
  max-width: 1200px;
  min-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export default Home;
