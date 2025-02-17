
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface CitySearchProps {
  onCitySelect: (city: string) => void;
}

const CitySearch = ({ onCitySelect }: CitySearchProps) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onCitySelect(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" variant="secondary">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default CitySearch;
