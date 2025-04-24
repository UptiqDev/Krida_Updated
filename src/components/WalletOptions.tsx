import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { AlertCircle, Shield, User } from "lucide-react";
import { toast } from "sonner";

interface WalletOption {
  name: string;
  installed: boolean;
  logo: string;
  multisig?: boolean;
}

const WALLET_OPTIONS: WalletOption[] = [
  { 
    name: "Phantom",
    installed: false,
    logo: "/uploads/phantom.png"
  },
  { 
    name: "Solflare",
    installed: false,
    logo: "/uploads/solfare.png"
  },
  {
    name: "Wallet Connect",
    installed: false,
    logo: "/uploads/wallet_connect.png"
  },
  {
    name: "MetaMask",
    installed: false,
    logo: "/uploads/Metamask.png"
  },
  {
    name: "MultiSig (Admin)",
    installed: true,
    logo: "/uploads/Metamask.png",
    multisig: true
  }
];

interface WalletOptionsProps {
  open: boolean;
  onClose: () => void;
  onConnect: (walletName: string) => void;
}

export default function WalletOptions({ open, onClose, onConnect }: WalletOptionsProps) {
  const [wallets, setWallets] = useState(WALLET_OPTIONS);
  const [multisigMode, setMultisigMode] = useState(false);
  const [signers, setSigners] = useState<string[]>([]);
  const [threshold, setThreshold] = useState(2);
  
  useEffect(() => {
    // Check for installed wallets
    const checkWallets = async () => {
      const updatedWallets = wallets.map(wallet => ({
        ...wallet,
        // For multisig, keep it always installed
        installed: wallet.multisig ? true : !!(window as any)?.[wallet.name.toLowerCase()]
      }));
      setWallets(updatedWallets);
    };
    
    checkWallets();
  }, []);

  const handleConnect = (wallet: WalletOption) => {
    if (wallet.multisig) {
      setMultisigMode(true);
      return;
    }
    
    if (!wallet.installed) {
      window.open(`https://${wallet.name.toLowerCase()}.com`, '_blank');
      toast.error(`Please install ${wallet.name} wallet first`);
      return;
    }
    
    onConnect(wallet.name);
    onClose();
  };
  
  const addSigner = () => {
    const mockAddress = `${Math.random().toString(36).substring(2, 8)}...${Math.random().toString(36).substring(2, 8)}`;
    setSigners([...signers, mockAddress]);
  };
  
  const removeSigner = (index: number) => {
    const newSigners = [...signers];
    newSigners.splice(index, 1);
    setSigners(newSigners);
  };
  
  const createMultisig = () => {
    if (signers.length < threshold) {
      toast.error(`You need at least ${threshold} signers for your multisig wallet`);
      return;
    }
    
    toast.success(`Multisig wallet created with ${signers.length} signers and threshold of ${threshold}`);
    onConnect("MultiSig");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{multisigMode ? "Configure MultiSig Wallet" : "Connect Your Wallet"}</DialogTitle>
        </DialogHeader>
        
        {!multisigMode ? (
          <div className="grid gap-4 py-4">
            {wallets.map((wallet) => (
              <Button
                key={wallet.name}
                variant={wallet.installed ? "default" : "outline"}
                onClick={() => handleConnect(wallet)}
                className="w-full py-6 text-lg flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  {wallet.multisig ? (
                    <Shield className="w-8 h-8" />
                  ) : (
                    <img 
                      src={wallet.logo} 
                      alt={wallet.name} 
                      className="w-8 h-8"
                    />
                  )}
                  <span>{wallet.name}</span>
                </div>
                {!wallet.installed && !wallet.multisig && (
                  <div className="flex items-center text-yellow-500">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    <span className="text-sm">Not Installed</span>
                  </div>
                )}
                {wallet.multisig && (
                  <div className="flex items-center text-blue-500">
                    <Shield className="w-5 h-5 mr-2" />
                    <span className="text-sm">Admin</span>
                  </div>
                )}
              </Button>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">
                Configure a multisig wallet with multiple signers. This wallet requires at least {threshold} signers to approve transactions.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Threshold</h3>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled={threshold <= 1}
                    onClick={() => setThreshold(prev => Math.max(1, prev - 1))}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{threshold}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setThreshold(prev => prev + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Signers ({signers.length})</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={addSigner}
                  >
                    Add Signer
                  </Button>
                </div>
                
                {signers.length === 0 ? (
                  <div className="text-sm text-gray-500 bg-gray-100 p-4 rounded-md text-center">
                    No signers added yet. Click "Add Signer" to add a new signer.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {signers.map((signer, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          <span className="text-sm">{signer}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeSigner(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <Button variant="outline" onClick={() => setMultisigMode(false)}>
                Back
              </Button>
              <Button 
                disabled={signers.length < threshold}
                onClick={createMultisig}
              >
                Create Multisig Wallet
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
