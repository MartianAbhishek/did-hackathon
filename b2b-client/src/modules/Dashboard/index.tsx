import React, { useContext, useEffect, useState } from "react";
import FlexContainer from "src/components/FlexContainer";
import NavBar from "src/components/NavBar";
import { device } from "src/styles/breakpoints";
import styled from "styled-components";
import { Features, NavBarOptions } from "./constants";
import { WalletConnectContext } from "src/context";
import { useNavigate, useSearchParams } from "react-router-dom";
import Transactions from "../Transactions/Transactions";
import Clients from "../Clients/Clients";

const Container = styled(FlexContainer)`
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${device.maxTablet} {
    padding: 20px 0;
  }
`;

const ModuleContainer = styled.div`
  margin-left: 5rem;
  margin-right: 5rem;
  flex-direction: column;
  height: 100%;

  @media ${device.maxTablet} {
    padding: 20px 0;
  }
`;

function DashboardModule() {
  const { account } = useContext(WalletConnectContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState<string>(
    NavBarOptions[0].key
  );
  const [module, setModule] = useState<any>(<Transactions state={"default"} />);

  useEffect(() => {
    moduleSelector(
      searchParams.get("feature")!,
      searchParams.get("state")!,
      searchParams.get("module")!
    );
  }, [searchParams, account]);

  const moduleSelector = (
    feature: string,
    state: string,
    module: string | undefined
  ) => {
    setSelectedOption(feature);
    switch (feature) {
      case Features.dashboard:
        setModule(<Transactions state={state} module={module} />);
        break;
      case Features.clients:
        setModule(<Clients state={state} module={module} />);
        break;
      default:
        setModule(<h1>Coming Soon!</h1>);
    }
  };

  return (
    <>
      <Container>
        <NavBar
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          filterOptions={NavBarOptions}
          username={account}
        />
      </Container>
      <ModuleContainer>{module}</ModuleContainer>
    </>
  );
}

export default DashboardModule;
