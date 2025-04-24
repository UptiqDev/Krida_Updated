import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface WalletOption {
  name: string;
  installed: boolean;
  logo: string;
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
  }
];

interface WalletOptionsProps {
  open: boolean;
  onClose: () => void;
  onConnect: (walletName: string) => void;
}

export default function WalletOptions({
  open,
  onClose,
  onConnect
}: WalletOptionsProps) {
  const [wallets, setWallets] = useState(WALLET_OPTIONS);

  useEffect(() => {
    const checkWallets = async () => {
      const updatedWallets = wallets.map((wallet) => ({
        ...wallet,
        installed: !!(window as any)?.[wallet.name.toLowerCase()]
      }));
      setWallets(updatedWallets);
    };

    checkWallets();
  }, []);

  const handleConnect = (wallet: WalletOption) => {
    if (!wallet.installed) {
      window.open(`https://${wallet.name.toLowerCase()}.com`, "_blank");
      toast.error(`Please install ${wallet.name} wallet first`);
      return;
    }

    onConnect(wallet.name);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {wallets.map((wallet) => (
            <Button
              key={wallet.name}
              variant={wallet.installed ? "default" : "outline"}
              onClick={() => handleConnect(wallet)}
              className="w-full py-6 text-lg flex justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                <img src={wallet.logo} alt={wallet.name} className="w-8 h-8" />
                <span>{wallet.name}</span>
              </div>

              {!wallet.installed && (
                <div className="flex items-center text-yellow-500">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span className="text-sm">Not Installed</span>
                </div>
              )}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
