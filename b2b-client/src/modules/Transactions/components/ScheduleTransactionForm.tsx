import React, { useEffect, useState } from "react";
import FlexContainer from "src/components/FlexContainer";
import Input from "src/components/Input";
import PrimaryButton from "src/components/Buttons/PrimaryButton";
import Typography from "src/components/Typography";
import { FormsResponsiveQuery } from "src/styles/mediaQueryMixins";

import styled from "styled-components";

interface IPropType {
  setSendTransactionDetails: (data: any) => void;
  moveToNextPage: () => void;
}

const Container = styled(FlexContainer)`
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
  padding: 1rem;
  margin: 1rem;
  background: ${({ theme }) => theme.colors.black[100]};
  border-radius: 24px;
  gap: 12px;

  ${FormsResponsiveQuery}
`;

const ScheduleTransactionForm = (props: IPropType) => {
  const { moveToNextPage, setSendTransactionDetails } = props;

  return (
    <Container data-testid="send-form">
      <FlexContainer
        // @ts-ignore
        css={`
          margin-bottom: 12px;
          gap: 8px;
        `}
      >
        {/* <AccountSelectorModule
          selectedAccount={selectedAccount}
          setSelectedAccount={setSelectedAccount}
          blockchain={selectedBlockchain}
        /> */}
      </FlexContainer>
      <Typography
        variant="ts16b"
        colorCode={["black", 900]}
        data-testid="receiver-input-title"
      >
        Send To
      </Typography>
      <FlexContainer>
        <Input
          data-testid="receiver-address-input"
          value={""}
          onChange={(value) => {}}
          placeholder="Enter Receiver's Address"
        />
      </FlexContainer>

      <Typography
        variant="ts16b"
        colorCode={["black", 900]}
        data-testid="token-selector-title"
      >
        Send Coin
      </Typography>
      <FlexContainer
        // @ts-ignore
        css={`
          gap: 8px;
        `}
      >
        <Input
          data-testid="amount-input"
          value={""}
          onChange={(value) => {}}
          placeholder="Enter Amount"
          type="number"
        />
      </FlexContainer>
      <Typography variant="ts14r" colorCode={["black", 800]}>
        Available Balance: 0.02
      </Typography>
      <FlexContainer>
      <PrimaryButton
        data-testid="preview-button"
        width="30%"
        onClick={() => {}}
      >
        Preview Send
      </PrimaryButton>
      </FlexContainer>
    </Container>
  );
};

export default ScheduleTransactionForm;
