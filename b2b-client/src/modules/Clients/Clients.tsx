import React from "react";
import ListClients from "./ListClients";
import { ModuleKeys } from "./constants";
import AddClient from "./AddClient";

interface IPropType {
  state: string;
  module?: string;
}

function Clients(props: IPropType) {
  switch (props.module) {
    case ModuleKeys.addClient:
      return <AddClient />;
    default:
      return (
        <>
          <ListClients />
        </>
      );
  }
}

export default Clients;
