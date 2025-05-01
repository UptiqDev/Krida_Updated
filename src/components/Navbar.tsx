import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/useMobile';
import { useWallet } from '@solana/wallet-adapter-react';
import { Menu, Plus, Search, Wallet, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ showCreateToken = true }: { showCreateToken?: boolean }) => {
    const { disconnect } = useWallet();
    const location = useLocation();
    const isMobile = useIsMobile();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className='border-b bg-white py-3 sm:py-4 px-4 sm:px-6'>
            <div className='container mx-auto flex items-center justify-between relative'>
                {/* Left - Logo */}
                <div className='flex items-center flex-shrink-0'>
                    <Link
                        to='/home'
                        className='flex items-center'
                    >
                        <img
                            src='/uploads/kridalogo.png'
                            alt='logo'
                            className='h-8 sm:h-10'
                        />
                    </Link>
                </div>

                {/* Center - Navigation Links */}
                <div className='absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-8'>
                    <Link
                        to='/home'
                        className={`text-base font-medium hover:text-krida-gold transition-colors ${location.pathname === '/home' ? 'active-tab' : ''
                            }`}
                    >
                        Home
                    </Link>
                    <span className='text-base font-medium text-gray-400 cursor-not-allowed select-none'>
                        Token Tracker
                    </span>
                </div>

                {/* Right - Actions */}
                <div className='hidden md:flex items-center space-x-4'>
                    <Button
                        variant='ghost'
                        size='icon'
                        disabled
                    >
                        <Search className='h-5 w-5' />
                    </Button>

                    {showCreateToken && (
                        <Link to="/onboard-university" onClick={() => setMobileMenuOpen(false)}>
                            <Button className="bg-krida-dark text-white hover:bg-krida-dark/90 text-sm"
                            >
                                <Plus className="h-4 w-4 mr-1" />
                                Create Token
                            </Button>
                        </Link>
                    )}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline'>
                                <Wallet className='h-5 w-5 text-black-600 mr-1 flex-shrink-0' />
                                Your Wallet
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            <DropdownMenuItem onClick={disconnect}>Disconnect</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Mobile - Menu Icon */}
                <div className='md:hidden flex items-center'>
                    <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
                    </Button>
                </div>

                {/* Mobile Menu */}
                {isMobile && mobileMenuOpen && (
                    <div className='fixed top-16 left-0 right-0 bg-white p-4 z-50 shadow-md md:hidden'>
                        <div className='flex flex-col space-y-4'>
                            <Link
                                to='/home'
                                className={`text-base font-medium hover:text-krida-gold transition-colors ${location.pathname === '/home' ? 'text-krida-gold' : ''
                                    }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            {/* <Link
                to="/token-tracker"
                className={`text-base font-medium hover:text-krida-gold transition-colors ${location.pathname === '/token-tracker' ? 'text-krida-gold' : ''
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Token Tracker
              </Link> */}

                            <span className='text-base font-medium text-gray-400 cursor-not-allowed select-none md:hidden'>
                                Token Tracker
                            </span>

                            <div className='flex items-center justify-between pt-2'>
                                <Button
                                    variant='ghost'
                                    size='icon'
                                >
                                    <Search className='h-5 w-5' />
                                </Button>

                                {showCreateToken && (
                                    <Link to="/onboard-university" onClick={() => setMobileMenuOpen(false)}>
                                        <Button className="bg-krida-dark text-white hover:bg-krida-dark/90 text-sm"
                                        >
                                            <Plus className="h-4 w-4 mr-1" />
                                            Create Token
                                        </Button>
                                    </Link>
                                )}

                                {/* <Button
                                    className='bg-krida-dark text-white hover:bg-krida-dark/90 text-sm opacity-50 rounded-full'
                                >
                                    <Plus className='h-4 w-4 mr-1' />
                                    Create Token
                                </Button> */}

                                <Button
                                    variant='outline'
                                    className='text-sm'
                                    onClick={disconnect}
                                >
                                    Disconnect
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
