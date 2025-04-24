
import { v4 as uuidv4 } from 'uuid';
import { University } from '@/types';

export interface APIResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// Mock university data
const mockUniversities = [
  {
    id: '1',
    name: 'National University of Singapore',
    description: 'A leading global university centered in Asia, NUS is Singapore\'s flagship university offering a global approach to education and research.',
    logo: '/uploads/GROUP.png',
    coverImage: '/uploads/Frame.png',
    socialLinks: {
      instagram: 'https://instagram.com/nus',
      facebook: 'https://facebook.com/nus',
      linkedin: 'https://linkedin.com/school/nus',
      twitter: 'https://twitter.com/nus',
      website: 'https://nus.edu.sg'
    }
  }
];

/**
 * Creates a university (mock implementation)
 */
export const createUniversity = async (university: Partial<University>): Promise<APIResponse> => {
  try {
    // Always return success with consistent data
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUniversity = {
      ...university,
      id: uuidv4()
    };
    
    // Add to mock universities for testing
    mockUniversities.push(newUniversity as any);
    
    return { 
      success: true, 
      data: { 
        university: newUniversity
      } 
    };
  } catch (error) {
    console.error('Error creating university:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

/**
 * Fetches universities (mock implementation)
 */
export const getUniversities = async (): Promise<APIResponse> => {
  try {
    // Return mock data after a slight delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { 
      success: true, 
      data: { universities: mockUniversities }
    };
  } catch (error) {
    console.error('Error fetching universities:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

/**
 * Fetches a single university by ID (mock implementation)
 */
export const getUniversityById = async (id: string): Promise<APIResponse> => {
  try {
    // Return mock data after a slight delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const university = mockUniversities.find(uni => uni.id === id);
    
    if (!university) {
      return {
        success: false,
        error: 'University not found'
      };
    }
    
    return { 
      success: true, 
      data: { university }
    };
  } catch (error) {
    console.error('Error fetching university:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
