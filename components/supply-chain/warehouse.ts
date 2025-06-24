export interface Part {
  partId: number;
  partName: string;
  requiredCount: number;
  currentStock: number;
  status: 'Critical' | 'Normal';
}

export interface StorePart {
  partId: number;
  partName: string;
  status: 'Critical' | 'Normal';
  inventory: number;
  consumed: number;
  requiredCount: number;
}

export interface Store {
  storeName: string;
  storeId: string;
  location: string;
  manager: string;
  contact: string;
  totalPartsRequired: number;
  parts: StorePart[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface Warehouse {
  warehouseName: string;
  warehouseId: string;
  type:string;
  location: {
    city: string;
    state: string;
    country: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  contact: {
    phone: string;
    email: string;
  };
  warehouseManager: {
    name: string;
    id: string;
    contact: string;
  };
  operationalStatus: string;
  totalPartsRequired: number;
  partsRequirements: Part[];
  totalStores: number;
  stores: Store[];
}

export interface SupplyChainData {
  oem: string;
  warehouses: Warehouse[];
}