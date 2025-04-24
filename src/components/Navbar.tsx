
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWallet } from "@/context/WalletContext";
import { Search, Plus, Menu, X } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = ({ showCreateToken = true }: { showCreateToken?: boolean }) => {
  const { disconnectWallet } = useWallet();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <div className="border-b bg-white py-3 sm:py-4 px-4 sm:px-6">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center">
          <div className="text-xl sm:text-3xl krida-logo">
            <img 
              src="/uploads/kridalogo.png"
              alt="logo"
              className="h-8 sm:h-auto"
              style={{maxWidth: "30%", height: "auto"}}
            />
          </div>
        </Link>
        
        {/* Mobile menu button */}
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        )}
        
        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/home" 
            className={`text-base font-medium hover:text-krida-gold transition-colors ${
              location.pathname === '/home' ? 'active-tab' : ''
            }`}
          >
            Home
          </Link>
          <Link 
            to="/token-tracker" 
            className={`text-base font-medium hover:text-krida-gold transition-colors ${
              location.pathname === '/token-tracker' ? 'active-tab' : ''
            }`}
          >
            Token Tracker
          </Link>
        </div>
        
        {/* Right Side Actions - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          
          {showCreateToken && (
            <Link to="/onboard-university">
              <Button className="bg-krida-dark text-white hover:bg-krida-dark/90">
                <Plus className="h-4 w-4 mr-2" />
                Create Token
              </Button>
            </Link>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Your Wallet</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={disconnectWallet}>
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white p-4 z-50 shadow-md md:hidden">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/home" 
                className={`text-base font-medium hover:text-krida-gold transition-colors ${
                  location.pathname === '/home' ? 'text-krida-gold' : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/token-tracker" 
                className={`text-base font-medium hover:text-krida-gold transition-colors ${
                  location.pathname === '/token-tracker' ? 'text-krida-gold' : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Token Tracker
              </Link>
              
              <div className="flex items-center justify-between pt-2">
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
                
                {showCreateToken && (
                  <Link to="/onboard-university" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="bg-krida-dark text-white hover:bg-krida-dark/90 text-sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Create Token
                    </Button>
                  </Link>
                )}
                
                <Button 
                  variant="outline" 
                  className="text-sm"
                  onClick={disconnectWallet}
                >
                  Disconnect
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
