
export interface Part {
  id: string;
  name: string;
  consumptionRatio: number;
  currentStock: number;
  minThreshold: number;
  maxThreshold: number;
  unitPrice: number;
  category: string;
}

export interface Location {
  id: string;
  name: string;
  type: 'warehouse' | 'service_center' | 'store';
  parentWarehouse?: string;
  address: string;
  manager: string;
  phone: string;
}

export interface InventoryItem {
  locationId: string;
  partId: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  lastUpdated: string;
  weeklyConsumption: number[];
  forecastedDemand: number;
}

export interface WeeklyPlan {
  id: string;
  weekStarting: string;
  locationId: string;
  partId: string;
  plannedQuantity: number;
  actualShipped?: number;
  status: 'planned' | 'shipped' | 'delivered';
}

export interface UserRole {
  id: string;
  name: string;
  role: 'oem_planner' | 'warehouse_manager' | 'store_keeper';
  locationAccess: string[];
}

export const PARTS_DATA: Part[] = [
  { id: 'P001', name: 'Engine oil filter', consumptionRatio: 0.12, currentStock: 1500, minThreshold: 200, maxThreshold: 2000, unitPrice: 25.50, category: 'Engine' },
  { id: 'P002', name: 'Air filter', consumptionRatio: 0.1, currentStock: 1200, minThreshold: 150, maxThreshold: 1800, unitPrice: 18.75, category: 'Engine' },
  { id: 'P003', name: 'Brake pads', consumptionRatio: 0.09, currentStock: 800, minThreshold: 100, maxThreshold: 1200, unitPrice: 45.00, category: 'Brakes' },
  { id: 'P004', name: 'Fuel filter', consumptionRatio: 0.08, currentStock: 950, minThreshold: 120, maxThreshold: 1400, unitPrice: 22.30, category: 'Fuel System' },
  { id: 'P005', name: 'Clutch kit & plate', consumptionRatio: 0.08, currentStock: 300, minThreshold: 50, maxThreshold: 500, unitPrice: 185.00, category: 'Transmission' },
  { id: 'P006', name: 'Battery', consumptionRatio: 0.07, currentStock: 250, minThreshold: 30, maxThreshold: 400, unitPrice: 125.00, category: 'Electrical' },
  { id: 'P007', name: 'Shock absorbers', consumptionRatio: 0.06, currentStock: 180, minThreshold: 25, maxThreshold: 300, unitPrice: 95.50, category: 'Suspension' },
  { id: 'P008', name: 'Radiator', consumptionRatio: 0.05, currentStock: 120, minThreshold: 15, maxThreshold: 200, unitPrice: 275.00, category: 'Cooling' },
  { id: 'P009', name: 'Alternator & starter motor', consumptionRatio: 0.05, currentStock: 85, minThreshold: 10, maxThreshold: 150, unitPrice: 320.00, category: 'Electrical' },
  { id: 'P010', name: 'Suspension joints/brackets', consumptionRatio: 0.04, currentStock: 200, minThreshold: 25, maxThreshold: 350, unitPrice: 65.00, category: 'Suspension' },
  { id: 'P011', name: 'Wheel bearings', consumptionRatio: 0.04, currentStock: 150, minThreshold: 20, maxThreshold: 250, unitPrice: 75.00, category: 'Suspension' },
  { id: 'P012', name: 'Timing belt (kit)', consumptionRatio: 0.04, currentStock: 100, minThreshold: 15, maxThreshold: 180, unitPrice: 125.00, category: 'Engine' },
  { id: 'P013', name: 'Water pump', consumptionRatio: 0.04, currentStock: 80, minThreshold: 10, maxThreshold: 150, unitPrice: 95.00, category: 'Cooling' },
  { id: 'P014', name: 'Hoses & pipes', consumptionRatio: 0.03, currentStock: 300, minThreshold: 40, maxThreshold: 500, unitPrice: 35.00, category: 'Cooling' },
  { id: 'P015', name: 'Steering components', consumptionRatio: 0.03, currentStock: 120, minThreshold: 15, maxThreshold: 200, unitPrice: 155.00, category: 'Steering' },
  { id: 'P016', name: 'Rubber bumpers/bushes/mounts', consumptionRatio: 0.025, currentStock: 250, minThreshold: 30, maxThreshold: 400, unitPrice: 28.00, category: 'Body' },
  { id: 'P017', name: 'Exhaust parts (gaskets, bellows)', consumptionRatio: 0.025, currentStock: 180, minThreshold: 25, maxThreshold: 300, unitPrice: 42.00, category: 'Exhaust' },
  { id: 'P018', name: 'Brake disc/caliper/master cyl', consumptionRatio: 0.02, currentStock: 60, minThreshold: 8, maxThreshold: 100, unitPrice: 225.00, category: 'Brakes' },
  { id: 'P019', name: 'Light bulbs & fuses', consumptionRatio: 0.015, currentStock: 500, minThreshold: 60, maxThreshold: 800, unitPrice: 8.50, category: 'Electrical' },
  { id: 'P020', name: 'Wiper blades & washers', consumptionRatio: 0.015, currentStock: 200, minThreshold: 25, maxThreshold: 350, unitPrice: 15.00, category: 'Body' }
];

export const LOCATIONS_DATA: Location[] = [
  { id: 'W001', name: 'North Regional Warehouse', type: 'warehouse', address: 'Industrial Area, Sector 25, Gurgaon', manager: 'Rajesh Kumar', phone: '+91-98765-43210' },
  { id: 'W002', name: 'South Regional Warehouse', type: 'warehouse', address: 'Export Zone, Whitefield, Bangalore', manager: 'Priya Sharma', phone: '+91-98765-43211' },
  { id: 'SC001', name: 'Delhi Service Center', type: 'service_center', parentWarehouse: 'W001', address: 'Lajpat Nagar, New Delhi', manager: 'Amit Singh', phone: '+91-98765-43212' },
  { id: 'SC002', name: 'Mumbai Service Center', type: 'service_center', parentWarehouse: 'W002', address: 'Andheri East, Mumbai', manager: 'Neha Patel', phone: '+91-98765-43213' },
  { id: 'ST001', name: 'Connaught Place Store', type: 'store', parentWarehouse: 'W001', address: 'Connaught Place, New Delhi', manager: 'Vikram Gupta', phone: '+91-98765-43214' },
  { id: 'ST002', name: 'Bandra Store', type: 'store', parentWarehouse: 'W002', address: 'Bandra West, Mumbai', manager: 'Kavita Iyer', phone: '+91-98765-43215' }
];
