
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";
import { TokenProvider } from "./context/TokenContext";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import OnboardUniversityPage from "./pages/OnboardUniversityPage";
import UniversityDetailsPage from "./pages/UniversityDetailsPage";
import TokenCreationPage from "./pages/TokenCreationPage";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <WalletProvider>
          <TokenProvider>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } />
              <Route path="/onboard-university" element={
                <ProtectedRoute>
                  <OnboardUniversityPage />
                </ProtectedRoute>
              } />
              <Route path="/university/:id" element={
                <ProtectedRoute>
                  <UniversityDetailsPage />
                </ProtectedRoute>
              } />
              <Route path="/university/:id/create-token" element={
                <ProtectedRoute>
                  <TokenCreationPage />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TokenProvider>
        </WalletProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
