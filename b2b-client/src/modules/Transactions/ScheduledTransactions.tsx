import React from "react";
import { Table } from "@react-to-styled/table";
import getEllipsisTxt from "src/utils/getEllipsisText";
import Spinner from "src/components/Spinner";
import FlexContainer from "src/components/FlexContainer";
import styled from "styled-components";
import PrimaryButton from "src/components/Buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { Queries } from "src/modules/Dashboard/constants";

interface IPropType {
  // TODO: add proper types
  transactions?: any[];
  txnLoading?: boolean;
}

const Container = styled(FlexContainer)`
  flex-direction: column;
  background: ${({ theme }) => theme.colors.black[150]};
  padding: 1rem;
  border-radius: 20px;
`;

const Header = styled(FlexContainer)`
  justify-content: space-between;
`;

const columns = [
  {
    header: "From",
    Cell: ({ data: { from } }: any) => <span>{getEllipsisTxt(from)}</span>,
  },
  {
    header: "To",
    Cell: ({ data: { to } }: any) => <span>{getEllipsisTxt(to)}</span>,
  },
  {
    header: "Timestamp",
    Cell: ({ data: { timestamp } }: any) => <span>{timestamp}</span>,
  },
  {
    header: "Gas Fees",
    Cell: ({ data: { gasPrice } }: any) => <span>{gasPrice}</span>,
  },
  {
    header: "Value",
    Cell: ({ data: { value } }: any) => <span>{value}</span>,
  },
  {
    header: "Status",
    Cell: ({ data: { status } }: any) => <span>{status}</span>,
  },
];

function ScheduledTransactions(props: IPropType) {
  const { transactions = [], txnLoading = false } = props;
  const navigate = useNavigate();

  const onClick = () => {
    navigate({
      pathname: '/',
      search: Queries.addScheduledTxn,
    })
  }

  return (
    <Container>
      <Header>
        <h3>Scheduled Transactions</h3>
        <PrimaryButton width="10%" onClick={onClick}>ADD+</PrimaryButton>
      </Header>
      <Table data={transactions as any} columns={columns as any} />
      {txnLoading && (
        <Spinner style={{ marginLeft: "50%", marginTop: "2rem" }} />
      )}
      {transactions.length === 0 && <h3>No Scheduled Transactions!</h3>}
    </Container>
  );
}

export default ScheduledTransactions;
