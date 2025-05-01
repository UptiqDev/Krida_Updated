import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Wallet, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface WalletAllocation {
    walletAddress: string;
    percentage: string;
    allocation: string; // Added to match the expected structure
}

interface VestingEntityData {
    type: string;
    percentage: string;
    wallets: WalletAllocation[];
    cliffDuration: string;
    cliffUnlockPercentage: string;
    vestingUnlockPercentage: string;
    vestingTimePeriod: string;
}

interface VestingEntityModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (entityData: VestingEntityData) => void;
    selectedEntityType?: string;
}

const VestingEntityModal = ({ open, onClose, onSave, selectedEntityType }: VestingEntityModalProps) => {
    const [entityType, setEntityType] = useState<string>(selectedEntityType || 'Founders');
    const [allocatePercentage, setAllocatePercentage] = useState<string>('12');
    const [wallets, setWallets] = useState<WalletAllocation[]>([
        { walletAddress: 'd8y/d8rgh9jh0987rj1g9us087', percentage: '50', allocation: '' },
        { walletAddress: 'd8y/d8rgh9jh0987rj1g9us087', percentage: '50', allocation: '' }
    ]);
    const [cliffDuration, setCliffDuration] = useState<string>('1 Month');
    const [cliffUnlockPercentage, setCliffUnlockPercentage] = useState<string>('10');
    const [vestingUnlockPercentage, setVestingUnlockPercentage] = useState<string>('10');
    const [vestingTimePeriod, setVestingTimePeriod] = useState<string>('Every 2 Months');

    const remainingPercentage = 100 - parseInt(allocatePercentage || '0');

    // Update entityType when selectedEntityType changes
    useEffect(() => {
        if (selectedEntityType) {
            setEntityType(selectedEntityType);
        }
    }, [selectedEntityType]);

    const handleAddWallet = () => {
        setWallets([...wallets, { walletAddress: '', percentage: '', allocation: '' }]);
    };

    const handleRemoveWallet = (index: number) => {
        const newWallets = [...wallets];
        newWallets.splice(index, 1);
        setWallets(newWallets);
    };

    const handleWalletAddressChange = (index: number, value: string) => {
        const newWallets = [...wallets];
        newWallets[index].walletAddress = value;
        setWallets(newWallets);
    };

    const handleWalletPercentageChange = (index: number, value: string) => {
        const newWallets = [...wallets];
        newWallets[index].percentage = value;
        setWallets(newWallets);
    };

    const handleSave = () => {
        const entityData: VestingEntityData = {
            type: entityType,
            percentage: allocatePercentage,
            wallets,
            cliffDuration,
            cliffUnlockPercentage,
            vestingUnlockPercentage,
            vestingTimePeriod
        };
        onSave(entityData);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onClose}
        >
            <DialogContent className='sm:max-w-[500px]'>
                <DialogHeader>
                    <DialogTitle>Create Vesting Entity</DialogTitle>
                    <DialogClose className='absolute right-4 top-4' />
                    <p className='text-sm text-gray-500'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </p>
                </DialogHeader>

                <div className='space-y-6 py-4'>
                    <div>
                        <Select
                            value={entityType}
                            onValueChange={setEntityType}
                        >
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder='Select entity type' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='University'>University</SelectItem>
                                <SelectItem value='Founders'>Founders</SelectItem>
                                <SelectItem value='Advisors'>Advisors</SelectItem>
                                <SelectItem value='Institutional Pre-sale'>Institutional Pre-sale</SelectItem>
                                <SelectItem value='Marketing'>Marketing</SelectItem>
                                <SelectItem value='CEX Reserved'>CEX Reserved</SelectItem>
                                <SelectItem value='Misc'>Misc</SelectItem>
                                <SelectItem value='Remaining'>Remaining</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Allocate Percentage</label>
                        <Input
                            type='text'
                            value={allocatePercentage}
                            onChange={e => setAllocatePercentage(e.target.value)}
                            className='w-full'
                            placeholder='12%'
                        />
                        <p className='text-sm text-gray-500 mt-1'>{remainingPercentage}% Remaining</p>
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Link wallet and allocate percentage
                        </label>
                        <div className='space-y-2'>
                            {wallets.map((wallet, index) => (
                                <div
                                    key={index}
                                    className='flex gap-2 items-center'
                                >
                                    <Input
                                        value={wallet.walletAddress}
                                        onChange={e => handleWalletAddressChange(index, e.target.value)}
                                        placeholder='Wallet Address'
                                        className='flex-grow'
                                    />
                                    <Input
                                        value={wallet.percentage}
                                        onChange={e => handleWalletPercentageChange(index, e.target.value)}
                                        placeholder='%'
                                        className='w-20'
                                    />
                                    <Button
                                        type='button'
                                        variant='ghost'
                                        size='icon'
                                        onClick={() => handleRemoveWallet(index)}
                                    >
                                        <X className='h-4 w-4' />
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type='button'
                                variant='outline'
                                size='sm'
                                onClick={handleAddWallet}
                                className='mt-2'
                            >
                                <Plus className='h-4 w-4 mr-2' /> Add Wallet
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h3 className='text-sm font-medium mb-2'>Cliff Duration</h3>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div>
                                <label className='text-sm text-gray-500'>Cliff Duration</label>
                                <Select
                                    value={cliffDuration}
                                    onValueChange={setCliffDuration}
                                >
                                    <SelectTrigger className='w-full'>
                                        <SelectValue placeholder='Select duration' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='1 Month'>1 Month</SelectItem>
                                        <SelectItem value='2 Months'>2 Months</SelectItem>
                                        <SelectItem value='3 Months'>3 Months</SelectItem>
                                        <SelectItem value='6 Months'>6 Months</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className='text-sm text-gray-500'>Unlock Percentage</label>
                                <Select
                                    value={cliffUnlockPercentage}
                                    onValueChange={setCliffUnlockPercentage}
                                >
                                    <SelectTrigger className='w-full'>
                                        <SelectValue placeholder='Select percentage' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='10'>10%</SelectItem>
                                        <SelectItem value='15'>15%</SelectItem>
                                        <SelectItem value='20'>20%</SelectItem>
                                        <SelectItem value='25'>25%</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className='text-sm font-medium mb-2'>Vesting Interval</h3>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div>
                                <label className='text-sm text-gray-500'>Unlock Percentage</label>
                                <Select
                                    value={vestingUnlockPercentage}
                                    onValueChange={setVestingUnlockPercentage}
                                >
                                    <SelectTrigger className='w-full'>
                                        <SelectValue placeholder='Select percentage' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='10'>10%</SelectItem>
                                        <SelectItem value='15'>15%</SelectItem>
                                        <SelectItem value='20'>20%</SelectItem>
                                        <SelectItem value='25'>25%</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className='text-sm text-gray-500'>Time Period</label>
                                <Select
                                    value={vestingTimePeriod}
                                    onValueChange={setVestingTimePeriod}
                                >
                                    <SelectTrigger className='w-full'>
                                        <SelectValue placeholder='Select time period' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='Every 2 Months'>Every 2 Months</SelectItem>
                                        <SelectItem value='Every 3 Months'>Every 3 Months</SelectItem>
                                        <SelectItem value='Every 6 Months'>Every 6 Months</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-end space-x-2'>
                        <Button
                            variant='outline'
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSave}>Save</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default VestingEntityModal;
