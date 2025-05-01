import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export const Loader = ({ className }: { className?: string }) => {
  return (
    <div className={cn("mt-40 flex items-center justify-center", className)}>
      <LoaderCircle className="animate-spin text-primary h-4 w-4 mr-2" />{" "}
      <p>Loading...</p>
    </div>
  );
};
