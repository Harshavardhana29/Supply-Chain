'use client';

import { useState } from 'react';
import SupplyChainMap from '@/components/supply-chain/SupplyChainMap';
import WarehouseInfoPanel from '@/components/supply-chain/WarehouseInfoPanel';
import SupplyChainList from '@/components/supply-chain/SupplyChainList';
import FloatingSupplyChainAccordion from '@/components/supply-chain/FloatingSupplyChainAccordion';
import WarehouseDashboard from '@/components/supply-chain/WarehouseDashboard';
import { supplyChainData } from '@/components/supply-chain/supply-chain-data';
import { Warehouse, Store } from '@/components/supply-chain/warehouse';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, List, Map, Gauge, BarChart3 } from 'lucide-react';
import { FaExclamationTriangle } from "react-icons/fa";


const Index = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [showInventoryStatus, setShowInventoryStatus] = useState(true);
  const [showList, setShowList] = useState(false);
  const [filter, setFilter] = useState('all');
  const [showDashboard, setShowDashboard] = useState(false);

  const handleWarehouseSelect = (warehouse: Warehouse) => {
    setSelectedWarehouse(warehouse);
    setSelectedStore(null);
  };

  const handleStoreSelect = (store: Store, warehouse: Warehouse) => {
    setSelectedStore(store);
    setSelectedWarehouse(warehouse);
  };

  const handleClosePanel = () => {
    setSelectedWarehouse(null);
    setSelectedStore(null);
  };

  const handleSpeedToggle = (checked: boolean) => {
    setShowInventoryStatus(checked);
  };

  const handleChatToggle = () => {
    console.log('Chat toggle clicked');
  };

  const handleDashboardOpen = () => {
    if (selectedWarehouse) {
      setShowDashboard(true);
    }
  };

  // Mock BottomControlPanel component
  const BottomControlPanel = ({ onChatToggle }: { onChatToggle: () => void }) => (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowList(!showList)}
        className="bg-background/95 backdrop-blur-sm"
      >
        {showList ? <Map className="w-4 h-4 mr-1" /> : <List className="w-4 h-4 mr-1" />}
        {showList ? 'Hide List' : 'Show List'}
      </Button>
      {selectedWarehouse && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleDashboardOpen}
          className="bg-background/95 backdrop-blur-sm"
        >
          <BarChart3 className="w-4 h-4 mr-1" />
          Dashboard
        </Button>
      )}
    </div>
  );

  const totalWarehouses = supplyChainData.warehouses?.length;
  const totalStores = supplyChainData.warehouses?.reduce((acc, warehouse) => acc + warehouse.totalStores, 0);
  const totalActive = totalWarehouses + totalStores;

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden">
      {/* Header */}
      <div className="absolute h-10 top-0 left-0 right-0 z-20 bg-background/95 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between px-3 h-10">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-3">
              <h1 className="text-sm font-bold text-foreground">Warehouses</h1>
            </div>

            <div className="flex items-center space-x-2 border-l border-muted pl-4">
              <Checkbox
                id="show-speed"
                className='text-gray-700'
                checked={showInventoryStatus}
                onCheckedChange={handleSpeedToggle}
              />
              <FaExclamationTriangle className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - adjusted for header */}
      <div className="flex h-full pt-10">
        {/* Side List */}
        {showList && (
          <div className="w-80 h-full">
            <SupplyChainList
              warehouses={supplyChainData.warehouses}
              onWarehouseSelect={handleWarehouseSelect}
              onStoreSelect={handleStoreSelect}
              selectedWarehouse={selectedWarehouse}
              selectedStore={selectedStore}
            />
          </div>
        )}

        {/* Map Container */}
        <div className="flex-1 relative">
          <SupplyChainMap
            warehouses={supplyChainData.warehouses}
            onWarehouseSelect={handleWarehouseSelect}
            onStoreSelect={handleStoreSelect}
            selectedWarehouse={selectedWarehouse}
            selectedStore={selectedStore}
            showInventoryStatus={showInventoryStatus}
          />

          {/* Floating Accordion */}
          {!showList && (
            <FloatingSupplyChainAccordion
              warehouses={supplyChainData.warehouses}
              onWarehouseSelect={handleWarehouseSelect}
              onStoreSelect={handleStoreSelect}
              selectedWarehouse={selectedWarehouse}
              selectedStore={selectedStore}
              onFilterChange={setFilter}
            />
          )}

          {/* Info Panel */}
          {(selectedWarehouse || selectedStore) && !showDashboard && (
            <WarehouseInfoPanel
              warehouse={selectedStore ? selectedWarehouse : selectedWarehouse}
              store={selectedStore}
              onClose={handleClosePanel}
            />
          )}
        </div>
      </div>

      

      {/* Warehouse Dashboard */}
      {showDashboard && selectedWarehouse && (
        <WarehouseDashboard
          warehouse={selectedWarehouse}
          onClose={() => setShowDashboard(false)}
          onStoreSelect={(store) => {
            setSelectedStore(store);
            setShowDashboard(false);
          }}
        />
      )}
    </div>
  );
};

export default Index;