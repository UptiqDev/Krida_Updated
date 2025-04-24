
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import WalletOptions from '../components/WalletOptions';

interface WalletContextType {
  connected: boolean;
  walletAddress: string | null;
  showWalletOptions: () => void;
  disconnectWallet: () => void;
  isAdmin: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user was previously connected and restore session
    const savedConnected = localStorage.getItem('wallet_connected');
    const savedAddress = localStorage.getItem('wallet_address');
    
    if (savedConnected === 'true' && savedAddress) {
      setConnected(true);
      setWalletAddress(savedAddress);
      setIsAdmin(true);
      
      // If user is on login page but has a valid session, redirect to home
      if (window.location.pathname === '/') {
        navigate('/home');
      }
    }
  }, [navigate]);

  const showWalletOptions = () => {
    setShowDialog(true);
  };

  const handleConnect = (walletName: string) => {
    const mockAddress = '8xGzwftgURZxqYfzRrnApGUjqGpS9qEqD5pYEzxYuYrH';
    setConnected(true);
    setWalletAddress(mockAddress);
    setIsAdmin(true);
    
    localStorage.setItem('wallet_connected', 'true');
    localStorage.setItem('wallet_address', mockAddress);
    localStorage.setItem('wallet_name', walletName);
    
    navigate('/home');
  };

  const disconnectWallet = () => {
    setConnected(false);
    setWalletAddress(null);
    setIsAdmin(false);
    
    localStorage.removeItem('wallet_connected');
    localStorage.removeItem('wallet_address');
    localStorage.removeItem('wallet_name');
    
    navigate('/');
  };

  return (
    <WalletContext.Provider
      value={{
        connected,
        walletAddress,
        showWalletOptions,
        disconnectWallet,
        isAdmin
      }}
    >
      {children}
      <WalletOptions 
        open={showDialog} 
        onClose={() => setShowDialog(false)}
        onConnect={handleConnect}
      />
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
