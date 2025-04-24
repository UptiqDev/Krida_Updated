
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useToken } from "@/context/TokenContext";
import SocialLinks from "@/components/SocialLinks";
import { ArrowLeft, Share2, CheckCircle, Wallet } from "lucide-react";
import VestingScheduleModal from "@/components/TokenCreationSteps/VestingScheduleModal";
import { toast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const UniversityDetailsPage = () => {
  const { id } = useParams();
  const { universities, tokens, setCurrentUniversity, fetchUniversities } = useToken();
  const [university, setUniversity] = useState(universities.find(u => u.id === id) || null);
  const [token, setToken] = useState(tokens.find(t => t.universityId === id) || null);
  const [isVestingScheduleModalOpen, setIsVestingScheduleModalOpen] = useState(false);
  const [tokenCreationStep, setTokenCreationStep] = useState(1);
  // useEffect(() => {
  //   // Temporary mock data for testing the "Claim Token" section
  //   const mockUniversity = {
  //     id: "test-uni",
  //     name: "Test University",
  //     description: "A test description for the university.",
  //     coverImage: "https://via.placeholder.com/600x200",
  //     logo: "https://via.placeholder.com/100",
  //     socialLinks: {
  //       twitter: "https://twitter.com/test",
  //       linkedin: "https://linkedin.com/school/test",
  //       website: "https://testuniversity.com",
  //     },
  //   };
  
  //   const testToken = {
  //     id: "mock-token-id",
  //     universityId: "test-uni",
  //     universityName: "Test University",
  //     symbol: "TST",
  //     name: "Test Token",
  //     image: "https://via.placeholder.com/50",
  //     volume: 1000000,
  //     price: 1,
  //     createdAt: new Date().toISOString(),
  //     updatedAt: new Date().toISOString(),
  //   };
  
  //   setUniversity(mockUniversity);
  //   setToken(testToken);
  // }, []);
  
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (id) {
      const foundUniversity = universities.find(u => u.id === id) || null;
      setUniversity(foundUniversity);
      setCurrentUniversity(foundUniversity);

      const foundToken = tokens.find(t => t.universityId === id) || null;
      setToken(foundToken);
    }
  }, [id, universities, tokens, setCurrentUniversity]);


  // Fetch latest data when component mounts
  useEffect(() => {
    fetchUniversities();
  }, [fetchUniversities]);

  const handleClaimTokens = () => {
    toast({
      title: "Tokens Claimed",
      description: "Your tokens have been successfully claimed.",
    });
  };

  const handleConfirmTransaction = () => {
    setTokenCreationStep(2);
    toast({
      title: "Transaction Confirmed",
      description: "Your tokens have been minted successfully.",
    });
  };

  if (!university) {
    return <div>University not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main>
        <div className="relative">
          {/* Cover Image */}
          <div className="h-48 md:h-64 bg-gray-200 relative">
            {university.coverImage ? (
              <img
                src={university.coverImage}
                alt={university.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-krida-gold/20 to-krida-gold/40" />
            )}

            <Link
              to="/home"
              className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>

          {/* University Info Card */}
          <div className="container mx-auto px-4 -mt-20">
            <div className="bg-white rounded-lg shadow-lg p-6 relative">
              <div className="absolute -top-16 left-6 rounded-full border-4 border-white overflow-hidden">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center overflow-hidden">
                  {university.logo ? (
                    <img
                      src={university.logo}
                      alt={university.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-300 text-lg">Logo</div>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-between mt-4 md:mt-0">
                <div className="mt-8 md:mt-0">
                  <h1 className="text-2xl font-bold mb-2">{university.name}</h1>
                  {token && <p className="text-gray-500 mb-2">{token.symbol} ({token.name})</p>}
                </div>
                <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Token
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit Details
                  </Button>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-gray-700 mb-4">{university.description}</p>
                <SocialLinks links={university.socialLinks} />
              </div>
            </div>
          </div>

          {/* Token Section */}
          <div className="container mx-auto px-4 py-8">
            {token ? (
              <>
                {/* Claim Token Section */}
                <div className="bg-amber-50 p-4 rounded-md flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                  <div className="flex items-center mb-4 md:mb-0">
                    <Wallet className="h-5 w-5 text-amber-600 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Claim your Token Now!</p>
                      <p className="text-sm text-gray-600">Your account is now active, and 23,000 {token.symbol} tokens are unlocked under your vesting schedule.</p>
                    </div>
                  </div>
                  <Button onClick={handleClaimTokens} className="w-full md:w-auto">Claim Tokens</Button>
                </div>

                {/* Token Creation Process */}
                {tokenCreationStep < 3 && (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                  <h2 className="text-xl font-bold text-center mb-6">Create token application is in under process</h2>
                  
                  <div className="space-y-6">
                    {/* step 1 */}
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Create Token</h3>
                        <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </div>
                    </div>
                    {/* step 2 */}
                    <div className="flex items-start">
                      <div className={`w-8 h-8 ${tokenCreationStep >= 2 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"} rounded-full flex items-center justify-center mr-4 flex-shrink-0`}>
                        {tokenCreationStep >= 2 ? <CheckCircle className="h-5 w-5" /> : "2"}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium">Mint Tokens and Setup Vault</h3>
                        <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        {tokenCreationStep === 1 && (
                          <div className="mt-2">
                            <Button onClick={handleConfirmTransaction}>Confirm Transaction</Button>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* step 3 */}
                    <div className="flex items-start">
                      <div className={`w-8 h-8 ${tokenCreationStep >= 3 ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"} rounded-full flex items-center justify-center mr-4 flex-shrink-0`}>
                        {tokenCreationStep >= 3 ? <CheckCircle className="h-5 w-5" /> : "3"}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Creating Vesting Schedule</h3>
                        <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </div>
                    </div>
                  </div>
                </div>
                )}
                
                {/* Token Info */}
                {tokenCreationStep >= 3 && (
                <div
                  className="bg-white rounded-lg shadow-lg p-6"
                  style={{
                    background: `linear-gradient(0deg, var(--Alpha-Channel-Light-w-9, rgba(255, 255, 255, 0.90)) 0%, var(--Alpha-Channel-Light-w-9, rgba(255, 255, 255, 0.90)) 100%), var(--Background-background_500, #FFA12D)`
                  }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={token.image || "/uploads/GROUP.png"} 
                        alt={token.name} 
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h2 className="text-xl font-bold">{token.symbol} - {token.name}</h2>
                        <p className="text-gray-500">1 {token.symbol} = 1 SOL</p>
                        <div className="flex items-center mt-2">
                          <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                          <p className="text-sm text-gray-600">Initial Token Distribution is scheduled in 3 days</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                      <Button 
                        className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 w-full md:w-auto"
                        onClick={() => setIsVestingScheduleModalOpen(true)}
                      >
                        View Vesting Schedule
                      </Button>
                      <Button className="bg-krida-dark text-white hover:bg-krida-dark/90 rounded-full w-full md:w-auto">
                        Configure Token
                      </Button>
                    </div>
                  </div>
                </div>
                )}
              </>
            ) : (
              <div
                className="bg-white rounded-lg shadow-lg p-6"
                style={{
                  background: `linear-gradient(0deg, var(--Alpha-Channel-Light-w-9, rgba(255, 255, 255, 0.90)) 0%, var(--Alpha-Channel-Light-w-9, rgba(255, 255, 255, 0.90)) 100%), var(--Background-background_500, #FFA12D)`
                }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src="/uploads/Frame.png"
                      alt="UFT Logo"
                      className="w-12 h-12"
                    />
                    <div>
                      <h2 className="text-xl font-semibold my-1">Launch UFT Token</h2>
                      <p className="text-gray-600">
                        Create a custom university token backed by blockchain. Enables secure,
                        verifiable digital assets, for your application.
                      </p>
                    </div>
                  </div>
                  <Link to={`/university/${id}/create-token`} className="w-full md:w-auto">
                    <Button className="bg-krida-dark text-white hover:bg-krida-dark/90 rounded-full w-full">Generate Token</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <VestingScheduleModal 
        open={isVestingScheduleModalOpen} 
        onClose={() => setIsVestingScheduleModalOpen(false)}
      />
    </div>
  );
};

export default UniversityDetailsPage;


