import { Button } from '@/components/ui/button';
import { useAccessControl } from '@/context/UserContext';
import { useWallet } from '@solana/wallet-adapter-react';
import { Calendar, Plus, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface MobileNavProps {
    showCreateToken?: boolean;
    onCreateEventClick: () => void;
    onClose: () => void;
}

export const MobileNav = ({ showCreateToken = true, onCreateEventClick, onClose }: MobileNavProps) => {
    const { disconnect } = useWallet();
    const { isAdmin, isUniversity } = useAccessControl();
    const location = useLocation();

    return (
        <div className='flex flex-col space-y-4'>
            {isAdmin && (
                <>
                    <Link
                        to='/home'
                        className={`text-base font-medium hover:text-krida-gold transition-colors ${
                            location.pathname === '/home' ? 'text-krida-gold' : ''
                        }`}
                        onClick={onClose}
                    >
                        Home
                    </Link>
                    <Link
                        to='/token-tracker'
                        className={`text-base font-medium hover:text-krida-gold transition-colors ${
                            location.pathname === '/token-tracker' ? 'text-krida-gold' : ''
                        }`}
                        onClick={onClose}
                    >
                        Token Tracker
                    </Link>
                </>
            )}

            {isUniversity && (
                <Link
                    to='/events'
                    className={`text-base font-medium hover:text-krida-gold transition-colors ${
                        location.pathname === '/events' ? 'text-krida-gold' : ''
                    }`}
                    onClick={onClose}
                >
                    Events
                </Link>
            )}

            <div className='flex items-center justify-between pt-2'>
                <Button
                    variant='ghost'
                    size='icon'
                >
                    <Search className='h-5 w-5' />
                </Button>

                {isAdmin && showCreateToken && (
                    <Link
                        to='/onboard-university'
                        onClick={onClose}
                    >
                        <Button
                            className='bg-krida-dark text-white hover:bg-krida-dark/90 text-sm'
                        >
                            <Plus className='h-4 w-4 mr-1' />
                            Create Token
                        </Button>
                    </Link>
                )}

                {isUniversity && (
                    <Button
                        className='bg-krida-dark text-white hover:bg-krida-dark/90 text-sm'
                        onClick={() => {
                            onClose();
                            onCreateEventClick();
                        }}
                    >
                        <Calendar className='h-4 w-4 mr-1' />
                        Create Event
                    </Button>
                )}

                <Button
                    variant='outline'
                    className='text-sm'
                    onClick={() => {
                        onClose();
                        disconnect();
                    }}
                >
                    Disconnect
                </Button>
            </div>
        </div>
    );
};
