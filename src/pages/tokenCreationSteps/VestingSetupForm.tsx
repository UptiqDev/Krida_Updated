import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToken } from '@/context/TokenContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { Description } from '@radix-ui/react-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    cliffDuration: z.string(),
    unlockPercentage1: z.string(),
    unlockPercentage2: z.string(),
    timePeriod: z.string()
});

interface VestingSetupFormProps {
    onFinish: () => void;
    onBack: () => void;
}

const VestingSetupForm = ({ onFinish, onBack }: VestingSetupFormProps) => {
    const { addToken, currentToken } = useToken();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cliffDuration: '1 Month',
            unlockPercentage1: '10 %',
            unlockPercentage2: '10 %',
            timePeriod: 'Every 2 Months'
        }
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Finalize token creation and add to context
        if (currentToken) {
            addToken(currentToken);
        }

        onFinish();
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Vesting Setup</CardTitle> <br />
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
                            <h3 className='text-lg font-medium mb-4'>Cliff Duration</h3>
                            <p className='text-gray-500'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </p>{' '}
                            <br />
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <FormField
                                    control={form.control}
                                    name='cliffDuration'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Cliff Duration</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder='Select cliff duration' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value='1 Month'>1 Month</SelectItem>
                                                    <SelectItem value='3 Months'>3 Months</SelectItem>
                                                    <SelectItem value='6 Months'>6 Months</SelectItem>
                                                    <SelectItem value='12 Months'>12 Months</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='unlockPercentage1'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Unlock Percentage</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder='Select unlock %' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value='10 %'>10 %</SelectItem>
                                                    <SelectItem value='20 %'>20 %</SelectItem>
                                                    <SelectItem value='30 %'>30 %</SelectItem>
                                                    <SelectItem value='40 %'>40 %</SelectItem>
                                                    <SelectItem value='50 %'>50 %</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className='text-lg font-medium mb-4'>Vesting Interval</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </p>{' '}
                            <br />
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <FormField
                                    control={form.control}
                                    name='unlockPercentage2'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Unlock Percentage</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder='Select unlock %' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value='10 %'>10 %</SelectItem>
                                                    <SelectItem value='20 %'>20 %</SelectItem>
                                                    <SelectItem value='30 %'>30 %</SelectItem>
                                                    <SelectItem value='40 %'>40 %</SelectItem>
                                                    <SelectItem value='50 %'>50 %</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='timePeriod'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Time Period</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder='Select time period' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value='Every 2 Months'>Every 2 Months</SelectItem>
                                                    <SelectItem value='Every 3 Months'>Every 3 Months</SelectItem>
                                                    <SelectItem value='Every 6 Months'>Every 6 Months</SelectItem>
                                                    <SelectItem value='Every 12 Months'>Every 12 Months</SelectItem>
                                                </SelectContent>
                                            </Select>
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
                                Back
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default VestingSetupForm;
