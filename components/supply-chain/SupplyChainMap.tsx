'use client';

import { useEffect, useRef } from 'react';
import { Map, Marker } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import { Warehouse, Store } from './warehouse';
import 'maplibre-gl/dist/maplibre-gl.css';

import { FaWarehouse } from 'react-icons/fa';
import { LuStore } from 'react-icons/lu';
import { BiSolidCarMechanic } from 'react-icons/bi';

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

  useEffect(() => {
    if (!mapRef.current || warehouses.length === 0) return;

    const bounds = new maplibregl.LngLatBounds();

    warehouses.forEach((warehouse) => {
      bounds.extend([
        warehouse.location.coordinates.longitude,
        warehouse.location.coordinates.latitude,
      ]);

      warehouse.stores.forEach((store) => {
        if (store.coordinates) {
          bounds.extend([store.coordinates.longitude, store.coordinates.latitude]);
        }
      });
    });

    mapRef.current.fitBounds(bounds, {
      padding: 100,
      maxZoom: 8,
      duration: 1000,
    });
  }, [warehouses]);

  const renderIcon = (type: string, isSelected: boolean) => {
    const base = `w-5 h-5 drop-shadow-md`;
    const iconColor = isSelected ? 'text-white' : type === 'warehouse'
      ? 'text-blue-600'
      : type === 'service'
      ? 'text-orange-500'
      : 'text-green-600';

    switch (type) {
      case 'warehouse':
        return <FaWarehouse className={`${base} ${iconColor}`} />;
      case 'service':
        return <BiSolidCarMechanic className={`${base} ${iconColor}`} />;
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
        return 'bg-orange-500';
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
          longitude: 72.8777,
          latitude: 19.076,
          zoom: 6,
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
                className={`p-1 rounded-full cursor-pointer shadow-md ${bgColor} ${
                  isSelected ? 'z-50' : 'z-10'
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
                  className={`p-1 rounded-full cursor-pointer shadow-md ${bgColor} ${
                    isSelected ? 'z-50' : 'z-10'
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
