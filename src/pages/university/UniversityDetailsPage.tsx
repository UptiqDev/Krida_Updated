import Navbar from '@/components/Navbar';
import SocialLinks from '@/components/SocialLinks';
import VestingScheduleModal from '@/pages/tokenCreationSteps/VestingScheduleModal';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { initialFTOs, initialTokens } from '@/constants/types';
import { useToken } from '@/context/TokenContext';
import { fetchUniversityDetails } from '@/services/universityAPI';
import { University } from '@/data/types';
import { ArrowLeft, Bell, Loader, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GenerateToken } from './GenerateToken';
import { ClaimToken } from './ClaimToken';
import { TokenSteps } from './TokenSteps';
import { TokenDetails } from './University';
import { useAccessControl } from '@/context/UserContext';

const UniversityDetailsPage = () => {
    const { id } = useParams();
    const { universities, tokens, setCurrentUniversity } = useToken();
    const [university, setUniversity] = useState<University | null>(universities.find(u => u.id === id) || null);
    const [token, setToken] = useState(tokens.find(t => t.universityId === id) || null);
    const [isVestingScheduleModalOpen, setIsVestingScheduleModalOpen] = useState(false);
    const [tokenCreationStep, setTokenCreationStep] = useState(1);
    const { isAdmin, isUniversity, user, userUniversity } = useAccessControl();
    // const universityLogo = initialTokens.find(token => token.universityId === id)?.universityLogo || '';
    const universityLogo = university.universityLogo;
    const initialToken = initialFTOs.find(token => token.universityId === id);

    useEffect(() => {
        const loadUniversityData = async () => {
            if (isUniversity && user?.universityId === id && userUniversity) {
                setUniversity(userUniversity);
                setCurrentUniversity(userUniversity);
            } else {
                try {
                    const universityData = await fetchUniversityDetails(id);
                    if (universityData) {
                        setUniversity(universityData);
                        setCurrentUniversity(universityData);
                    } else {
                        const foundUniversity = universities.find(u => u.id === id) || null;
                        setUniversity(foundUniversity);
                        setCurrentUniversity(foundUniversity);
                    }
                } catch (error) {
                    console.error('Error loading university data:', error);
                    const foundUniversity = universities.find(u => u.id === id) || null;
                    setUniversity(foundUniversity);
                    setCurrentUniversity(foundUniversity);
                }
            }

            const foundToken = tokens.find(t => t.universityId === id) || null;
            setToken(foundToken);
        };

        if (id) {
            loadUniversityData();
        }
    }, [id, universities, tokens, setCurrentUniversity, isUniversity, user, userUniversity]);



    if (!university) {
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <Loader />
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />

            <main>
                <div className='relative'>
                    <div className='h-48 md:h-64 bg-gray-200 relative'>
                        {university?.coverImage ? (
                            <img
                                // src={university?.coverImage}
                                src='/uploads/image.png'
                                alt={university?.universityName}
                                className='w-full h-full object-cover'
                            />
                        ) : (
                            <div className='w-full h-full bg-gradient-to-r from-krida-gold/20 to-krida-gold/40' />
                        )}

                        <Link
                            to='/home'
                            className='absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100'
                        >
                            <ArrowLeft className='h-5 w-5' />
                        </Link>
                    </div>

                    <div className='container mx-auto px-4 -mt-20'>
                        <div className='bg-white rounded-lg shadow-lg p-6 relative'>
                            <div className='flex flex-col md:flex-row md:items-start md:space-x-6'>
                                {/* Logo */}
                                <div className='flex-shrink-0'>
                                    <div className='w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white overflow-hidden bg-white flex items-center justify-center shadow-md'>
                                        {universityLogo ? (
                                            <img
                                                src={universityLogo}
                                                alt={university?.universityName}
                                                className='w-full h-full object-cover'
                                            />
                                        ) : (
                                            <div className='text-gray-300 text-lg'>Logo</div>
                                        )}
                                    </div>
                                </div>

                                {/* Details Section */}


                                <TokenDetails
                                    university={university}
                                    token={token}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 
              <div className="flex flex-col md:flex-row md:justify-between mt-4 md:mt-0">
                <div className="mt-8 md:mt-0">
                  <h1 className="text-2xl font-bold mb-2">{university?.name}</h1>
                  {token && <p className="text-gray-500 mb-2">{token?.symbol} ({token.name})</p>}
                </div>
                <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Token
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit Details
                  </Button>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-gray-700 mb-4">{university?.description}</p>
                <SocialLinks links={university?.socialLinks} />
              </div>
            </div>
          </div> */}

                    <div className='container mx-auto px-4 py-8'>
                        <>
                            {/* claim token */}

                            {/* {token && (
                            <ClaimToken
                                isAdmin={isAdmin}
                                token={token}
                            />
                        )}

                            {/* generate token */}
                            {/* <GenerateToken
                                id={university?.id}
                            />  */}


                            {/* token details */}
                            {token ? (
                                <div className='flex flex-col md:flex-row justify-between items-center gap-4 bg-amber-50 p-4 rounded-md h-[132px]'>
                                    <div className='flex items-center space-x-4'>
                                        <img
                                            src={(token || initialToken)?.image || '/uploads/GROUP.png'}
                                            alt={(token || initialToken)?.name}
                                            className='w-14 h-14 rounded-full'
                                        />
                                        <div className='flex flex-col gap-1'>
                                            <h2 className='text-base font-semibold'>
                                                {(token || initialToken)?.symbol} - {(token || initialToken)?.name}
                                            </h2>
                                            <p className='text-sm text-gray-500'>
                                                1 {(token || initialToken)?.symbol} = 1 SOL
                                            </p>
                                            <div className='flex items-center gap-1 mt-1'>
                                                <div className='w-2.5 h-2.5 rounded-full bg-yellow-400'></div>
                                                <p className='text-xs text-gray-600'>
                                                    Initial Token Distribution is scheduled in 3 days
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col md:flex-row gap-2 w-full md:w-auto'>
                                        {!isAdmin ? (
                                            <Button
                                                className='bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs px-4 py-2 rounded-full w-full md:w-auto'
                                                onClick={() => setIsVestingScheduleModalOpen(true)}
                                            >
                                                View Vesting Schedule
                                            </Button>
                                        ) : (
                                            <Button
                                                className='bg-krida-dark text-white hover:bg-krida-dark/90 text-xs px-4 py-2 rounded-full w-full md:w-auto'
                                                disabled
                                            >
                                                Configure Token
                                            </Button>
                                        )}
                                    </div>
                                </div>

                            ) : (
                                <GenerateToken
                                    id={university?.id}
                                />
                            )}

                            {/* Token Creation Steps Block */}

                            {/* <TokenSteps /> */}

                        </>

                    </div>
                </div>
            </main>

            <VestingScheduleModal
                open={isVestingScheduleModalOpen}
                onClose={() => setIsVestingScheduleModalOpen(false)}
            />
        </div>
    );
};

export default UniversityDetailsPage;
