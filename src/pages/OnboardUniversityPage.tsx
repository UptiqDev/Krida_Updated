
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useToken } from "@/context/TokenContext";
import { University } from "@/types";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "University name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  website: z.string().optional(),
});

const OnboardUniversityPage = () => {
  const navigate = useNavigate();
  const { addUniversity } = useToken();
  const [logo, setLogo] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      instagram: "",
      facebook: "",
      linkedin: "",
      twitter: "",
      website: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!logo) {
      toast.error("Please upload a university logo");
      return;
    }
    
    const university: University = {
      id: "",
      name: values.name,
      description: values.description,
      logo: logo,
      coverImage: coverImage || "",
      socialLinks: {
        instagram: values.instagram,
        facebook: values.facebook,
        linkedin: values.linkedin,
        twitter: values.twitter,
        website: values.website,
      },
    };
    
    addUniversity(university);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCoverImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-6 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex space-x-2 items-center">
              <span className="text-sm text-gray-500">Dashboard</span>
              <span className="text-sm text-gray-500">/</span>
              <span className="text-sm font-medium">Onboard University</span>
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
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Onboard University</h1>
          <p className="text-gray-600 mb-8">
            Add a new university to the Krida platform and create their custom token.
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>University Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter University Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Brand Assets</h3>
                <p className="text-gray-500 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                
                <div className="space-y-4">
                  <div>
                    <FormLabel>University Logo</FormLabel>
                    <div className="mt-2 flex items-center space-x-4">
                      <div className="border border-dashed border-gray-300 rounded-md p-4 w-24 h-24 flex items-center justify-center">
                        {logo ? (
                          <img src={logo} alt="Logo" className="max-w-full max-h-full" />
                        ) : (
                          <div className="text-gray-400 text-xs text-center">Upload Logo</div>
                        )}
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleLogoUpload}
                          className="max-w-xs"
                        />
                        {logo && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setLogo(null)}
                            size="sm"
                          >
                            Clear
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <FormLabel>University Cover Image</FormLabel>
                    <div className="mt-2 grid gap-4">
                      <div className="border border-dashed border-gray-300 rounded-md p-4 w-full h-48 flex items-center justify-center">
                        {coverImage ? (
                          <img src={coverImage} alt="Cover" className="max-w-full max-h-full object-cover" />
                        ) : (
                          <div className="text-gray-400 text-center">Upload Cover Image</div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleCoverUpload}
                          className="max-w-xs"
                        />
                        {coverImage && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setCoverImage(null)}
                          >
                            Clear
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Social Media Links</h3>
                <p className="text-gray-500 text-sm">Add links to the university's social media profiles.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                          <Input placeholder="Instagram URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook</FormLabel>
                        <FormControl>
                          <Input placeholder="Facebook URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn</FormLabel>
                        <FormControl>
                          <Input placeholder="LinkedIn URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter</FormLabel>
                        <FormControl>
                          <Input placeholder="Twitter URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>University Website</FormLabel>
                        <FormControl>
                          <Input placeholder="Website URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button type="submit" className="w-full bg-krida-dark hover:bg-krida-dark/90">
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default OnboardUniversityPage;
