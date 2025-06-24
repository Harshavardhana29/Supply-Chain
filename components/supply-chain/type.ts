export interface Location {
  id: string;
  name: string;
  type: 'warehouse' | 'service_center' | 'store';
  parentWarehouse?: string;
  address: string;
  manager: string;
  phone: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  partsRequirements?: Part[];
  operationalStatus?: string;
}

export interface Part {
  partId: number;
  partName: string;
  requiredCount: number;
  currentStock: number;
  status: 'Critical' | 'Normal';
}

export interface SupplyChainFlatData {
  oem: string;
  locations: Location[];
}