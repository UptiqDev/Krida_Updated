import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { connected, wallet, publicKey } = useWallet();

    const navigate = useNavigate();

    useEffect(() => {
        // If already connected, redirect to home
        if (connected) {
            navigate('/home');
        }
    }, [connected, navigate]);

    return (
        <div className='min-h-screen flex flex-col md:flex-row overflow-hidden'>
            {/* Left side */}
            <div className='flex flex-col justify-center px-8 md:px-16 w-full md:w-1/2'>
                <div className='space-y-6 max-w-md'>
                    {/* Logo */}
                    <img
                        src='/uploads/kridalogo.png'
                        alt='Krida Logo'
                        className='h-10'
                    />

                    {/* Text */}
                    <div>
                        <h2 className='text-2xl font-bold mb-2'>Connect Your Wallet to Continue</h2>
                        <p className='text-gray-500 text-sm'>
                            Securely log in using your crypto wallet. No passwords, no hassle.
                        </p>
                    </div>

                    <div className='custom-wallet-button-wrapper'>
                        <WalletMultiButton>Connect to Wallet</WalletMultiButton>
                    </div>
                    {/* Wallet Connect Button */}
                </div>
            </div>

            {/* Right side */}
            <div className='w-full md:w-1/2 h-[50vh] md:h-screen bg-krida-gold/20'>
                <img
                    src='/uploads/LandingImage.png'
                    alt='Krida Vault'
                    className='w-full h-full object-cover'
                />
            </div>

            <style>{`
        .wallet-adapter-button {
          background-color: black !important;
          color: white !important;
          border-radius: 9999px !important;
          padding: 12px 24px !important;
          font-weight: 600 !important;
          font-size: 16px !important;
        }
        .wallet-adapter-button:hover {
          opacity: 0.9 !important;
        }
      `}</style>
        </div>
    );
};

export default Login;
