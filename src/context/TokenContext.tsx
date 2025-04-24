
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Token, University, TokenDistribution } from '../types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getUniversities, createUniversity, getUniversityById } from '@/services/universityAPI';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface TokenContextType {
  tokens: Token[];
  ongoingICOs: Token[];
  universities: University[];
  currentUniversity: University | null;
  currentToken: Token | null;
  tokenDistribution: TokenDistribution;
  addUniversity: (university: University) => Promise<void>;
  setCurrentUniversity: (university: University | null) => void;
  addToken: (token: Token) => void;
  setCurrentToken: (token: Token | null) => void;
  fetchUniversities: () => Promise<void>;
}

const defaultDistribution: TokenDistribution = {
  individual: 26.7,
  university: 20,
  advisors: 33.3,
  founders: 20
};

const initialTokens: Token[] = [
  {
    id: '1',
    symbol: 'OXC',
    name: 'OxenCoin',
    universityId: '1',
    universityName: 'Harvard University',
    volume: '$ 3458 M',
    price: '$ 240.870',
    image: '/uploads/Frame.png'
  },
];

const initialICOs: Token[] = [
  {
    id: '1',
    symbol: 'OXC',
    name: 'OxenCoin',
    universityId: '1',
    universityName: 'Harvard University',
    volume: '$ 3458 M',
    price: '$ 240.870',
    image: '/uploads/GROUP.png',
    listingDate: '18/04/2025',
    status: 'Presale'
  },
  {
    id: '2',
    symbol: 'STT',
    name: 'TreeToken',
    universityId: '2',
    universityName: 'Stanford University',
    volume: '$ 3458 M',
    price: '$ 240.870',
    image: '/uploads/Frame.png',
    listingDate: '20/05/2025',
    status: 'Token Distribution'
  }
];

const initialUniversities: University[] = [
  {
    id: '1',
    name: 'National University of Singapore',
    description: 'Tokyo Blockchain University is a pioneer in decentralized education, integrating Web3 principles into every course. It empowers students globally through crypto-backed credentials and smart contract-based learning systems.',
    logo: '/uploads/Frame.png',
    coverImage: '/uploads/LandingImage.png',
    socialLinks: {
      instagram: 'https://instagram.com/nus',
      facebook: 'https://facebook.com/nus',
      linkedin: 'https://linkedin.com/school/nus',
      twitter: 'https://twitter.com/nus',
      website: 'https://nus.edu.sg'
    }
  }
];

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [tokens, setTokens] = useState<Token[]>(initialTokens);
  const [ongoingICOs, setOngoingICOs] = useState<Token[]>(initialICOs);
  const [universities, setUniversities] = useState<University[]>(initialUniversities);
  const [currentUniversity, setCurrentUniversity] = useState<University | null>(null);
  const [currentToken, setCurrentToken] = useState<Token | null>(null);
  const [tokenDistribution] = useState<TokenDistribution>(defaultDistribution);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  // Comment out dynamic fetching for now and use static data
  const { data: universitiesData, refetch } = useQuery({
    queryKey: ['universities'],
    queryFn: async () => {
      // For testing, just return static data
      return initialUniversities;
      
      // Uncomment when ready to use API again
      /*
      const response = await getUniversities();
      if (response.success) {
        return response.data.universities;
      }
      throw new Error(response.error || 'Failed to fetch universities');
      */
    },
    initialData: initialUniversities,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const createUniversityMutation = useMutation({
    mutationFn: createUniversity,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['universities'] });
        toast.success(`${response.data.university.name} has been successfully created.`);
      }
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to create university");
    }
  });

  useEffect(() => {
    if (universitiesData) {
      setUniversities(universitiesData);
    }
  }, [universitiesData]);

  const fetchUniversities = async () => {
    try {
      await refetch();
    } catch (error) {
      console.error("Error in fetchUniversities:", error);
      toast.error(error instanceof Error ? error.message : "Error fetching universities");
    }
  };

  const addUniversity = async (university: University) => {
    try {
      // For testing consistency, directly add the university
      const newUniversity = { 
        ...university, 
        id: String(Date.now()) // Using timestamp as consistent ID
      };
      
      setUniversities(prevUniversities => [...prevUniversities, newUniversity]);
      setCurrentUniversity(newUniversity);
      toast.success(`${newUniversity.name} has been successfully created.`);
      navigate(`/university/${newUniversity.id}`);
      
      // Comment out API call for now
      /*
      const response = await createUniversityMutation.mutateAsync(university);
      
      if (response.success) {
        const newUniversity = { ...university, id: response.data.university.id || String(Date.now()) };
        setUniversities(prevUniversities => [...prevUniversities, newUniversity]);
        setCurrentUniversity(newUniversity);
        navigate(`/university/${newUniversity.id}`);
      } else {
        toast.error(response.error || "Failed to create university");
      }
      */
    } catch (error) {
      console.error("Error in addUniversity:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create university");
    }
  };

  const addToken = (token: Token) => {
    const newToken = { 
      ...token, 
      id: String(tokens.length + 1),
      universityId: currentUniversity?.id || '',
      universityName: currentUniversity?.name || '',
      volume: '$ 0',
      price: '$ 1'
    };
    setTokens([...tokens, newToken]);
    setCurrentToken(newToken);
    
    const newICO = { 
      ...newToken, 
      listingDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      status: 'Scheduled' as const
    };
    setOngoingICOs([...ongoingICOs, newICO]);
    
    navigate(`/university/${currentUniversity?.id}`);
  };

  return (
    <TokenContext.Provider
      value={{
        tokens,
        ongoingICOs,
        universities,
        currentUniversity,
        currentToken,
        tokenDistribution,
        addUniversity,
        setCurrentUniversity,
        addToken,
        setCurrentToken,
        fetchUniversities
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
