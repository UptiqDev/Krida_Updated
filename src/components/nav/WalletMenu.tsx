import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useWallet } from '@solana/wallet-adapter-react';

export const WalletMenu = () => {
    const { disconnect } = useWallet();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline'>Your Wallet</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={disconnect}>Disconnect</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
