import React from "react";
import { Table } from "@react-to-styled/table";
import getEllipsisTxt from "src/utils/getEllipsisText";
import Spinner from "src/components/Spinner";
import FlexContainer from "src/components/FlexContainer";
import styled from "styled-components";

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

  return (
    <Container>
      <h3>Scheduled Transactions</h3>
      <Table data={transactions as any} columns={columns as any} />
      {txnLoading && (
        <Spinner style={{ marginLeft: "50%", marginTop: "2rem" }} />
      )}
      {transactions.length === 0 && <h3>No Scheduled Transactions!</h3>}
    </Container>
  );
}

export default ScheduledTransactions;
