
import { useState } from "react";
import { Card } from "@/components/ui/card";
import CitySearch from "./CitySearch";
import CurrentWeather from "./CurrentWeather";
import WeatherForecast from "./WeatherForecast";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

interface WeatherDashboardProps {
  apiKey: string;
  onInvalidKey: () => void;
}

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
  }>;
}

const WeatherDashboard = ({ apiKey, onInvalidKey }: WeatherDashboardProps) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        ),
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        ),
      ]);

      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast({
          title: "Invalid API Key",
          description: "Please check your API key and try again",
          variant: "destructive",
        });
        onInvalidKey();
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch weather data. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 backdrop-blur-sm bg-white/90">
        <CitySearch onCitySelect={fetchWeatherData} />
      </Card>
      {weatherData && (
        <Card className="p-6 backdrop-blur-sm bg-white/90">
          <CurrentWeather data={weatherData} loading={loading} />
        </Card>
      )}
      {forecastData && (
        <Card className="p-6 backdrop-blur-sm bg-white/90">
          <WeatherForecast data={forecastData} loading={loading} />
        </Card>
      )}
    </div>
  );
};

export default WeatherDashboard;
