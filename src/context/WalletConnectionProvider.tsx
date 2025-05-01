import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { CoinbaseWalletAdapter, PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { FC, ReactNode, useMemo } from 'react';

// Import the styles from the wallet adapter
import '@solana/wallet-adapter-react-ui/styles.css';

interface WalletConnectionProviderProps {
    children: ReactNode;
}

export const WalletConnectionProvider: FC<WalletConnectionProviderProps> = ({ children }) => {
    // Set the network
    const network =
        import.meta.env.VITE_APP_ENV === 'prod' ? WalletAdapterNetwork.Mainnet : WalletAdapterNetwork.Devnet;

    // Get the endpoint URL for the network
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // Initialize the wallet adapters we want to support
    const wallets = useMemo(
        () => [new PhantomWalletAdapter(), new SolflareWalletAdapter(), new CoinbaseWalletAdapter()],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider
                wallets={wallets}
                autoConnect
            >
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletConnectionProvider;
