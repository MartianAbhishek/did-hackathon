import { StorageKeysPrefix } from "../constants";

export const getClientKey = (address: string) => {
  const prefix = StorageKeysPrefix.clients;
  return `${prefix}${address}`;
};
