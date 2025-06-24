'use client';

import { useState } from 'react';
import { Warehouse, Store } from './warehouse';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  X, Package, MapPin, AlertTriangle, TrendingUp, TrendingDown,
  Phone, Mail, User, Building2, Activity, BarChart3
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface WarehouseDashboardProps {
  warehouse: Warehouse;
  onClose: () => void;
  onStoreSelect: (store: Store) => void;
}

const WarehouseDashboard = ({ warehouse, onClose, onStoreSelect }: WarehouseDashboardProps) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'stores' | 'inventory'>('overview');

  const criticalParts = warehouse.partsRequirements.filter(p => p.status === 'Critical');
  const normalParts = warehouse.partsRequirements.filter(p => p.status === 'Normal');
  
  const inventoryData = warehouse.partsRequirements.slice(0, 8).map(part => ({
    name: part.partName.substring(0, 15) + '...',
    required: part.requiredCount,
    current: part.currentStock,
    shortfall: part.requiredCount - part.currentStock
  }));

  const statusData = [
    { name: 'Critical', value: criticalParts.length, color: '#ef4444' },
    { name: 'Normal', value: normalParts.length, color: '#22c55e' }
  ];

  const chartConfig = {
    required: { label: 'Required', color: '#3b82f6' },
    current: { label: 'Current', color: '#22c55e' },
    shortfall: { label: 'Shortfall', color: '#ef4444' }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2">
      <div className="bg-background w-full max-w-7xl h-[95vh] rounded-lg border shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b bg-muted/30">
          <div className="flex items-center space-x-3">
            <Building2 className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-lg font-bold">{warehouse.warehouseName}</h1>
              <p className="text-xs text-muted-foreground">{warehouse.warehouseId}</p>
            </div>
            <Badge variant={warehouse.operationalStatus === 'Active' ? 'default' : 'destructive'}>
              {warehouse.operationalStatus}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b bg-muted/20">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'stores', label: 'Stores', icon: MapPin },
            { id: 'inventory', label: 'Inventory', icon: Package }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                selectedTab === tab.id
                  ? 'border-primary text-primary bg-background'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-3">
          {selectedTab === 'overview' && (
            <div className="grid grid-cols-12 gap-3 h-full">
              {/* Stats Cards */}
              <div className="col-span-12 grid grid-cols-4 gap-3">
                <Card className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Parts</p>
                      <p className="text-lg font-bold">{warehouse.totalPartsRequired.toLocaleString()}</p>
                    </div>
                    <Package className="w-5 h-5 text-blue-500" />
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Critical Items</p>
                      <p className="text-lg font-bold text-red-600">{criticalParts.length}</p>
                    </div>
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Active Stores</p>
                      <p className="text-lg font-bold">{warehouse.totalStores}</p>
                    </div>
                    <MapPin className="w-5 h-5 text-green-500" />
                  </div>
                </Card>
                <Card className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm font-medium">{warehouse.location.city}</p>
                    </div>
                    <Building2 className="w-5 h-5 text-purple-500" />
                  </div>
                </Card>
              </div>

              {/* Charts */}
              <div className="col-span-8">
                <Card className="p-3 h-full">
                  <h3 className="text-sm font-semibold mb-3">Inventory Status</h3>
                  <ChartContainer config={chartConfig} className="h-64">
                    <BarChart data={inventoryData}>
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="required" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="current" fill="#22c55e" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </Card>
              </div>

              <div className="col-span-4">
                <Card className="p-3 h-full">
                  <h3 className="text-sm font-semibold mb-3">Parts Status</h3>
                  <ChartContainer config={{}} className="h-48">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ChartContainer>
                  <div className="flex justify-center space-x-4 mt-2">
                    {statusData.map((item) => (
                      <div key={item.name} className="flex items-center space-x-1">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-xs">{item.name}: {item.value}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Contact Info */}
              <div className="col-span-12">
                <Card className="p-3">
                  <h3 className="text-sm font-semibold mb-2">Contact Information</h3>
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div className="flex items-center space-x-2">
                      <User className="w-3 h-3 text-blue-500" />
                      <span>Manager: {warehouse.warehouseManager.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3 h-3 text-green-500" />
                      <span>{warehouse.contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3 h-3 text-red-500" />
                      <span>{warehouse.contact.email}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {selectedTab === 'stores' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {warehouse.stores.map((store) => (
                <Card key={store.storeId} className="p-3 cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => onStoreSelect(store)}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-sm">{store.storeName}</h4>
                      <p className="text-xs text-muted-foreground">{store.storeId}</p>
                    </div>
                    {store.parts.some(p => p.status === 'Critical') && (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{store.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{store.manager}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Package className="w-3 h-3" />
                      <span>{store.totalPartsRequired} parts required</span>
                    </div>
                  </div>
                  <div className="mt-2 flex space-x-1">
                    <Badge variant="secondary" className="text-xs">
                      {store.parts.filter(p => p.status === 'Critical').length} Critical
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {store.parts.filter(p => p.status === 'Normal').length} Normal
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {selectedTab === 'inventory' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {warehouse.partsRequirements.map((part) => (
                  <Card key={part.partId} className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{part.partName}</h4>
                        <p className="text-xs text-muted-foreground">Part ID: {part.partId}</p>
                      </div>
                      <Badge variant={part.status === 'Critical' ? 'destructive' : 'secondary'}>
                        {part.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-muted-foreground">Required</p>
                        <p className="font-medium">{part.requiredCount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Current Stock</p>
                        <p className="font-medium">{part.currentStock}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span>Stock Level</span>
                        <span>{Math.round((part.currentStock / part.requiredCount) * 100)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1">
                        <div
                          className={`h-1 rounded-full ${
                            part.status === 'Critical' ? 'bg-red-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min((part.currentStock / part.requiredCount) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WarehouseDashboard;