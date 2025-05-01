import { Button } from "@/components/ui/button"
import { Bell } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export const ClaimToken = ({ isAdmin, token }) => {

    const handleClaimTokens = () => {
        toast({
            title: 'Tokens Claimed',
            description: 'Your tokens have been successfully claimed.'
        });
    };

    return (
        <>
            {!isAdmin && (
                <div className='bg-amber-50 p-4 rounded-md flex flex-col md:flex-row items-start md:items-center justify-between mb-6'>
                    <div className='flex items-center mb-4 md:mb-0'>
                        <Bell className='h-5 w-5 text-black-600 mr-3 flex-shrink-0' />
                        <div>
                            <p className='font-medium'>Claim your Token Now!</p>
                            <p className='text-sm text-gray-600'>
                                Your account is now active, and 23,000 {token?.symbol || 'UFT'} tokens
                                are unlocked under your vesting schedule.
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={handleClaimTokens}
                        className='w-full md:w-auto bg-krida-dark text-white text-sm rounded-full'
                    >
                        Claim Tokens
                    </Button>
                </div>
            )}
        </>
    )
}