
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ForecastProps {
  data: {
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
  };
  loading: boolean;
}

const WeatherForecast = ({ data, loading }: ForecastProps) => {
  if (loading) {
    return <ForecastSkeleton />;
  }

  // Get one forecast per day (excluding today)
  const dailyForecasts = data.list.reduce((acc: any[], forecast) => {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();
    if (!acc.find((f) => new Date(f.dt * 1000).toLocaleDateString() === date)) {
      acc.push(forecast);
    }
    return acc;
  }, []).slice(1, 6);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold tracking-tight">5-Day Forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {dailyForecasts.map((forecast) => (
          <Card
            key={forecast.dt}
            className="p-4 backdrop-blur-sm bg-white/50 space-y-2"
          >
            <div className="text-sm text-muted-foreground">
              {new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
              alt={forecast.weather[0].description}
              className="w-12 h-12 mx-auto"
            />
            <div className="text-lg font-semibold">
              {Math.round(forecast.main.temp)}°C
            </div>
            <div className="text-sm text-muted-foreground capitalize">
              {forecast.weather[0].description}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ForecastSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-7 w-36" />
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {[...Array(5)].map((_, i) => (
        <Card key={i} className="p-4 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="w-12 h-12 mx-auto rounded" />
          <Skeleton className="h-6 w-16 mx-auto" />
          <Skeleton className="h-4 w-20 mx-auto" />
        </Card>
      ))}
    </div>
  </div>
);

export default WeatherForecast;
