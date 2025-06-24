import { Store, Warehouse } from './warehouse';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { MapPin } from 'lucide-react';

interface StoreMarkerProps {
  store: Store;
  warehouse: Warehouse;
  onClick: () => void;
  isSelected: boolean;
  showInventoryStatus: boolean;
}

const StoreMarker = ({
  store,
  warehouse,
  onClick,
  isSelected,
  showInventoryStatus
}: StoreMarkerProps) => {
  const criticalPartsCount = store.parts.filter(part => part.status === 'Critical').length;
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
              <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-500/40 rounded-full animate-ping -z-10 -translate-x-1/2 -translate-y-1/2" />
            )}

            <div className="relative z-10 -translate-x-1/2 -translate-y-1/2">
              <MapPin className={`w-4 h-4 ${hasCriticalParts ? 'text-red-500' : 'text-green-500'}`} />
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
            <div className="font-semibold text-sm mb-1">{store.storeName}</div>
            <div className="text-xs space-y-1">
              <div>
                <span className="font-medium">ID:</span> {store.storeId}
              </div>
              <div>
                <span className="font-medium">Location:</span> {store.location}
              </div>
              <div>
                <span className="font-medium">Manager:</span> {store.manager}
              </div>
              <div>
                <span className="font-medium">Critical Parts:</span> {criticalPartsCount}
              </div>
              <div>
                <span className="font-medium">Total Required:</span> {store.totalPartsRequired}
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default StoreMarker;