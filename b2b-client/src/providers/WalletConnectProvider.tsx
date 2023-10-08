import { WalletConnectContext, WalletLoginContext } from '../context';
import { useWalletConnect } from '../hooks/useWalletConnect';

type Props = {
  children: React.ReactNode;
};

const WalletConnectProvider = ({ children }: Props) => {
  const auth = useWalletConnect();

  return (
    <WalletConnectContext.Provider value={auth}>{children}</WalletConnectContext.Provider>
  );
};

export default WalletConnectProvider;
