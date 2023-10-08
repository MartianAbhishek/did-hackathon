import React, { useContext, useEffect, useMemo } from "react";
import { WalletConnectContext } from "../../context";
import LoginModule from "src/modules/Login";
import { device } from "src/styles/breakpoints";
import styled from "styled-components";
import FlexContainer from "src/components/FlexContainer";
import DashboardModule from "src/modules/Dashboard";

const Container = styled(FlexContainer)`
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${device.maxTablet} {
    padding: 20px 0;
  }
`;

const Home = () => {
  const {
    account,
    active,
    activateProvider,
    activateBrowserWallet,
    error,
    loading,
    deactivate,
  } = useContext(WalletConnectContext);


  if (!account && !loading) {
    return (
      <Container>
        <LoginModule />
      </Container>
    );
  }

  return <DashboardModule />;
};

export default Home;
