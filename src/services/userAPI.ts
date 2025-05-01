import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

interface User {
    _id: string;
    roles: string[];
    walletAddress: string;
    universityId?: string;
}

interface UserApiResponse {
    executionId: string;
    aiPersonaId: string;
    conversationId: string;
    output: {
        data: User[];
        state: string;
        icLoopIndexes: Record<string, unknown>;
        icIntents: Record<string, unknown>;
    };
}

export const fetchUserByWalletAddress = async (walletAddress: string): Promise<User | null> => {
    try {
        const response = await axiosInstance.post('/ai-personas/executions/sync', {
            executionId: uuidv4(),
            uid: '6e11ccb9-883e-4dac-b823-570a2b9eb45f',
            integrationId: 'university-management-assistant-0356',
            context: {},
            disableNLP: true,
            miniAgentIntegrationId: 'user-management-0893',
            intent: 'get users',
            userInput: 'Test Intent'
        });

        const data: UserApiResponse = response.data;
        const user = data.output.data.find(u => u.walletAddress.toLowerCase() === walletAddress.toLowerCase());

        if (!user) {
            console.log('User not found');
            return null;
        }

        toast.success('Welcome! You are now logged in successfully.');
        return user;
    } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to fetch user data');
        return null;
    }
};

export const checkUserRole = (user: User | null, role: string): boolean => {
    if (!user) return false;
    return user.roles.includes(role);
};
