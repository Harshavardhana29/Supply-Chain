
import { Warehouse } from './warehouse';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Package } from 'lucide-react';
import { FaWarehouse } from "react-icons/fa";


interface WarehouseMarkerProps {
  warehouse: Warehouse;
  onClick: () => void;
  isSelected: boolean;
  showInventoryStatus: boolean;
}

const WarehouseMarker = ({
  warehouse,
  onClick,
  isSelected,
  showInventoryStatus
}: WarehouseMarkerProps) => {
  const criticalPartsCount = warehouse.partsRequirements.filter(part => part.status === 'Critical').length;
  const hasCriticalParts = criticalPartsCount > 0;

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
            {hasCriticalParts && (
              <div className="absolute  top-1/6  w-5 h-5 bg-red-500/40 rounded-full animate-ping -z-10 -translate-x-1/2 -translate-y-1/2" />
            )}

            <div className="relative z-10 -translate-x-1/2 -translate-y-1/2">
              <FaWarehouse className={`w-3 h-3 ${hasCriticalParts ? 'text-red-500' : 'text-blue-500'}`} />
            </div>

            {showInventoryStatus && (
              <div className="absolute bottom-full left-1/2 mb-1 transform -translate-x-1/2 bg-white text-gray-800 text-xs font-semibold px-2 py-0.5 rounded shadow">
                {criticalPartsCount} Critical
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-popover text-popover-foreground border">
          <div className="p-2">
            <div className="font-semibold text-sm mb-1">{warehouse.warehouseName}</div>
            <div className="text-xs space-y-1">
              <div>
                <span className="font-medium">ID:</span> {warehouse.warehouseId}
              </div>
              <div>
                <span className="font-medium">Location:</span> {warehouse.location.city}, {warehouse.location.state}
              </div>
              <div>
                <span className="font-medium">Manager:</span> {warehouse.warehouseManager.name}
              </div>

              <div>
                <span className="font-medium">Critical Parts:</span> {criticalPartsCount}
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WarehouseMarker;
