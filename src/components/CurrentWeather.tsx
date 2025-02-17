
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface CurrentWeatherProps {
  data: {
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
  };
  loading: boolean;
}

const CurrentWeather = ({ data, loading }: CurrentWeatherProps) => {
  if (loading) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">{data.name}</h2>
        <div className="flex items-center gap-4">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
            className="w-16 h-16"
          />
          <div>
            <div className="text-4xl font-light">{Math.round(data.main.temp)}°C</div>
            <div className="text-muted-foreground capitalize">
              {data.weather[0].description}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <WeatherCard
          title="Feels Like"
          value={`${Math.round(data.main.feels_like)}°C`}
        />
        <WeatherCard
          title="Humidity"
          value={`${data.main.humidity}%`}
        />
        <WeatherCard
          title="Wind Speed"
          value={`${data.wind.speed} m/s`}
        />
        <WeatherCard
          title="Pressure"
          value={`${data.main.pressure} hPa`}
        />
      </div>
    </div>
  );
};

const WeatherCard = ({ title, value }: { title: string; value: string }) => (
  <Card className="p-4 backdrop-blur-sm bg-white/50">
    <div className="text-sm text-muted-foreground">{title}</div>
    <div className="text-xl font-semibold mt-1">{value}</div>
  </Card>
);

const WeatherSkeleton = () => (
  <div className="space-y-6">
    <div className="space-y-2">
      <Skeleton className="h-8 w-48" />
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded" />
        <div>
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-4 w-32 mt-2" />
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="p-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-16 mt-1" />
        </Card>
      ))}
    </div>
  </div>
);

export default CurrentWeather;
