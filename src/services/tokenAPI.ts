import { Token } from '@/data/types';
import axiosInstance from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export interface APIResponse {
    success: boolean;
    data?: any;
    error?: string;
}

export const createToken = async (Token: Partial<Token>): Promise<APIResponse> => {
    try {
        const executionId = uuidv4();
        const uid = uuidv4();

        const dataContext = {
            id: uuidv4()
        };

        const requestBody = {
            executionId,
            uid,
            integrationId: 'university-management-assistant-0356',
            context: dataContext,
            disableNLP: true,
            miniAgentIntegrationId: 'university-and-user-details-management-2904',
            intent: 'Create Token',
            userInput: "Create Token",
        };

        const response = await axiosInstance.post('/ai-personas/executions/sync', requestBody);

        return {
            success: true,
            data: response.data
        };
    } catch (error: any) {
        console.error(' Error creating university:', error);
        return {
            success: false,
            error: error?.message || 'Unknown error occurred'
        };
    }
};
