import { Token } from '@/data/types';
import axiosInstance from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';


// Add '_id' to the University type to match the API response
export interface University {
    id: string;
    universityName: string;
    description: string;
    universityLogo: string,
    coverImage: string;
    socialLinks: {
        website?: string;
        twitter?: string;
        instagram?: string;
        facebook?: string;
        linkedin?: string;
    };
    _id?: string;
}

export interface APIResponse {
    success: boolean;
    data?: any;
    error?: string;
}

// Mock university data - fallback if API fails
// const mockUniversities = [
//   {
//     id: '01',
//     name: 'National University of Singapore',
//     description: 'A leading global university centered in Asia, NUS is Singapore\'s flagship university offering a global approach to education and research.',
//     logo: '/uploads/GROUP.png',
//     coverImage: '/uploads/Frame.png',
//     socialLinks: {
//       instagram: 'https://instagram.com/nus',
//       facebook: 'https://facebook.com/nus',
//       linkedin: 'https://linkedin.com/school/nus',
//       twitter: 'https://twitter.com/nus',
//       website: 'https://nus.edu.sg'
//     }
//   }
// ];

/**
 * Fetches university details from the API
 */

export const useUniversityDetails = (universityId?: string) => {
    return useQuery<University | null>({
        queryKey: ['universityDetails', universityId],
        queryFn: () => fetchUniversityDetails(universityId),
        enabled: !!universityId,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
};

export const fetchUniversityDetails = async (universityId?: string): Promise<University | null> => {
    try {
        const response = await axiosInstance.post('/ai-personas/executions/sync', {
            executionId: uuidv4(),
            uid: '6e11ccb9-883e-4dac-b823-570a2b9eb45f',
            integrationId: 'university-management-assistant-0356',
            context: {},
            disableNLP: true,
            miniAgentIntegrationId: 'university-and-user-details-management-2904',
            intent: 'Manage University Information',
            userInput: 'Test Intent'
        });

        const data = response.data;
        const universityData = universityId
            ? data?.output?.data.find((uni: University) => uni._id === universityId)
            : data.output.data[0];

        if (!universityData) {
            // toast.error('University not found');
            console.error('University not found');
            return null;
        }

        return {
            id: universityData._id,
            universityName: universityData.university_name,
            description: universityData.description,
            universityLogo: universityData.universityLogo,
            coverImage: universityData.cover_image,
            socialLinks: {
                website: universityData.social_media_urls?.website,
                twitter: universityData.social_media_urls?.twitter,
                instagram: universityData.social_media_urls?.instagram,
                facebook: universityData.social_media_urls?.facebook,
                linkedin: universityData.social_media_urls?.linkedin
            }
        };
    } catch (error) {
        console.error('Error fetching university details:', error);
        toast.error('Failed to fetch university details');
        return null;
    }
};

export const fetchUniversitiesList = async (): Promise<University | null> => {
    try {
        const response = await axiosInstance.post('/ai-personas/executions/sync', {
            executionId: uuidv4(),
            uid: '6e11ccb9-883e-4dac-b823-570a2b9eb45f',
            integrationId: 'university-management-assistant-0356',
            context: {},
            disableNLP: true,
            miniAgentIntegrationId: 'university-and-user-details-management-2904',
            intent: 'Manage University Information',
            userInput: 'Test Intent'
        });

        const data = response.data.output.data;
        return data;
    } catch (error) {
        console.error('Error fetching university details:', error);
        toast.error('Failed to fetch university details');
        return null;
    }
};

/**
 * Creates a university (mock implementation)
 */
export const createUniversity = async (university: Partial<University>): Promise<APIResponse> => {
    try {
        const executionId = uuidv4();
        const uid = uuidv4();

        const dataContext = {
            ...university,
            id: uuidv4()
        };

        const requestBody = {
            executionId,
            uid,
            integrationId: 'university-management-assistant-0356',
            context: dataContext,
            disableNLP: true,
            miniAgentIntegrationId: 'university-and-user-details-management-2904',
            intent: 'Create University',
            userInput: "Create University",
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

export const createToken = async (Token: Partial<Token>): Promise<APIResponse> => {
    try {
        const executionId = uuidv4();
        const uid = uuidv4();

        const dataContext = {
            ...Token,
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

/**
 * Fetches universities (mock implementation)
 */
// export const getUniversities = async (): Promise<APIResponse> => {
//   try {
//     // Return mock data after a slight delay
//     await new Promise(resolve => setTimeout(resolve, 500));

//     return {
//       success: true,
//       data: { universities: mockUniversities }
//     };
//   } catch (error) {
//     console.error('Error fetching universities:', error);
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : 'Unknown error occurred'
//     };
//   }
// };

/**
 * Fetches a single university by ID (mock implementation)
 */
// export const getUniversityById = async (id: string): Promise<APIResponse> => {
//   try {
//     // Return mock data after a slight delay
//     await new Promise(resolve => setTimeout(resolve, 500));

//     const university = mockUniversities.find(uni => uni.id === id);

//     if (!university) {
//       return {
//         success: false,
//         error: 'University not found'
//       };
//     }

//     return {
//       success: true,
//       data: { university }
//     };
//   } catch (error) {
//     console.error('Error fetching university:', error);
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : 'Unknown error occurred'
//     };
//   }
// };
