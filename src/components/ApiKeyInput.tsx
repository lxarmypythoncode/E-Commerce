
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ExternalLink } from "lucide-react";

interface ApiKeyInputProps {
  onApiKeySet: (key: string) => void;
}

const ApiKeyInput = ({ onApiKeySet }: ApiKeyInputProps) => {
  const [key, setKey] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim().length < 20) {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid OpenWeatherMap API key",
        variant: "destructive",
      });
      return;
    }
    localStorage.setItem("weatherApiKey", key.trim());
    onApiKeySet(key.trim());
    toast({
      title: "API Key Saved",
      description: "Your API key has been saved successfully",
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Welcome to Weather Dashboard</h2>
        <p className="text-muted-foreground">
          To get started, please enter your OpenWeatherMap API key.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="password"
          placeholder="Enter your API key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="font-mono"
        />
        <div className="space-y-2">
          <Button type="submit" className="w-full">
            Save API Key
          </Button>
          <a
            href="https://home.openweathermap.org/api_keys"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Get an API key <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </form>
    </div>
  );
};

export default ApiKeyInput;
