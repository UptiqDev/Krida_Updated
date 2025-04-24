
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus, Wallet, Pencil } from "lucide-react";
import { useToken } from "@/context/TokenContext";
import VestingEntityModal from "./VestingEntityModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const formSchema = z.object({
  tokensToMint: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Tokens to mint must be a positive number.",
  }),
  decimals: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 18, {
    message: "Decimals must be between 0 and 18.",
  }),
});

interface TokenDistributionFormProps {
  onNext: () => void;
  onBack: () => void;
}

interface VestingEntity {
  type: string;
  percentage: string;
  color: string;
  tokens: string;
  walletCount: number;
}

const entityTypes = [
  "University",
  "Founders",
  "Advisors",
  "Institutional Pre-sale",
  "Marketing",
  "CEX Reserved",
  "Misc",
  "Remaining"
];

const TokenDistributionForm = ({ onNext, onBack }: TokenDistributionFormProps) => {
  const { tokenDistribution } = useToken();
  const [isVestingEntityModalOpen, setIsVestingEntityModalOpen] = useState(false);
  const [selectedEntityType, setSelectedEntityType] = useState<string | undefined>(undefined);
  const [vestingEntities, setVestingEntities] = useState<VestingEntity[]>([
    { 
      type: "University", 
      percentage: "12", 
      color: "bg-blue-400", 
      tokens: "7,500,000", 
      walletCount: 1 
    },
    { 
      type: "Founders", 
      percentage: "23", 
      color: "bg-orange-400", 
      tokens: "14,500,000", 
      walletCount: 3 
    }
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokensToMint: "1,250,000",
      decimals: "6",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onNext();
  };

  const handleSaveVestingEntity = (entityData: any) => {
    const entityTypeColorMap: Record<string, string> = {
      "University": "bg-blue-400",
      "Founders": "bg-orange-400",
      "Advisors": "bg-purple-400",
      "Institutional Pre-sale": "bg-green-400",
      "Marketing": "bg-red-400",
      "CEX Reserved": "bg-yellow-400",
      "Misc": "bg-indigo-400",
      "Remaining": "bg-gray-400"
    };
    
    const tokens = parseInt(entityData.percentage) * 75000 + ",000";
    
    const newEntity: VestingEntity = {
      type: entityData.type,
      percentage: entityData.percentage,
      color: entityTypeColorMap[entityData.type] || "bg-purple-400",
      tokens: tokens,
      walletCount: entityData.wallets.length
    };
    
    setVestingEntities([...vestingEntities, newEntity]);
    setSelectedEntityType(undefined);
  };

  const openEntityModal = (entityType: string) => {
    setSelectedEntityType(entityType);
    setIsVestingEntityModalOpen(true);
  };

  const totalAllocatedPercentage = vestingEntities.reduce(
    (acc, entity) => acc + parseInt(entity.percentage), 0
  );

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle>Tokens Distribution</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Token Configuration</h3>
                <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <FormField
                    control={form.control}
                    name="tokensToMint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tokens To Mint</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="decimals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Decimals</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Vesting Plan</h3>
                <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                
                {vestingEntities.length > 0 ? (
                  <div className="mt-4">
                    <div className="flex mb-4">
                      {vestingEntities.map((entity, index) => (
                        <div 
                          key={index}
                          className={`h-10 ${entity.color}`}
                          style={{width: `${entity.percentage}%`}}
                        >
                        </div>
                      ))}
                      {totalAllocatedPercentage < 100 && (
                        <div 
                          className="h-10 bg-gray-100"
                          style={{width: `${100 - totalAllocatedPercentage}%`}}
                        >
                        </div>
                      )}
                    </div>

                    {vestingEntities.map((entity, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between py-2 border-b last:border-b-0"
                      >
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded ${entity.color} mr-2`}></div>
                          <span>{entity.type}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="mr-4">{entity.percentage}% ({entity.tokens} Tokens)</span>
                          <div className="flex items-center mr-4">
                            <Wallet className="h-4 w-4 mr-1" />
                            <span>{entity.walletCount}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-100 p-4 rounded-md text-center text-gray-500 mt-4">
                    Currently no entity selected
                  </div>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="mt-4"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Create Vesting Entity
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {entityTypes.map((type) => (
                      <DropdownMenuItem 
                        key={type}
                        onClick={() => openEntityModal(type)}
                      >
                        {type}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  className="bg-krida-dark text-white hover:bg-krida-dark/90 rounded-full order-2 sm:order-1" 
                  type="submit"
                >
                  Save and Proceed
                </Button>
                <Button 
                  className="bg-gray-100 rounded-full order-1 sm:order-2" 
                  type="button" 
                  variant="outline" 
                  onClick={onBack}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
      
      <VestingEntityModal 
        open={isVestingEntityModalOpen} 
        onClose={() => setIsVestingEntityModalOpen(false)}
        onSave={handleSaveVestingEntity}
        selectedEntityType={selectedEntityType}
      />
    </Card>
  );
};

export default TokenDistributionForm;
