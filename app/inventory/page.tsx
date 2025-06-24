
import React from 'react';
import InventoryTable from '@/components/inventory/InventoryTable';
import MetricsCard from '@/components/dashboard/MetricsCard';
import { Package, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';

const Inventory = () => {
  const userRole = 'oem_planner' as const;
  const userName = 'Arjun Mehta';

  return (
    <div className="flex h-screen bg-gray-100">

      <div className="flex-1 flex flex-col overflow-hidden">
            <div className="absolute h-10 top-0 left-0 right-0 z-20 bg-background/95 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between px-3 h-10">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <h1 className="text-sm font-bold text-foreground">Inventory Management</h1>
            </div>
          </div>
        </div>
      </div>
        
        <main className="flex-1 overflow-y-auto p-6 mt-5">
          {/* Summary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <MetricsCard
              title="Total Stock Value"
              value="₹12.4L"
              subtitle="Across all locations"
              icon={DollarSign}
              trend={{ value: 3.2, isPositive: true }}
            />
            <MetricsCard
              title="Critical Items"
              value="8"
              subtitle="Below minimum threshold"
              icon={AlertTriangle}
              trend={{ value: -25.0, isPositive: true }}
            />
            <MetricsCard
              title="Stock Turnover"
              value="4.2x"
              subtitle="Times per year"
              icon={TrendingUp}
              trend={{ value: 12.5, isPositive: true }}
            />
            <MetricsCard
              title="Total SKUs"
              value="247"
              subtitle="Active part numbers"
              icon={Package}
            />
          </div>

          {/* Inventory Table */}
          <InventoryTable />
        </main>
      </div>
    </div>
  );
};

export default Inventory;
