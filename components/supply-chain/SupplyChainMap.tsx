'use client';

import { useRef } from 'react';
import { Map, Marker } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import { Warehouse, Store } from './warehouse';
import 'maplibre-gl/dist/maplibre-gl.css';

import { FaWarehouse } from 'react-icons/fa';
import { LuStore } from 'react-icons/lu';

interface MapProps {
  warehouses: Warehouse[];
  onWarehouseSelect: (warehouse: Warehouse) => void;
  onStoreSelect: (store: Store, warehouse: Warehouse) => void;
  selectedWarehouse: Warehouse | null;
  selectedStore: Store | null;
  showInventoryStatus: boolean;
}

const SupplyChainMap = ({
  warehouses,
  onWarehouseSelect,
  onStoreSelect,
  selectedWarehouse,
  selectedStore,
  showInventoryStatus,
}: MapProps) => {
  const mapRef = useRef<maplibregl.Map | null>(null);

  const renderIcon = (type: string, isSelected: boolean) => {
    const base = `w-5 h-5 drop-shadow-md`;
    const iconColor = isSelected
      ? 'text-white'
      : type === 'warehouse'
        ? 'text-blue-600'
        : type === 'service'
          ? 'text-orange-400'
          : 'text-green-600';

    switch (type) {
      case 'warehouse':
        return <FaWarehouse className={`${base} ${iconColor}`} />;
      case 'service':
        return (
          <img
            src="./mover-truck.png"
            alt="Service"
            className={`${base} ${iconColor}`}
          />
        );
      case 'store':
        return <LuStore className={`${base} ${iconColor}`} />;
      default:
        return <FaWarehouse className={`${base} ${iconColor}`} />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'warehouse':
        return 'bg-blue-600';
      case 'service':
        return 'bg-orange-400';
      case 'store':
        return 'bg-green-600';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="relative w-full h-full bg-background">
      <Map
        ref={(ref) => {
          if (ref) mapRef.current = ref.getMap();
        }}
        initialViewState={{
          longitude: 82.8, // Center of India
          latitude: 22.5,
          zoom: 4.2,       // Zoomed out to show full India
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        style={{ width: '100%', height: '100%' }}
        mapLib={maplibregl}
        dragRotate={false}
        pitchWithRotate={false}
        touchZoomRotate={false}
      >
        {/* Warehouse Markers */}
        {warehouses.map((warehouse) => {
          const isSelected = selectedWarehouse?.warehouseId === warehouse.warehouseId;
          const bgColor = isSelected ? getBgColor(warehouse.type || 'warehouse') : 'bg-transparent';

          return (
            <Marker
              key={warehouse.warehouseId}
              longitude={warehouse.location.coordinates.longitude}
              latitude={warehouse.location.coordinates.latitude}
              anchor="center"
            >
              <div
                onClick={() => onWarehouseSelect(warehouse)}
                className={`p-1 rounded-full cursor-pointer shadow-md ${bgColor} ${isSelected ? 'z-50' : 'z-10'
                  }`}
              >
                {renderIcon(warehouse.type || 'warehouse', isSelected)}
              </div>
            </Marker>
          );
        })}

        {/* Store / Service Center Markers */}
        {warehouses.map((warehouse) =>
          warehouse.stores.map((store) => {
            const isSelected = selectedStore?.storeId === store.storeId;
            const bgColor = isSelected ? getBgColor(store.type || 'store') : 'bg-transparent';

            return (
              <Marker
                key={store.storeId}
                longitude={store.coordinates?.longitude || 0}
                latitude={store.coordinates?.latitude || 0}
                anchor="center"
              >
                <div
                  onClick={() => onStoreSelect(store, warehouse)}
                  className={`p-1 rounded-full cursor-pointer shadow-md ${bgColor} ${isSelected ? 'z-50' : 'z-10'
                    }`}
                >
                  {renderIcon(store.type || 'store', isSelected)}
                </div>
              </Marker>
            );
          })
        )}
      </Map>
    </div>
  );
};

export default SupplyChainMap;
