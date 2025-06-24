import { Warehouse, Store } from './warehouse';
import { Package, MapPin, AlertTriangle, User } from 'lucide-react';

interface SupplyChainListProps {
  warehouses: Warehouse[];
  onWarehouseSelect: (warehouse: Warehouse) => void;
  onStoreSelect: (store: Store, warehouse: Warehouse) => void;
  selectedWarehouse: Warehouse | null;
  selectedStore: Store | null;
}

const SupplyChainList = ({ 
  warehouses, 
  onWarehouseSelect, 
  onStoreSelect, 
  selectedWarehouse,
  selectedStore 
}: SupplyChainListProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-green-600 bg-green-50 border border-green-200';
      case 'Critical':
        return 'text-red-600 bg-red-50 border border-red-200';
      default:
        return 'text-muted-foreground bg-muted border border-border';
    }
  };

  return (
    <div className="h-full bg-background/95 backdrop-blur-sm border-r overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-foreground mb-2">Supply Chain Network</h2>
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Package className="w-4 h-4 text-blue-500" />
            <span className="text-muted-foreground">{warehouses.length} Warehouses</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4 text-green-500" />
            <span className="text-muted-foreground">{warehouses.reduce((total, w) => total + w.totalStores, 0)} Stores</span>
          </div>
        </div>
      </div>

      {/* Warehouse and Store List */}
      <div className="flex-1 overflow-y-auto">
        {warehouses.map((warehouse) => (
          <div key={warehouse.warehouseId} className="border-b">
            {/* Warehouse Item */}
            <div
              className={`p-4 cursor-pointer transition-all duration-200 ${
                selectedWarehouse?.warehouseId === warehouse.warehouseId
                  ? 'bg-accent border-l-4 border-l-primary'
                  : 'hover:bg-accent/50'
              }`}
              onClick={() => onWarehouseSelect(warehouse)}
            >
              {/* Warehouse Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-blue-500" />
                  <span className="text-foreground font-medium">{warehouse.warehouseName}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(warehouse.operationalStatus)}`}>
                  {warehouse.operationalStatus}
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-1 mb-2">
                <MapPin className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">{warehouse.location.city}, {warehouse.location.state}</span>
              </div>

              {/* Critical Parts and Manager */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <AlertTriangle className="w-3 h-3 text-red-500" />
                  <span>{warehouse.partsRequirements.filter(p => p.status === 'Critical').length} Critical Parts</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span>{warehouse.warehouseManager.name}</span>
                </div>
              </div>
            </div>

            {/* Associated Stores */}
            {warehouse.stores.map((store) => (
              <div
                key={store.storeId}
                className={`pl-8 pr-4 py-3 cursor-pointer transition-all duration-200 border-l-2 border-gray-200 ${
                  selectedStore?.storeId === store.storeId
                    ? 'bg-accent/70 border-l-green-400'
                    : 'hover:bg-accent/30'
                }`}
                onClick={() => onStoreSelect(store, warehouse)}
              >
                {/* Store Header */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-green-500" />
                    <span className="text-foreground font-medium text-sm">{store.storeName}</span>
                  </div>
                  {store.parts.filter(p => p.status === 'Critical').length > 0 && (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  )}
                </div>

                {/* Store Details */}
                <div className="text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Manager: {store.manager}</span>
                    <span>Parts: {store.parts.length}</span>
                  </div>
                  <div className="mt-1">Location: {store.location}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplyChainList;