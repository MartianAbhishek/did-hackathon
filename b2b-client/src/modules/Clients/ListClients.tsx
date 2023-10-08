import React from "react";
import { Table } from "@react-to-styled/table";
import getEllipsisTxt from "src/utils/getEllipsisText";
import Spinner from "src/components/Spinner";
import FlexContainer from "src/components/FlexContainer";
import styled from "styled-components";
import PrimaryButton from "src/components/PrimaryButton";

interface IPropType {
  // TODO: add proper types
  data?: any[];
  dataLoading?: boolean;
}

const Container = styled(FlexContainer)`
  flex-direction: column;
  background: ${({ theme }) => theme.colors.black[150]};
  padding: 1rem;
  border-radius: 20px;
`;

const Header = styled(FlexContainer)`
`;

const columns = [
  {
    header: "Address",
    Cell: ({ data: { address } }: any) => <span>{getEllipsisTxt(address)}</span>,
  },
  {
    header: "Name",
    Cell: ({ data: { name } }: any) => <span>{name}</span>,
  },
  {
    header: "DID Status",
    Cell: ({ data: { did_status } }: any) => <span>{did_status}</span>,
  },
  {
    header: "Timestamp",
    Cell: ({ data: { timestamp } }: any) => <span>{timestamp}</span>,
  },
];

function ListClients(props: IPropType) {
  const { data = [], dataLoading = false } = props;

  return (
    <Container>
      <Header>
      <h3>Active Clients</h3>
      <PrimaryButton width="10%">Add+</PrimaryButton>
      </Header>
      <Table data={data as any} columns={columns as any} />
      {dataLoading && (
        <Spinner style={{ marginLeft: "50%", marginTop: "2rem" }} />
      )}
      {data.length === 0 && <h3>No Clients!</h3>}
    </Container>
  );
}

export default ListClients;
