export const Features = {
  dashboard: "dashboard",
  clients: "clients",
  did: "requests",
};

export const Queries = {
  dashboard: "?feature=dashboard&state=default",
  manageClients: "?feature=clients&state=manage",
  didRequest: "?feature=requests&state=requests",
  addScheduledTxn: "?feature=dashboard&state=default&module=schedule-txn",
  addDidClient: "?feature=clients&state=manage&module=add-client",
};

export const NavBarOptions = [
  {
    key: "dashboard",
    title: "Dashboard",
    query: Queries.dashboard,
    pathname: "/",
  },
  {
    key: "clients",
    title: "Clients",
    query: Queries.manageClients,
    pathname: "/",
  },
  {
    key: "requests",
    title: "Client Requests",
    query: Queries.didRequest,
    pathname: "/",
  },
];
