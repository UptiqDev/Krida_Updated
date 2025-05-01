import Navbar from '@/components/Navbar';
import TokenTable from '@/components/TokenTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToken } from '@/context/TokenContext';
import { useState } from 'react';

const Home = () => {
    const { tokens, ongoingFTOs } = useToken();
    const [activeTab, setActiveTab] = useState<string>('all-tokens');

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />

            <main className='container mx-auto py-4 sm:py-8 px-4'>
                <div className='mb-6 sm:mb-8'>
                    <h1 className='text-2xl sm:text-3xl font-semibold mb-2'>
                        Welcome to Krida – Powering Passion with Crypto
                    </h1>
                    <p className='text-gray-600 text-sm sm:text-base'>
                        Own a piece of your university pride. Trade, collect, and engage with your favorite university
                        communities like never before.
                    </p>
                </div>

                <Tabs
                    defaultValue='all-tokens'
                    value={activeTab}
                    onValueChange={setActiveTab}
                >
                    <TabsList className='mb-4 sm:mb-8 w-full sm:w-auto'>
                        <TabsTrigger
                            value='all-tokens'
                            className='flex-1 sm:flex-none'
                        >
                            All Tokens
                        </TabsTrigger>
                        <TabsTrigger
                            value='ongoing-ftos'
                            className='flex-1 sm:flex-none'
                        >
                            Ongoing FTOs
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value='all-tokens'>
                        <div className='bg-white rounded-lg shadow overflow-x-auto'>
                            <div className='min-w-full'>
                                <TokenTable tokens={tokens} />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value='ongoing-ftos'>
                        <div className='bg-white rounded-lg shadow overflow-x-auto'>
                            <div className='min-w-full'>
                                <TokenTable
                                    tokens={ongoingFTOs}
                                    showStatus={true}
                                    showListingDate={true}
                                />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};

export default Home;
