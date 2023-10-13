import React, { useContext, useEffect, useState } from "react";
import FlexContainer from "src/components/FlexContainer";
import Input from "src/components/Input";
import PrimaryButton from "src/components/Buttons/PrimaryButton";
import Typography from "src/components/Typography";
import { FormsResponsiveQuery } from "src/styles/mediaQueryMixins";

import styled from "styled-components";
import Dropdown from "src/components/Dropdown";
import useThemeStore from "src/hooks/useThemeStore";
import THEME_TYPES from "src/constants/themeTypes";
import { lightModeColors } from "src/tokens/colors/color";
import { getClientKey } from "src/modules/Clients/utils";
import { WalletConnectContext } from "src/context";
import { Storage } from "src/utils/Storage";
import selectorStyleMixin from "src/styles/selectorsStyleMixin";
import { ethSdk } from "src/utils/EthSdk";
import Spinner from "src/components/Spinner";
import { DidStatusValue } from "src/constants";
import getEllipsisTxt from "src/utils/getEllipsisText";

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

const DropdownMainContainer = styled(FlexContainer)`
  ${selectorStyleMixin}
  height: 56px;
  width: 98%;
  boarder-color: black;
  border-radius: 10px;
  padding: 0px 12px;

  color: ${({ theme }) => theme.colors.black[800]};

  &:focus {
    border-color: ${({ theme }) => theme.colors.black[600]};
  }

  &:placeholder {
    color: ${({ theme }) => theme.colors.black[500]};
  }

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const DropdownContent = styled(FlexContainer)<{ currentTheme: string }>`
  flex-direction: column;
  align-items: flex-start;
  padding: 12px;
  width: 100%;
  gap: 8px;
  background: ${({ theme, currentTheme }) =>
    currentTheme === THEME_TYPES.THEME_LIGHT
      ? theme.colors.black[100]
      : lightModeColors.black[800]};

  .client-display {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    width: 100%;
    border-radius: 18px;
    cursor: pointer;
    padding: 6px 8px;

    transition: all 0.3s;

    &:hover {
      background: ${({ theme }) => theme.colors.black[150]};
    }

    .check-icon {
      margin-left: auto;
    }
  }
`;

interface IMainComponentPropType {
  selectedClient: any;
  defaultTitle: string;
}

interface IDropdownComponentPropType {
  selectedClient: any;
  setSelectedClient: (client: any) => void;
  closeDropdown: () => void;
  setTotalClients: (val: number) => void;
  dropdownOpen: Boolean;
}

const MainComponent = (props: IMainComponentPropType) => {
  const { selectedClient, defaultTitle } = props;

  return (
    <DropdownMainContainer>
      <Typography variant="ts14r" colorCode={["black", 800]}>
        {selectedClient.name
          ? `${selectedClient.name} (${getEllipsisTxt(selectedClient.address)})`
          : defaultTitle}
      </Typography>
    </DropdownMainContainer>
  );
};

const DropdownComponent = (props: IDropdownComponentPropType) => {
  const {
    selectedClient,
    setSelectedClient,
    closeDropdown,
    setTotalClients,
  } = props;
  const [data, setData] = useState({});
  const { account } = useContext(WalletConnectContext);

  const currentTheme = useThemeStore((state) => state.theme);

  const fetchClients = () => {
    try {
      const storageKey = getClientKey(account!);
      let data = Storage.get(storageKey) || {};
      data = Object.values(data);
      data.sort((a: any, b: any) => b.timestamp - a.timestamp);
      setData(data);

      if (!data) {
        setTotalClients(0);
        return;
      }

      setTotalClients(data.length || 0);
    } catch (err) {
      console.error({
        err,
        type: "LIST_CLIENTS",
      });
    }
  };

  useEffect(() => {
    fetchClients();
  }, [account]);
  return (
    <DropdownContent currentTheme={currentTheme}>
      {Object.values(data).map((client: any) => (
        <div
          key={client.id}
          className="client-display"
          onClick={() => {
            setSelectedClient(client);
            closeDropdown();
          }}
          role="presentation"
        >
          <Typography variant="ts14r" colorCode={["black", 800]}>
            {`${client.name} (${getEllipsisTxt(client.address)})`}
          </Typography>
        </div>
      ))}
    </DropdownContent>
  );
};

const ScheduleTransactionForm = (props: IPropType) => {
  const { account } = useContext(WalletConnectContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>({});
  const [totalClients, setTotalClients] = useState(0);

  const [balance, setBalance] = useState("0");
  const [balanceLoading, setBalanceLoading] = useState(false);

  const [amount, setAmount] = useState("0");

  const onClickSubmit = async () => {
    console.log(selectedClient, balance, amount);
  };

  const fetchBalance = async () => {
    try {
      setBalanceLoading(true);
      const bal = await ethSdk.getFormattedAccountBalance(account!);
      setBalance(bal);
    } catch (err) {
      console.error(err);
    } finally {
      setBalanceLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [account]);

  return (
    <Container>
      <Typography variant="ts16b" colorCode={["black", 900]}>
        Send To
      </Typography>

      <Dropdown
        dropdownTopOffset="66px"
        showDropdownArrow
        width="100%"
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        mainComponent={
          <MainComponent
            selectedClient={selectedClient}
            defaultTitle={`Select Client (${totalClients})`}
          />
        }
        dropdownComponent={
          <DropdownComponent
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient!}
            closeDropdown={() => setDropdownOpen(false)}
            setTotalClients={setTotalClients}
            dropdownOpen={dropdownOpen}
          />
        }
      />

      {selectedClient.didStatus && (
        <Typography variant="ts16b" colorCode={["black", 900]}>
          DID Status:{" "}
          {DidStatusValue[
            selectedClient.didStatus as keyof typeof DidStatusValue
          ] || "Inactive"}
        </Typography>
      )}

      <Typography variant="ts16b" colorCode={["black", 900]}>
        Send Coin
      </Typography>
      <FlexContainer>
        <Input
          data-testid="amount-input"
          value={amount}
          onChange={(value) => setAmount(value)}
          placeholder="Enter Amount"
          type="number"
        />
      </FlexContainer>
      <Typography variant="ts14r" colorCode={["black", 800]}>
        Available Balance: {balanceLoading ? <Spinner /> : balance}
      </Typography>
      <FlexContainer>
        <PrimaryButton
          data-testid="preview-button"
          width="30%"
          onClick={onClickSubmit}
        >
          Submit
        </PrimaryButton>
      </FlexContainer>
    </Container>
  );
};

export default ScheduleTransactionForm;
