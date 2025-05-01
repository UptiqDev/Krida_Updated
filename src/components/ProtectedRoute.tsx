import { useWallet } from '@solana/wallet-adapter-react';
import { ReactNode, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { connected } = useWallet();
    const navigate = useNavigate();

    useEffect(() => {
        // Double-check localStorage as an additional verification
        const isConnected = localStorage.getItem('wallet_connected') === 'true';

        if (!connected && !isConnected) {
            navigate('/', { replace: true });
        }
    }, [connected, navigate]);

    if (!connected) {
        // Check localStorage before redirecting
        const isConnected = localStorage.getItem('wallet_connected') === 'true';
        if (!isConnected) {
            return (
                <Navigate
                    to='/'
                    replace
                />
            );
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute;
