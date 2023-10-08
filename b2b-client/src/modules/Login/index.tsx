import React, { useContext, useEffect, useState } from "react";

import styled from "styled-components";

import FlexContainer from "src/components/FlexContainer";
import Icon from "src/components/Icon";
import PrimaryButton from "src/components/PrimaryButton";
import Spinner from "src/components/Spinner";
import Typography from "src/components/Typography";
import ChromeWebstoreIcon from "src/modules/Login/icons/chrome-web-store.webp";
import { WalletConnectContext } from "src/context";
import openUrl from "src/utils/openUrl";
import { ExtensionDownloadUrl, TextsContent } from "./constants";

const Container = styled(FlexContainer)`
  max-width: 496px;
  padding: 24px 40px;
  flex-direction: column;
  gap: 24px;
  background: ${({ theme }) => theme.colors.black[200]};
  border-radius: 24px;
  .extension-link {
    cursor: pointer;
  }
`;

const OrTextContainer = styled(FlexContainer)`
  width: 320px;
  max-width: 80%;
  gap: 24px;

  &:before {
    display: block;
    content: "";
    width: 100%;
    background: ${({ theme }) => theme.colors.black[200]};
    height: 1px;
  }

  &:after {
    display: block;
    content: "";
    width: 100%;
    background: ${({ theme }) => theme.colors.black[200]};
    height: 1px;
  }
`;

const BottomDiv = styled(FlexContainer)`
  flex-direction: column;
  gap: 12px;
`;

const LoginModule = () => {
  const {
    account,
    active,
    activateProvider,
    activateBrowserWallet,
    error,
    loading,
    deactivate,
  } = useContext(WalletConnectContext);

  useEffect(() => {
    if (!active && !error) {
      activateProvider();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connectWallet = async () => {
    await activateBrowserWallet();
  };

  return (
    <Container data-testid="connect-wallet-prompt">
      {/* @ts-ignore */}
      {/* <Logo className="icon" width={30} height={30} /> */}
      <Typography variant="ts20b" colorCode={["black", 900]}>
          {TextsContent?.title}
        </Typography>
        <Typography
          variant="ts14r"
          style={{ textAlign: "center" }}
          colorCode={["black", 600]}
        >
          {TextsContent?.lightSubtext1} <br />
          {TextsContent?.lightSubtext2}
        </Typography>
      <BottomDiv>
      <PrimaryButton
        css={`
          max-width: 80%;
        `}
        onClick={connectWallet}
      >
        {loading ? <Spinner /> : error ? 'Approve connection request from wallet' : TextsContent?.connectWallet}
      </PrimaryButton>
      </BottomDiv>
    </Container>
  );
};

export default LoginModule;
