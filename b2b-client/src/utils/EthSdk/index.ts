import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";

export type EthSdkTypes = {
  network: string;
};

export class EthSdk {
  provider: ethers.providers.EtherscanProvider;

  constructor({ network }: EthSdkTypes) {
    this.provider = new ethers.providers.EtherscanProvider(network);
  }

  changeNetwork(network: string) {
    this.provider = new ethers.providers.EtherscanProvider(network);
  }

  async getFormattedAccountBalance(address: string) {
    try {
      const balance = await this.provider.getBalance(address);
      return formatEther(balance);
    } catch (err) {
      console.error(err);
      return "0";
    }
  }

  async getAccountBalance(address: string) {
    try {
      const balance = await this.provider.getBalance(address);
      return balance;
    } catch (err) {
      console.error(err);
      return "0";
    }
  }

  async getTransactions(address: string) {
    try {
      const txns = await this.provider.getHistory(address);

      const transactions: any = [];

      txns.map((data) => {
        const temp: any = data;
        temp.gasPrice = formatEther(data.gasPrice || 0);
        temp.value = formatEther(data.value);
        temp.timestamp = data.timestamp || Date.now() / 1000;
        temp.timestamp = new Date(data.timestamp! * 1000).toString();
        temp.status = 'Success';
        transactions.push(temp);
      });

      transactions.reverse();

      return transactions;
    } catch (err) {
      console.error(err);
      return [];
    }
  }
}

export const ethSdk = new EthSdk({ network: "goerli" });
