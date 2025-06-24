
export interface Vehicle {
  id: string;
  type: 'truck' | 'bus';
  operator: string;
  route: string;
  latitude: number;
  longitude: number;
  speed: number;
  status: 'en-route' | 'stopped' | 'loading' | 'maintenance';
  driver: string;
  cargo?: string;
  passengers?: string;
  capacity: string;
  nextStop: string;
  eta: string;
}
