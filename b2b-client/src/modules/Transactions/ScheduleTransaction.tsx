import React from "react";
import { useNavigate } from "react-router-dom";
import FlexContainer from "src/components/FlexContainer";
import PrimaryButton from "src/components/Buttons/PrimaryButton";
import styled from "styled-components";
import ScheduleTransactionForm from "./components/ScheduleTransactionForm";

const Container = styled(FlexContainer)`
  margin-bottom: 2rem;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.black[150]};
  padding: 1rem;
  border-radius: 20px;
`;

const Header = styled(FlexContainer)`
  justify-content: space-between;
`;

function ScheduleTransaction() {
  const navigate = useNavigate();

  const onBackClick = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Header>
        <h3>Schedule Transaction</h3>
        <PrimaryButton width="10%" onClick={onBackClick}>
          Back
        </PrimaryButton>
      </Header>
      <ScheduleTransactionForm setSendTransactionDetails = {() => {}} moveToNextPage={() => {}}/>
    </Container>
  );
}

export default ScheduleTransaction;
