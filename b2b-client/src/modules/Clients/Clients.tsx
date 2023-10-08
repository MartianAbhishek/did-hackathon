import React from "react";
import ListClients from "./ListClients";

interface IPropType {
  state: string;
}

function Clients(props: IPropType) {
  return (
    <>
      <ListClients data={[]} dataLoading={false} />
    </>
  );
}

export default Clients;
