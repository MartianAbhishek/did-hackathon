export const Features = {
  dashboard: "dashboard",
  clients: "clients",
  did: "did",
};

export const NavBarOptions = [
  {
    key: "dashboard",
    title: "Dashboard",
    query: "?feature=dashboard&state=default",
    pathname: "/",
  },
  {
    key: "manageclients",
    title: "Clients",
    query: "?feature=clients&state=manage",
    pathname: "/",
  },
  {
    key: "didrequests",
    title: "DID Requests",
    query: "?feature=did&state=requests",
    pathname: "/",
  },
];
