import React from "react";
import { Table } from "@react-to-styled/table";
import { ethers } from "ethers";
import getEllipsisTxt from "src/utils/getEllipsisText";
import Spinner from "src/components/Spinner";
import FlexContainer from "src/components/FlexContainer";
import styled from "styled-components";

const Container = styled(FlexContainer)`
  margin-top: 2rem;
  margin-bottom: 2rem;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.black[150]};
  padding: 1rem;
  border-radius: 20px;
`;

interface IPropType {
  transactions: ethers.providers.TransactionResponse[];
  txnLoading: boolean;
}

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

function AllTransactions(props: IPropType) {
  const { transactions, txnLoading } = props;

  return (
    <Container>
      <h3>Transaction History</h3>
      <Table data={transactions as any} columns={columns as any} />
      {txnLoading && (
        <Spinner style={{ marginTop: "2rem" }} />
      )}
    </Container>
  );
}

export default AllTransactions;
