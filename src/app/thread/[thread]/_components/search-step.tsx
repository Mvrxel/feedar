import { Icons } from "@/components/ui/icons";
import { Check } from "lucide-react";

type SearchStepProps = {
  isLoading: boolean;
  stepName: string;
};
export function SearchStep({ isLoading, stepName }: SearchStepProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <div>
        {isLoading ? (
          <Icons.spinner className="h-4 w-4 animate-spin" />
        ) : (
          <Check className="h-4 w-4" />
        )}
      </div>
      <span>{stepName}</span>
    </div>
  );
}
