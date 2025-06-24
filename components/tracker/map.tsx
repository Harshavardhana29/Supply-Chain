import { Map, Marker } from 'react-map-gl/maplibre';
import VehicleMarker from './vehicle-marker';
import { Vehicle } from './vehicle';
import { Truck, Bus } from 'lucide-react';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MapProps {
  vehicles: Vehicle[];
  onVehicleSelect: (vehicle: Vehicle) => void;
  selectedVehicle: Vehicle | null;
  showSpeed: boolean;
}

const VehicleMap = ({ vehicles, onVehicleSelect, selectedVehicle, showSpeed }: MapProps) => {
  return (
    <div className="relative w-full h-full bg-background">
      <Map
        initialViewState={{
          longitude: 82.8,
          latitude: 22.6,
          zoom: 1
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        maxZoom={18}
        minZoom={2}
        maxBounds={[
          [68.0, 6.0],
          [97.5, 37.0]
        ]}
        dragRotate={false}
        pitchWithRotate={false}
        touchZoomRotate={false}
      >
        {vehicles.map((vehicle) => (
          <Marker
            key={vehicle.id}
            longitude={vehicle.longitude}
            latitude={vehicle.latitude}
            anchor="center"
          >
            <VehicleMarker
              vehicle={vehicle}
              onClick={() => onVehicleSelect(vehicle)}
              isSelected={selectedVehicle?.id === vehicle.id}
              showSpeed={showSpeed} 
            />
          </Marker>
        ))}
      </Map>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg p-4 border z-10 shadow-sm">
        <h3 className="font-medium mb-2 text-foreground">Legend</h3>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Truck className="w-4 h-4 text-blue-500" />
            <span className="text-muted-foreground text-sm">Trucks</span>
          </div>
          <div className="flex items-center space-x-2">
            <Bus className="w-4 h-4 text-green-500" />
            <span className="text-muted-foreground text-sm">Buses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleMap;
