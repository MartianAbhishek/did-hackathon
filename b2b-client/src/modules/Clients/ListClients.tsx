import React, { useContext, useEffect, useState } from "react";
import { Table } from "@react-to-styled/table";
import getEllipsisTxt from "src/utils/getEllipsisText";
import Spinner from "src/components/Spinner";
import FlexContainer from "src/components/FlexContainer";
import styled from "styled-components";
import PrimaryButton from "src/components/Buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { Queries } from "src/modules/Dashboard/constants";
import { getClientKey } from "./utils";
import { WalletConnectContext } from "src/context";
import { Storage } from "src/utils/Storage";
import { DidStatusValue } from "src/constants/didStatus";
import DangerButton from "src/components/Buttons/DangerButton";

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
  justify-content: space-between;
`;

const removeClient = (d: any) => {
  try {
    const storageKey = getClientKey(d.addedBy || "");
    let data = Storage.get(storageKey) || {};

    if (!(d.id in data)) return;
    delete data[d.id];

    Storage.set(storageKey, data);
    // reload

    window.location.reload();
  } catch (err) {
    console.error({
      err,
      type: "REMOVE_CLIENT",
    });
  }
};

const columns = [
  {
    header: "Name",
    Cell: ({ data: { name } }: any) => <span>{name}</span>,
  },
  {
    header: "Description",
    Cell: ({ data: { description } }: any) => (
      <span>{getEllipsisTxt(description)}</span>
    ),
  },
  {
    header: "Address",
    Cell: ({ data: { address } }: any) => (
      <span>{getEllipsisTxt(address)}</span>
    ),
  },
  {
    header: "DID Status",
    Cell: ({ data: { didStatus } }: any) => (
      <span>
        {DidStatusValue[didStatus as keyof typeof DidStatusValue] ||
          "In Active"}
      </span>
    ),
  },
  {
    header: "Timestamp",
    Cell: ({ data: { timestamp } }: any) => (
      <span>{new Date(timestamp!).toString()}</span>
    ),
  },
  {
    header: "Action",
    Cell: ({ data }: any) => (
      <DangerButton onClick={() => removeClient(data)}>Remove</DangerButton>
    ),
  },
];

function ListClients(props: IPropType) {
  const [dataLoading, setDataLoading] = useState(false);
  const [data, setData] = useState([]);
  const { account } = useContext(WalletConnectContext);
  const navigate = useNavigate();

  const onClick = () => {
    navigate({
      pathname: "/",
      search: Queries.addDidClient,
    });
  };

  const fetchClients = () => {
    try {
      setDataLoading(true);
      const storageKey = getClientKey(account!);
      let data = Storage.get(storageKey) || {};
      data = Object.values(data);
      data.sort((a: any, b: any) => b.timestamp - a.timestamp);
      setData(data);
    } catch (err) {
      console.error({
        err,
        type: "LIST_CLIENTS",
      });
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [account]);

  return (
    <Container>
      <Header>
        <h3>Active Clients</h3>
        <PrimaryButton width="10%" onClick={onClick}>
          Add+
        </PrimaryButton>
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
