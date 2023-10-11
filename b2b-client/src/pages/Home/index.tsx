import React, { useContext, useEffect, useMemo } from "react";
import { WalletConnectContext } from "../../context";
import LoginModule from "src/modules/Login";
import { device } from "src/styles/breakpoints";
import styled from "styled-components";
import FlexContainer from "src/components/FlexContainer";
import DashboardModule from "src/modules/Dashboard";
import { useNavigate, useSearchParams } from "react-router-dom";

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

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();


  useEffect(() => {
    if(!searchParams.get("feature")) {
      // push new state
      navigate({
        pathname: '/',
        search: '?feature=dashboard&state=default',
      });
    }
  }, [])


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
