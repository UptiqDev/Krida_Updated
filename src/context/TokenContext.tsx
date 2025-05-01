import { createUniversity } from '@/services/universityAPI';
import { Token, TokenDistribution, University } from '@/data/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { initialFTOs, initialTokens, initialUniversities, defaultDistribution } from '@/constants/types';

interface TokenContextType {
  tokens: Token[];
  ongoingFTOs: Token[];
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

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [tokens, setTokens] = useState<Token[]>(initialTokens);
  const [ongoingFTOs, setOngoingFTOs] = useState<Token[]>(initialFTOs);
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
        // toast.success(`University Has Been Successfully Created.`);
      }
    },
    onError: (error) => {
      console.error('Error creating university:', error);
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
      console.error('Error in fetchUniversities:', error);
      toast.error(error instanceof Error ? error.message : 'Error fetching universities');
    }
  };

  const addUniversity = async (university: University) => {
    try {
      const response = await createUniversityMutation.mutateAsync(university);

      if (response.success) {
        const universityId = response.data?.output?.universityId;
        const newUniversity = { ...university, id: universityId || String(Date.now()) };
        setUniversities(prevUniversities => [...prevUniversities, newUniversity]);
        setCurrentUniversity(newUniversity);
        // if (!universityId) throw new Error("University ID missing in response");
        toast.success(`"${university.universityName}" has been onboarded successfully!`);
        navigate(`/university/${newUniversity.id}`);
      } else {
        toast.error(response.error || "Failed to create university");
      }
    } catch (error) {
      console.error('Error in addUniversity:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create university');
    }
  };

  const addToken = (token: Token) => {
    const newToken = {
      ...token,
      id: String(tokens.length + 1),
      universityId: currentUniversity?.id || '',
      universityName: currentUniversity?.universityName || '',
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
    setOngoingFTOs([...ongoingFTOs, newICO]);

    navigate(`/university/${currentUniversity?.id}`);
  };

  return (
    <TokenContext.Provider
      value={{
        tokens,
        ongoingFTOs,
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
