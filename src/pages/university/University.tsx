import { Button } from "@/components/ui/button"
import { Bell, Share2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import SocialLinks from "@/components/SocialLinks";

export const TokenDetails = ({ university, token }) => {

    return (
        <>
            <div className='flex-1 mt-4 md:mt-0'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
                    <div>
                        <h1 className='text-2xl font-bold'>{university?.universityName}</h1>
                        {token && (
                            <p className='text-gray-500 text-sm'>
                                {token?.symbol} ({token.name})
                            </p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className='flex flex-wrap gap-2 mt-4 md:mt-0'>
                        <Button
                            variant='outline'
                            size='sm'
                            className='w-full md:w-auto'
                            disabled
                        >
                            <Share2 className='h-4 w-4 mr-2' />
                            Share Token
                        </Button>
                        <Button
                            variant='outline'
                            size='sm'
                            className='w-full md:w-auto'
                            disabled
                        >
                            Edit Details
                        </Button>
                    </div>
                </div>

                {/* Description and Social Links */}
                <div className='mt-4'>
                    <p className='text-gray-700 mb-4'>{university?.description}</p>
                    <SocialLinks links={university?.socialLinks} />
                </div>
            </div>
        </>
    )
}