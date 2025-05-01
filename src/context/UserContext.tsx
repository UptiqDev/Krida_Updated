import { University } from '@/data/types';
import { useWallet } from '@solana/wallet-adapter-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { fetchUniversityDetails } from '../services/universityAPI';
import { fetchUserByWalletAddress } from '../services/userAPI';
import { User, UserContextType } from './types';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const { publicKey, connected } = useWallet();
    const walletAddress = publicKey?.toBase58();
    const [showDialog, setShowDialog] = useState(false);
    const [userUniversity, setUserUniversity] = useState<University | null>(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // React Query for fetching user data
    const { data: userData, isLoading: isLoadingUser } = useQuery({
        queryKey: ['user', walletAddress],
        queryFn: () => (walletAddress ? fetchUserByWalletAddress(walletAddress) : null),
        enabled: !!walletAddress && connected,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false
    });

    // React Query for fetching university details if user has a universityId
    const { data: universityData, isLoading: isLoadingUniversity } = useQuery({
        queryKey: ['university', userData?.universityId],
        queryFn: () => (userData?.universityId ? fetchUniversityDetails(userData.universityId) : null),
        enabled: !!userData?.universityId,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false
    });

    // Combine loading states
    const isLoading = isLoadingUser || isLoadingUniversity;
    // Update user when userData changes
    useEffect(() => {
        if (userData) {
            // Redirect based on role
            if (userData.roles.includes('university')) {
                // If university role has universityId, navigate to that university's page
                if (userData.universityId) {
                    navigate(`/university/${userData.universityId}`);
                } else {
                    toast.error('University ID not found for this user');
                    navigate('/');
                }
            }
            // else if (userData.roles.includes('admin')) {
            //   navigate('/home');
            // }
        }
    }, [userData, navigate]);

    // Determine if user has specific roles
    const isAdmin = userData?.roles.includes('admin') || false;
    const isUniversity = userData?.roles.includes('university') || false;

    return (
        <UserContext.Provider
            value={{
                isAdmin,
                isUniversity,
                user: userData,
                userUniversity,
                isLoading
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useAccessControl = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};
