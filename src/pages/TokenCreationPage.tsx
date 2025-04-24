
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import TokenCreationForm from "@/components/TokenCreationSteps/TokenCreationForm";
import TokenDistributionForm from "@/components/TokenCreationSteps/TokenDistributionForm";
import InitialDistributionForm from "@/components/TokenCreationSteps/InitialDistributionForm";

const TokenCreationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  const steps = [
    { id: 1, name: "Token Creation" },
    { id: 2, name: "Tokens Distribution" },
    { id: 3, name: "Initial Token Distribution" },
  ];
  
  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };
  
  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };
  
  const completeProcess = () => {
    navigate(`/university/${id}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-6 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(`/university/${id}`)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex space-x-2 items-center">
              <span className="text-sm text-gray-500">Dashboard</span>
              <span className="text-sm text-gray-500">/</span>
              <span className="text-sm text-gray-500">National University of Singapore</span>
              <span className="text-sm text-gray-500">/</span>
              <span className="text-sm font-medium">Generate New Token</span>
            </div>
          </div>
          
          <div>
            <Button variant="outline">
              Your Wallet
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar with steps */}
          <div className="md:col-span-1">
            <div className="sticky top-8 space-y-2">
              {currentStep > 1 && (
                <Button 
                  variant="ghost" 
                  className="mb-4" 
                  onClick={goToPreviousStep}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
              
              <div className="space-y-4 ml-2">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-center">
                    <div 
                      className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                        step.id === currentStep 
                          ? 'bg-krida-gold text-white' 
                          : step.id < currentStep 
                            ? 'bg-gray-300 text-white' 
                            : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step.id}
                    </div>
                    <span className={`${
                      step.id === currentStep ? 'font-medium' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:col-span-3">
            {currentStep === 1 && (
              <TokenCreationForm onNext={goToNextStep} />
            )}
            
            {currentStep === 2 && (
              <TokenDistributionForm onNext={goToNextStep} onBack={goToPreviousStep} />
            )}
            
            {currentStep === 3 && (
              <InitialDistributionForm onFinish={completeProcess} onBack={goToPreviousStep} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenCreationPage;
