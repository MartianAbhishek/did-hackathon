import React, { useContext, useEffect, useState } from "react";
import FlexContainer from "src/components/FlexContainer";
import Input from "src/components/Input";
import PrimaryButton from "src/components/Buttons/PrimaryButton";
import Typography from "src/components/Typography";
import { FormsResponsiveQuery } from "src/styles/mediaQueryMixins";
import { Storage } from "src/utils/Storage";

import styled from "styled-components";
import { WalletConnectContext } from "src/context";
import { DidStatusKeys } from "src/constants/didStatus";
import { useNavigate } from "react-router-dom";
import { getClientKey } from "../utils";
import { guidGenerator } from "src/utils/guidGenerator";

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

const AddClientForm = () => {
  const { account } = useContext(WalletConnectContext);
  const navigate = useNavigate();

  const [nameForm, setNameForm] = useState<string>("");
  const [addressForm, setAddressForm] = useState<string>("");
  const [descriptionForm, setDescriptionForm] = useState<string>("");
  const [tokenForm, setTokenForm] = useState<string>("");

  const onClickSubmit = () => {
    const storageKey = getClientKey(account || "");
    const currentData = Storage.get(storageKey) || {};

    const id = guidGenerator();

    const data = {
      id,
      addedBy: account,
      name: nameForm,
      address: addressForm,
      description: descriptionForm,
      didToken: tokenForm,
      didStatus: DidStatusKeys.inactive,
      didStatusCheckTimestamp: Date.now(),
      timestamp: Date.now(),
    };

    currentData[id] = data;

    // Set data in storage
    Storage.set(storageKey, currentData);
    alert("Client added successfully!");
    navigate(-1);
  };

  return (
    <Container data-testid="send-form">
      <Typography variant="ts16b" colorCode={["black", 900]}>
        Name
      </Typography>
      <FlexContainer>
        <Input
          value={nameForm}
          onChange={(value) => setNameForm(value)}
          placeholder="Enter Client Name"
        />
      </FlexContainer>

      <Typography variant="ts16b" colorCode={["black", 900]}>
        Address
      </Typography>
      <FlexContainer>
        <Input
          value={addressForm}
          onChange={(value) => setAddressForm(value)}
          placeholder="Enter Client Address"
        />
      </FlexContainer>

      <Typography variant="ts16b" colorCode={["black", 900]}>
        Description
      </Typography>
      <FlexContainer>
        <Input
          value={descriptionForm}
          onChange={(value) => setDescriptionForm(value)}
          placeholder="Enter Client Description"
        />
      </FlexContainer>

      <Typography variant="ts16b" colorCode={["black", 900]}>
        DID Verifier (JWT Token)
      </Typography>
      <FlexContainer>
        <Input
          value={tokenForm}
          onChange={(value) => setTokenForm(value)}
          placeholder="Enter Client DID Verifier"
        />
      </FlexContainer>

      <FlexContainer>
        <PrimaryButton width="30%" onClick={onClickSubmit}>
          Submit
        </PrimaryButton>
      </FlexContainer>
    </Container>
  );
};

export default AddClientForm;
