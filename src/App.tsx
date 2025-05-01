import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { TokenProvider } from './context/TokenContext';
import { UserProvider } from './context/UserContext';
import WalletConnectionProvider from './context/WalletConnectionProvider';
import AppRoutes from './routes/AppRoutes';

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <WalletConnectionProvider>
                    <UserProvider>
                        <TokenProvider>
                            <AppRoutes />
                        </TokenProvider>
                    </UserProvider>
                </WalletConnectionProvider>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;