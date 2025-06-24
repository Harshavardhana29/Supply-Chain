import { Vehicle } from './vehicle';
import { Truck, Bus } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface VehicleMarkerProps {
  vehicle: Vehicle;
  onClick: () => void;
  isSelected: boolean;
  showSpeed: boolean;
}

const VehicleMarker = ({
  vehicle,
  onClick,
  isSelected,
  showSpeed
}: VehicleMarkerProps) => {
  const isMoving = vehicle.status === 'en-route';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={onClick}
            className={`relative cursor-pointer transition-transform ${
              isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-20'
            }`}
          >
            {/* Pulse background for moving vehicles */}
            {isMoving && (
              <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-gray-400/40 rounded-full animate-ping -z-10 -translate-x-1/2 -translate-y-1/2" />
            )}

            {/* Icon */}
            <div className="relative z-10 -translate-x-1/2 -translate-y-1/2">
              {vehicle.type === 'truck' ? (
                <Truck className="w-6 h-6 text-blue-500" />
              ) : (
                <Bus className="w-6 h-6 text-green-500" />
              )}
            </div>

            {/* Speed label */}
            {showSpeed && isMoving && (
              <div className="absolute bottom-full left-1/2 mb-1 transform -translate-x-1/2 bg-white text-orange-500 text-xs font-semibold px-2 py-0.5 rounded shadow">
                {vehicle.speed} 
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-popover text-popover-foreground border">
          <div className="p-2">
            <div className="font-semibold text-sm mb-1">{vehicle.id}</div>
            <div className="text-xs space-y-1">
              <div>
                <span className="font-medium">Route:</span> {vehicle.route}
              </div>
              <div>
                <span className="font-medium">Driver:</span> {vehicle.driver}
              </div>
              <div>
                <span className="font-medium">Status:</span> {vehicle.status}
              </div>
              {vehicle.speed > 0 && (
                <div>
                  <span className="font-medium">Speed:</span> {vehicle.speed} km/h
                </div>
              )}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VehicleMarker;
