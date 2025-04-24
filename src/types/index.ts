
export interface University {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface Token {
  id: string;
  symbol: string;
  name: string;
  universityId: string;
  universityName: string;
  volume: string;
  price: string;
  image?: string;
  description?: string;
  listingDate?: string;
  status?: 'Presale' | 'Token Distribution' | 'Scheduled';
  transferFeePercentage?: string;
  maxTransferFee?: string;
}

export interface TokenDistribution {
  individual: number;
  university: number;
  advisors: number;
  founders: number;
}

export interface WalletAddress {
  address: string;
  id: string;
}

export interface TokenSetupStep {
  id: number;
  label: string;
  component: React.ReactNode;
}
