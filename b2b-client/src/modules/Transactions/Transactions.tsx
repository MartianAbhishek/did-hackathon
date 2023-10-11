import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Typography from "src/components/Typography";
import { WalletConnectContext } from "src/context";
import { ethSdk } from "src/utils/EthSdk";
import AllTransactions from "./AllTransactions";
import ScheduledTransactions from "./ScheduledTransactions";
import { ModuleKeys } from "./constants";
import ScheduleTransaction from "./ScheduleTransaction";

interface IPropType {
  state: string;
  module?: string;
}

function Transactions(props: IPropType) {
  const { account } = useContext(WalletConnectContext);

  const [balance, setBalance] = useState<string>("0");
  const [txnLoading, setTxnLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<
    Array<ethers.providers.TransactionResponse>
  >([]);

  const fetchTransactions = async (address: string | null) => {
    if (!address) return;
    const balance = await ethSdk.getFormattedAccountBalance(address);
    setBalance(balance);
    setTxnLoading(true);
    const txns = await ethSdk.getTransactions(address);
    setTransactions(txns);
    setTxnLoading(false);
  };

  useEffect(() => {
    fetchTransactions(account);
  }, [account]);

  switch (props.module) {
    case ModuleKeys.scheduleTxn:
      return <ScheduleTransaction />;
    default:
      return (
        <>
          <h2>Balance: {balance}</h2>
          <ScheduledTransactions transactions={[]} txnLoading={false} />
          <AllTransactions
            transactions={transactions}
            txnLoading={txnLoading}
          />
        </>
      );
  }
}

export default Transactions;
