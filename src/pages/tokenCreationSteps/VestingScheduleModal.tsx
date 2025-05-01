import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { Bell, X } from 'lucide-react';
import React from 'react';

interface VestingDate {
    date: string;
    percentage: string;
    tokens: string;
    status: 'Released' | 'Pending';
}

interface VestingScheduleModalProps {
    open: boolean;
    onClose: () => void;
}

const VestingScheduleModal = ({ open, onClose }: VestingScheduleModalProps) => {
    const vestingDates: VestingDate[] = [
        { date: '12/05/2025', percentage: '10%', tokens: '125,000', status: 'Released' },
        { date: '12/06/2025', percentage: '10%', tokens: '125,000', status: 'Pending' },
        { date: '12/07/2025', percentage: '10%', tokens: '125,000', status: 'Pending' },
        { date: '12/08/2025', percentage: '10%', tokens: '125,000', status: 'Pending' }
    ];

    const handleClaimTokens = () => {
        toast({
            title: 'Tokens Claimed',
            description: 'Your tokens have been successfully claimed.'
        });
        onClose();
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onClose}
        >
            <DialogContent className='sm:max-w-[600px]'>
                <div className='flex justify-between items-center'>
                    <DialogTitle>Vesting Schedule</DialogTitle>
                    <DialogClose className='h-6 w-6 rounded-full hover:bg-gray-100 inline-flex items-center justify-center'></DialogClose>
                </div>
                <p className='text-sm text-gray-500 mt-1'>
                    You're receiving 10% of UFT tokens every 2 months – until your full allocation is unlocked.
                </p>

                <div className='space-y-6 py-4'>
                    <div className='bg-amber-50 p-4 rounded-md flex flex-col sm:flex-row items-start sm:items-center justify-between'>
                        <div className='flex items-center mb-3 sm:mb-0'>
                            <Bell className='h-5 w-5 text-amber-600 mr-3 flex-shrink-0' />
                            <div>
                                <p className='font-medium'>Claim your Token Now!</p>
                                <p className='text-sm text-gray-600'>
                                    Your account is now active, and 23,000 UFT tokens are unlocked under your vesting
                                    schedule.
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={handleClaimTokens}
                            className='w-full sm:w-auto'
                        >
                            Claim Tokens
                        </Button>
                    </div>

                    <div>
                        <h3 className='font-medium mb-4'>Scheduled Vesting Dates</h3>
                        <div className='overflow-auto'>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Percentage</TableHead>
                                        <TableHead>Tokens</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {vestingDates.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.date}</TableCell>
                                            <TableCell>{item.percentage}</TableCell>
                                            <TableCell>{item.tokens}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                        item.status === 'Released'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default VestingScheduleModal;
