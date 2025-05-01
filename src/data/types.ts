export interface University {
    id: string;
    universityName: string;
    description: string;
    universityLogo: string;
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
  tokenSymbol: string;
  tokenName: string;
  universityId: string;
  volume: string;
  price: string;
  tokenImage?: string;
  tokenDescription?: string;
  listingDate?: string;
  status?: 'Presale' | 'Token Distribution' | 'Scheduled';
  transferFee?: {
    percentage: string;
    max: string;
  };
  maxTransferFee?: string;
  universityLogo?: string;
  decimals?: number;

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
