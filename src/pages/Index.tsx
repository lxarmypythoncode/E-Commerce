
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import ApiKeyInput from "@/components/ApiKeyInput";
import WeatherDashboard from "@/components/WeatherDashboard";

const Index = () => {
  const [apiKey, setApiKey] = useState<string>("");

  useEffect(() => {
    const storedKey = localStorage.getItem("weatherApiKey");
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {!apiKey ? (
          <Card className="p-6 backdrop-blur-sm bg-white/90">
            <ApiKeyInput onApiKeySet={setApiKey} />
          </Card>
        ) : (
          <WeatherDashboard apiKey={apiKey} onInvalidKey={() => setApiKey("")} />
        )}
      </div>
    </div>
  );
};

export default Index;
