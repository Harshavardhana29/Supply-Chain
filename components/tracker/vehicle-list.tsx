
import { Vehicle } from './vehicle';
import { Truck, Bus, Clock, User, MapPin } from 'lucide-react';

interface VehicleListProps {
  vehicles: Vehicle[];
  onVehicleSelect: (vehicle: Vehicle) => void;
  selectedVehicle: Vehicle | null;
}

const VehicleList = ({ vehicles, onVehicleSelect, selectedVehicle }: VehicleListProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en-route':
        return 'text-green-600 bg-green-50 border border-green-200';
      case 'stopped':
        return 'text-red-600 bg-red-50 border border-red-200';
      case 'loading':
        return 'text-yellow-600 bg-yellow-50 border border-yellow-200';
      case 'maintenance':
        return 'text-orange-600 bg-orange-50 border border-orange-200';
      default:
        return 'text-muted-foreground bg-muted border border-border';
    }
  };

  return (
    <div className="h-full bg-background/95 backdrop-blur-sm border-r overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-3 border-b">
        
        <div className="flex justify-between space-x-4 text-sm">
          <h2 className="text-lg font-semibold text-foreground mb-2">Active Vehicles</h2>
          <div className="flex items-center space-x-1">
            <Truck className="w-4 h-4 text-blue-500" />
            <span className="text-muted-foreground">{vehicles.filter(v => v.type === 'truck').length}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bus className="w-4 h-4 text-green-500" />
            <span className="text-muted-foreground">{vehicles.filter(v => v.type === 'bus').length}</span>
          </div>
        </div>
      </div>

      {/* Vehicle List */}
      <div className="flex-1 overflow-y-auto">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className={`p-4 border-b cursor-pointer transition-all duration-200 ${
              selectedVehicle?.id === vehicle.id
                ? 'bg-accent border-l-4 border-l-primary'
                : 'hover:bg-accent/50'
            }`}
            onClick={() => onVehicleSelect(vehicle)}
          >
            {/* Vehicle Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {vehicle.type === 'truck' ? (
                  <Truck className="w-5 h-5 text-blue-500" />
                ) : (
                  <Bus className="w-5 h-5 text-green-500" />
                )}
                <span className="text-foreground font-medium">{vehicle.id}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                {vehicle.status}
              </span>
            </div>

            {/* Route */}
            <div className="flex items-center space-x-1 mb-2">
              <MapPin className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground text-sm">{vehicle.route}</span>
            </div>

            {/* Speed and ETA */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{vehicle.speed} </span>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>ETA {vehicle.eta}</span>
              </div>
            </div>

            {/* Driver */}
            <div className="flex items-center space-x-1 mt-1">
              <User className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground text-xs">{vehicle.driver}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleList;
