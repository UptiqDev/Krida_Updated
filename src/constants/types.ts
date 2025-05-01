import { Token, TokenDistribution, University } from '../data/types';

export const defaultDistribution: TokenDistribution = {
  individual: 26.7,
  university: 20,
  advisors: 33.3,
  founders: 20
};

export const initialTokens: Token[] = [
  {
    id: '01',
    symbol: 'OXC',
    name: 'OxenCoin',
    universityId: '01',
    universityName: 'Harvard University',
    volume: '$ 3458 M',
    price: '$ 240.870',
    image: '/uploads/Oxcoin.png',
    universityLogo: '/uploads/universityLogo.png'
  },
  {
    id: '001',
    symbol: 'STT',
    name: 'Tree Token',
    universityId: '001',
    universityName: 'Stanford University',
    volume: '$ 3458 M',
    price: '$ 240.870',
    image: '/uploads/TreeToken.png',
    universityLogo: '/uploads/NewUni.png'
  },
  {
    id: '002',
    symbol: 'MTB',
    name: 'TechBit',
    universityId: '002',
    universityName: 'MIT',
    volume: '$ 3458 M',
    price: '$ 240.870',
    image: '/uploads/TechBit.png',
    universityLogo: '/uploads/MIT.png'
  },
  {
    id: '003',
    symbol: 'LCN',
    name: 'LoinCoin',
    universityId: '003',
    universityName: 'University of Oxford',
    volume: '$ 3458 M',
    price: '$ 240.870',
    image: '/uploads/LoinCoin.png',
    universityLogo: '/uploads/stanford.png'
  },
  {
    id: '05',
    symbol: 'KTT',
    name: 'MyToken',
    universityId: '05',
    universityName: 'University of Melbourne',
    volume: '$ 3458 M',
    price: '$ 240.870',
    image: '/uploads/Frame.png',
    universityLogo: '/uploads/universityLogo.png'
  },
];

export const initialFTOs: Token[] = [
  {
    id: '01',
    symbol: 'OXC',
    name: 'OxenCoin',
    universityId: '01',
    universityName: 'Harvard University',
    volume: '$ 3458 M',
    price: '$ 240.870',
    image: '/uploads/Oxcoin.png',
    universityLogo: '/uploads/universityLogo.png',
    listingDate: '18/04/2025',
    status: 'Presale'
  },
  {
    id: '001',
    symbol: 'STT',
    name: 'Tree Token',
    universityId: '001',
    universityName: 'Stanford University',
    volume: '$ 3458 M',
    price: '$ 240.870',
    image: '/uploads/TreeToken.png',
    universityLogo: '/uploads/NewUni.png',
    listingDate: '20/05/2025',
    status: 'Token Distribution'
  }
];

export const initialUniversities: University[] = [
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
