import { Button } from '@/components/ui/button';
import { useAccessControl } from '@/context/UserContext';
import { Calendar, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WalletMenu } from './WalletMenu';

interface NavActionsProps {
    showCreateToken?: boolean;
    onCreateEventClick: () => void;
}

export const NavActions = ({ showCreateToken = true, onCreateEventClick }: NavActionsProps) => {
    const { isAdmin, isUniversity } = useAccessControl();

    return (
        <div className='hidden md:flex items-center space-x-4'>
            <Button
                variant='ghost'
                size='icon'
            >
                <Search className='h-5 w-5' />
            </Button>

            {isAdmin && showCreateToken && (
                <Link to='/onboard-university'>
                    <Button
                        className='bg-krida-dark text-white hover:bg-krida-dark/90'
                    >
                        <Plus className='h-4 w-4 mr-2' />
                        Create Token
                    </Button>
                </Link>
            )}

            {isUniversity && (
                <Button
                    className='bg-krida-dark text-white hover:bg-krida-dark/90'
                    onClick={onCreateEventClick}
                >
                    <Calendar className='h-4 w-4 mr-2' />
                    Create Event
                </Button>
            )}

            <WalletMenu />
        </div>
    );
};
