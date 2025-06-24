'use client';

import { useState, useRef, useEffect } from 'react';
import { Warehouse, Store } from './warehouse';

import { LuStore } from "react-icons/lu";
import { BiSolidCarMechanic } from "react-icons/bi";
import { MdOutlineGarage } from "react-icons/md";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Filter, ChevronDown, Package, MapPin, AlertTriangle, ChevronRight } from 'lucide-react';
import { FaWarehouse } from 'react-icons/fa';

interface FloatingSupplyChainAccordionProps {
  warehouses: Warehouse[];
  onWarehouseSelect: (warehouse: Warehouse) => void;
  onStoreSelect: (store: Store, warehouse: Warehouse) => void;
  selectedWarehouse: Warehouse | null;
  selectedStore: Store | null;
  onFilterChange: (filter: string) => void;
}

const FloatingSupplyChainAccordion = ({
  warehouses,
  onWarehouseSelect,
  onStoreSelect,
  selectedWarehouse,
  selectedStore,
  onFilterChange,
}: FloatingSupplyChainAccordionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [expandedWarehouse, setExpandedWarehouse] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const filteredWarehouses = warehouses.filter((w) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'critical') return w.partsRequirements.some(p => p.status === 'Critical');
    if (selectedFilter === 'active') return w.operationalStatus === 'Active';
    return true;
  });

  const handleWarehouseClick = (warehouse: Warehouse) => {
    if (expandedWarehouse === warehouse.warehouseId) {
      setExpandedWarehouse(null);
    } else {
      setExpandedWarehouse(warehouse.warehouseId);
    }
    onWarehouseSelect(warehouse);
  };

  return (
    <div className="absolute top-10 left-5 z-50 w-65 h-120 bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        {/* Header */}
        <div className="p-3 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Supply Chain</h2>
            <div className="flex items-center gap-2 relative" ref={filterRef}>
              <div className="relative z-50">
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="z-50"
                >
                  <Filter className="w-4 h-4 text-green-500" />
                </button>

                {showFilterDropdown && (
                  <div className="absolute right-0 top-8 z-[100] bg-white dark:bg-background border rounded shadow-md p-1 w-64  text-sm">
                    {[
                      { value: 'all', label: 'All Locations' },
                      { value: 'critical', label: 'Critical Inventory' },
                      { value: 'active', label: 'Active Warehouses' },
                    ].map((option) => (
                      <div
                        key={option.value}
                        onClick={() => {
                          setSelectedFilter(option.value);
                          onFilterChange(option.value);
                          setShowFilterDropdown(false);
                        }}
                        className={`px-3 py-2 hover:bg-accent cursor-pointer rounded ${selectedFilter === option.value ? 'bg-accent font-medium' : ''
                          }`}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <CollapsibleTrigger asChild>
                <button>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </CollapsibleTrigger>
            </div>
          </div>
        </div>

        {/* Body */}
        <CollapsibleContent>
          <div className="space-y-0">
            <div className="max-h-100 overflow-y-auto">
              {filteredWarehouses.map((warehouse) => (
                <div key={warehouse.warehouseId}>
                  {/* Warehouse */}
                  <div
                    className={`p-3 cursor-pointer transition-all duration-200 border-b hover:bg-accent/50 ${selectedWarehouse?.warehouseId === warehouse.warehouseId
                      ? 'bg-accent border-l-4 border-l-primary'
                      : ''
                      }`}
                    onClick={() => handleWarehouseClick(warehouse)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {warehouse.type === "warehouse" ? (
                          <FaWarehouse className="w-4 h-4 text-blue-600" />
                        ) : warehouse.type === "service" ? (
                          <img
                            src="./mover-truck.png"
                            alt="Garage"
                            className="w-4 h-4"
                          />) : warehouse.type === "store" ? (
                            <LuStore className="w-4 h-4 text-green-600" />
                          ) : null}


                        <div>
                          <span className="text-foreground font-medium text-sm">{warehouse.warehouseName.length > 20 ? `${warehouse.warehouseName.slice(0, 17)}...` : warehouse.warehouseName}</span>
                          <div className="text-xs text-muted-foreground">{warehouse.warehouseId}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stores - only show when expanded */}
                  {/* {expandedWarehouse === warehouse.warehouseId && warehouse.stores.map((store) => ( 
                    <div
                      key={store.storeId}
                      className={`pl-8 pr-3 py-2 cursor-pointer transition-all duration-200 border-b border-border/50 ${
                        selectedStore?.storeId === store.storeId
                          ? 'bg-accent/70'
                          : 'hover:bg-accent/30'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onStoreSelect(store, warehouse);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3 h-3 text-green-500" />
                          <div>
                            <span className="text-foreground text-xs">{store.storeName}</span>
                            <div className="text-xs text-muted-foreground">{store.storeId}</div>
                          </div>
                        </div>
                        {store.parts.filter(p => p.status === 'Critical').length > 0 && (
                          <AlertTriangle className="w-3 h-3 text-red-500" />
                        )}
                      </div>
                    </div>
                  ))} */}
                </div>
              ))}
              {filteredWarehouses.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No locations found
                </p>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default FloatingSupplyChainAccordion;