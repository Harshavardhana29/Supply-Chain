"use client";

import { Vehicle } from "./vehicle";
import {
  X,
  Truck,
  Bus,
  User,
  MapPin,
  Clock,
  Package,
  Users,
  Route,
  History,
  Wrench,
  FileText,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface VehicleInfoPanelProps {
  vehicle: Vehicle;
  onClose: () => void;
}

const VehicleInfoPanel = ({ vehicle, onClose }: VehicleInfoPanelProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "en-route":
        return "text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800";
      case "stopped":
        return "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-800";
      case "loading":
        return "text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-950 dark:border-yellow-800";
      case "maintenance":
        return "text-orange-600 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-950 dark:border-orange-800";
      default:
        return "text-muted-foreground bg-muted border-border";
    }
  };

  const getVehicleImage = (vehicle: Vehicle) => {
    const imageNumber = parseInt(vehicle.id.replace(/[^0-9]/g, "")) % 5 + 1;
    return `/vehicles/${vehicle.type}${imageNumber}.jpg`;
  };

  const handleActionClick = (action: string) => {
    console.log(`${action} clicked for vehicle ${vehicle.id}`);
  };

  return (
    <div className="absolute top-12 right-6 w-80 bg-background/95 backdrop-blur-sm rounded-lg border shadow-lg z-40 animate-fade-in overflow-y-auto h-[84vh]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          {vehicle.type === "truck" ? (
            <div className="w-10 h-10 bg-blue-50 dark:bg-gray-800 rounded-lg flex items-center justify-center border border-blue-200 dark:border-gray-600">
              <Truck className="w-5 h-5 text-blue-500 dark:text-blue-400" />
            </div>
          ) : (
            <div className="w-10 h-10 bg-green-50 dark:bg-gray-800 rounded-lg flex items-center justify-center border border-green-200 dark:border-gray-600">
              <Bus className="w-5 h-5 text-green-500 dark:text-green-400" />
            </div>
          )}
          <div>
            <h3 className="text-foreground font-semibold">{vehicle.id}</h3>
            <p className="text-muted-foreground text-sm">{vehicle.operator}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Vehicle Image */}
      <div className="p-4 border-b">
        <img
          src={getVehicleImage(vehicle)}
          alt={`${vehicle.type} ${vehicle.id}`}
          className="w-full h-32 object-cover rounded-lg"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop&crop=center";
          }}
        />
      </div>

      {/* Status and Actions */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-start gap-2">
          {/* Status badge */}
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(vehicle.status)}`}
          >
            {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleActionClick("trip-info")}
              className="flex items-center space-x-1"
            >
              <Route className="w-4 h-4" />
              <span className="text-xs">Trip Info</span>
            </Button>
            {/* <Button
              variant="outline"
              size="sm"
              onClick={() => handleActionClick("part-history")}
              className="flex items-center "
            >
              <History className="w-4 h-4" />
              <span className="text-xs">Part History</span>
            </Button> */}
             <Button
          variant="outline"
          size="sm"
          onClick={() => handleActionClick("reports")}
          className="flex items-center "
        >
          <FileText className="w-4 h-4" />
          <span className="text-xs">Reports</span>
        </Button>
 
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleActionClick("component-health")}
              className="flex items-center space-x-2"
            >
              <Activity className="w-4 h-4" />
              <span className="text-xs">Health</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleActionClick("service-history")}
              className="flex items-center space-x-2"
            >
              <Wrench className="w-4 h-4" />
              <span className="text-xs">Service</span>
            </Button>
          </div>
        </div>
             </div>

        {/* Reports Button */}
       

      {/* Details */}
      <div className="p-4 space-y-4 border-b">
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-muted-foreground text-sm font-medium">Route</p>
            <p className="text-foreground">{vehicle.route}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <User className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-muted-foreground text-sm font-medium">Driver</p>
            <p className="text-foreground">{vehicle.driver}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground text-sm font-medium">Speed</p>
            <p className="text-foreground text-lg font-semibold">{vehicle.speed} km/h</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm font-medium">ETA</p>
            <p className="text-foreground text-lg font-semibold">{vehicle.eta}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-muted-foreground text-sm font-medium">Next Stop</p>
            <p className="text-foreground">{vehicle.nextStop}</p>
          </div>
        </div>

        {vehicle.type === "truck" ? (
          <div className="flex items-start space-x-3">
            <Package className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-muted-foreground text-sm font-medium">Cargo</p>
              <p className="text-foreground">{vehicle.cargo}</p>
              <p className="text-muted-foreground text-sm">Capacity: {vehicle.capacity}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-start space-x-3">
            <Users className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-muted-foreground text-sm font-medium">Passengers</p>
              <p className="text-foreground">{vehicle.passengers}</p>
              <p className="text-muted-foreground text-sm">Capacity: {vehicle.capacity}</p>
            </div>
          </div>
        )}
      </div>

      {/* Coordinates */}
      <div className="p-4 bg-muted/50 dark:bg-gray-800/50">
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-muted-foreground">Latitude</p>
            <p className="text-foreground font-mono">{vehicle.latitude.toFixed(4)}°</p>
          </div>
          <div>
            <p className="text-muted-foreground">Longitude</p>
            <p className="text-foreground font-mono">{vehicle.longitude.toFixed(4)}°</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleInfoPanel;
