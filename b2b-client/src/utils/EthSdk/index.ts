import { verifyDIDs } from "@jpmorganchase/onyx-ssi-sdk";
import { Resolver } from "did-resolver";
import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { getResolver } from "ethr-did-resolver";

export type EthSdkTypes = {
  network: string;
};

const registryAddress: string = "0xdca7ef03e98e0dc2b855be647c39abe984fcf21b";

export class EthSdk {
  provider: ethers.providers.EtherscanProvider;
  web3Provider: ethers.providers.Web3Provider | undefined;

  constructor({ network }: EthSdkTypes) {
    this.provider = new ethers.providers.EtherscanProvider(network);
    if (!window.ethereum) return;
    this.web3Provider = new ethers.providers.Web3Provider(
      window.ethereum!,
      network
    );
  }

  changeNetwork(network: string) {
    this.provider = new ethers.providers.EtherscanProvider(network);
    if (!window.ethereum) return;
    this.web3Provider = new ethers.providers.Web3Provider(
      window.ethereum!,
      network
    );
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
        temp.status = "Success";
        transactions.push(temp);
      });

      transactions.reverse();

      return transactions;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async verifyIssuerDelegateSigner(signedJWT: string, audienceAddress: string) {
    try {
      // getResolver will return an object with a key/value pair of { "ethr": resolver } where resolver is a function used by the generic did resolver.
      const providerConfig = {
        networks: [{ name: "0x5", provider: this.web3Provider }],
        registry: registryAddress, // optional as ethr-did-resolver sets this up as default
      };
      const ethrDidResolver = getResolver(providerConfig);
      const didResolver = new Resolver(ethrDidResolver);
      const verified = await verifyDIDs(signedJWT, didResolver);
      console.log(verified);
      return {
        verified,
      };
    } catch (err) {
      console.error(err);
      return {
        verified: false,
      };
    }
  }
}

export const ethSdk = new EthSdk({ network: "goerli" });
