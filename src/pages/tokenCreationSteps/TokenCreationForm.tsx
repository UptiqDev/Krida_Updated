import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToken } from '@/context/TokenContext';
import { createToken } from '@/services/universityAPI';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

// const {addToken} = useToken();

const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Token name must be at least 2 characters.'
    }),
    symbol: z
        .string()
        .min(2, {
            message: 'Token symbol must be at least 2 characters.'
        })
        .max(5, {
            message: 'Token symbol cannot exceed 5 characters.'
        }),
    description: z.string().min(10, {
        message: 'Description must be at least 10 characters.'
    }),
    decimals: z.string().refine(val => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 18, {
        message: 'Decimals must be between 0 and 18.'
    }),
    transferFeePercentage: z.string().refine(val => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 10, {
        message: 'Transfer fee must be between 0 and 10%.'
    }),
    maxTransferFee: z.string().refine(val => !isNaN(Number(val)) && Number(val) >= 0, {
        message: 'Max transfer fee must be a positive number.'
    })
});

interface TokenData {
    id: string;
    tokenSymbol: string;
    tokenName: string;
    universityId: string;
    tokenDescription: string;
    volume: string;
    price: string;
    tokenImage: string;
    transferFee: {
      percentage: string;
      max: string;
    };
    decimal: string;
  }
  

  interface TokenCreationFormProps {
    onNext: (data: TokenData) => void;
  }
  

const TokenCreationForm = ({ onNext }: TokenCreationFormProps) => {
    const [image, setImage] = useState<string | null>(null);
    const { currentUniversity, setCurrentToken } = useToken();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            symbol: '',
            description: '',
            transferFeePercentage: '2',
            maxTransferFee: '2'
        }
    });

    const navigate = useNavigate();


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            const tokenData = {
                id: '',
                tokenSymbol: values.symbol,
                tokenName: values.name,
                universityId: currentUniversity?.id || '',
                tokenDescription: values.description,
                volume: '$ 0',
                price: '$ 1',
                tokenImage: image || '',
                transferFee: {
                    percentage: values.transferFeePercentage,
                    max: values.maxTransferFee
                },
                decimal: values.decimals
            };


            // const response = await createToken(tokenData);

            // if (response.success) {

                // setCurrentToken(tokenData);

                // navigate(`/universities/${currentUniversity?.id}`);

                // addToken(tokenData);

                onNext(tokenData);

            // } else {
                // console.error(' Token creation failed:', response.error);
                // alert('Token creation failed. Please try again.');
            // }
            
        } catch (error) {
            console.error(' Unexpected error during token creation:', error);
            alert('An unexpected error occurred.');
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = event => {
                setImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create New Token</CardTitle>
                <CardDescription>Define the core details of your university's token.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'
                    >
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Token Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Give token a name'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='symbol'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Token Symbol</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Example: TKN'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Token Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder='Enter Description'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div>
                            <FormLabel>Token Image</FormLabel>
                            <div className='mt-2 flex items-center space-x-4'>
                                <div className='border border-dashed border-gray-300 rounded-md p-4 w-24 h-24 flex items-center justify-center'>
                                    {image ? (
                                        <img
                                            src={image}
                                            alt='Token'
                                            className='max-w-full max-h-full'
                                        />
                                    ) : (
                                        <div className='text-gray-400 text-xs text-center'>Upload Image</div>
                                    )}
                                </div>
                                <div className='flex flex-col space-y-2'>
                                    <Input
                                        type='file'
                                        accept='image/*'
                                        onChange={handleImageUpload}
                                        className='max-w-xs'
                                    />
                                    {image && (
                                        <Button
                                            type='button'
                                            variant='outline'
                                            onClick={() => setImage(null)}
                                            size='sm'
                                        >
                                            Clear
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className='text-lg font-medium mb-4'>Transfer Fees</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </p>
                            <br />
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <FormField
                                    control={form.control}
                                    name='transferFeePercentage'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Transfer Fee Percentage</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='number'
                                                    placeholder='2%'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name='maxTransferFee'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Max Transfer Fee</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='number'
                                                    placeholder='2 UFT'
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

                            <br />
                            <FormField
                                control={form.control}
                                name='decimals'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Decimals</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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

export default TokenCreationForm;
