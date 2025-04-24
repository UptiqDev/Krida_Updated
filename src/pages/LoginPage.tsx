
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { Wallet } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { showWalletOptions, connected } = useWallet();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If already connected, redirect to home
    if (connected) {
      navigate('/home');
    }
  }, [connected, navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 sm:p-8 bg-white">
        <div className="max-w-md w-full space-y-6 sm:space-y-8">
          <div className="text-center">
            <img 
              src="/uploads/kridalogo.png"
              alt="krida-logo"
              className="mx-auto h-16 sm:h-20 md:h-24"
            />
            <h1 className="text-xl sm:text-2xl font-semibold mb-2 mt-4">Connect Your Wallet to Continue</h1>
            <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">Securely log in using your crypto wallet. No passwords, no hassle.</p>
          </div>

          <Button
            onClick={showWalletOptions}
            className="w-full bg-krida-dark text-white hover:bg-krida-dark/90 py-4 sm:py-6 text-base sm:text-lg flex items-center justify-center"
          >
            <Wallet className="w-5 h-5 mr-2" />
            Connect Wallet
          </Button>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen bg-krida-gold/20">
        <img
          src="/uploads/LandingImage.png"
          alt="Krida Vault"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
