import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    allocateToPresale: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Value must be a positive number.'
    }),
    listingPrice: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Value must be a positive number.'
    }),
    minAllocation: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Value must be a positive number.'
    }),
    maxAllocation: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Value must be a positive number.'
    })
});

interface InitialDistributionFormProps {
    onFinish: () => void;
    onBack: () => void;
}

const InitialDistributionForm = ({ onFinish, onBack }: InitialDistributionFormProps) => {
    const [startDate, setStartDate] = useState<Date | undefined>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
    const [endDate, setEndDate] = useState<Date | undefined>(new Date(Date.now() + 12 * 24 * 60 * 60 * 1000));
    const [startDateOpen, setStartDateOpen] = useState(false);
    const [endDateOpen, setEndDateOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            allocateToPresale: '1250000',
            listingPrice: '1',
            minAllocation: '10',
            maxAllocation: '1000'
        }
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Process form values here
        onFinish();
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Initial Token Distribution</CardTitle>
                <CardDescription>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-8'
                    >
                        <div>
                            <h3 className='text-lg font-medium mb-4'>Allocation Details</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </p>{' '}
                            <br />
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <FormField
                                    control={form.control}
                                    name='allocateToPresale'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Token allocate to presale</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='listingPrice'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Listing Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='1 SOL'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className='text-lg font-medium mb-4'>Distribution Schedule</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </p>{' '}
                            <br />
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <FormItem>
                                    <FormLabel>Start Time</FormLabel>
                                    <Popover
                                        open={startDateOpen}
                                        onOpenChange={setStartDateOpen}
                                    >
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant='outline'
                                                    className={cn(
                                                        'w-full pl-3 text-left font-normal',
                                                        !startDate && 'text-muted-foreground'
                                                    )}
                                                >
                                                    {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                                                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className='w-auto p-0'
                                            align='start'
                                        >
                                            <Calendar
                                                mode='single'
                                                selected={startDate}
                                                onSelect={date => {
                                                    setStartDate(date);
                                                    setStartDateOpen(false);
                                                }}
                                                initialFocus
                                                className='p-3 pointer-events-auto'
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormItem>

                                <FormItem>
                                    <FormLabel>End Time</FormLabel>
                                    <Popover
                                        open={endDateOpen}
                                        onOpenChange={setEndDateOpen}
                                    >
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant='outline'
                                                    className={cn(
                                                        'w-full pl-3 text-left font-normal',
                                                        !endDate && 'text-muted-foreground'
                                                    )}
                                                >
                                                    {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                                                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className='w-auto p-0'
                                            align='start'
                                        >
                                            <Calendar
                                                mode='single'
                                                selected={endDate}
                                                onSelect={date => {
                                                    setEndDate(date);
                                                    setEndDateOpen(false);
                                                }}
                                                initialFocus
                                                className='p-3 pointer-events-auto'
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormItem>
                            </div>
                        </div>

                        <div>
                            <h3 className='text-lg font-medium mb-4'>Per Wallet Limit</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </p>{' '}
                            <br />
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <FormField
                                    control={form.control}
                                    name='minAllocation'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Min Allocation</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='10 Token'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='maxAllocation'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Max Allocation</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='1000 Token'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className='flex space-x-4 pt-4'>
                            <Button
                                className='bg-krida-dark text-white hover:bg-krida-dark/90 rounded-full'
                                type='submit'
                            >
                                Save and Proceed
                            </Button>
                            <Button
                                className='bg-gray-100 rounded-full'
                                type='button'
                                variant='outline'
                                onClick={onBack}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default InitialDistributionForm;
