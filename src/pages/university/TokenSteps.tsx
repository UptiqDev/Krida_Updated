import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ArrowLeft, Bell, CheckCircle, Loader, } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useState } from "react";

export const TokenSteps = () => {

    const [tokenCreationStep, setTokenCreationStep] = useState(1);

    const handleConfirmTransaction = () => {
        setTokenCreationStep(2);
        toast({
            title: 'Transaction Confirmed',
            description: 'Your tokens have been minted successfully.'
        });
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-xl font-bold text-center mb-6">Create token application is in under process</h2>
                <div className="space-y-6">
                    <div className="flex items-start">
                        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <CheckCircle className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium rounded-full">Create Token</h3>
                            <p className="text-gray-500">Your token is initiate creation.</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div
                            className={`w-8 h-8 ${tokenCreationStep >= 2 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                                } rounded-full flex items-center justify-center mr-4 flex-shrink-0`}
                        >
                            {tokenCreationStep >= 2 ? <CheckCircle className="h-5 w-5" /> : "2"}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-medium">Mint Tokens and Setup Vault</h3>
                            <p className="text-gray-500">Click on Confirm Transactions to Mint Your Tokens.</p>
                            {tokenCreationStep === 1 && (
                                <div className="mt-2">
                                    <Button onClick={handleConfirmTransaction}>Confirm Transaction</Button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div
                            className={`w-8 h-8 ${tokenCreationStep >= 3 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                                } rounded-full flex items-center justify-center mr-4 flex-shrink-0`}
                        >
                            {tokenCreationStep >= 3 ? <CheckCircle className="h-5 w-5" /> : "3"}
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">Creating Vesting Schedule</h3>
                            <p className="text-gray-500">Your Token Vesting is Scheduled.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}