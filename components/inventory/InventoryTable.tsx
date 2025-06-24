
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PARTS_DATA, LOCATIONS_DATA } from '@/types/inventory';

const InventoryTable = () => {
  const getStockStatus = (current: number, min: number, max: number) => {
    if (current <= min) return { status: 'Critical', color: 'bg-red-100 text-red-800' };
    if (current <= min * 1.5) return { status: 'Low', color: 'bg-yellow-100 text-yellow-800' };
    if (current >= max * 0.8) return { status: 'High', color: 'bg-blue-100 text-blue-800' };
    return { status: 'Normal', color: 'bg-green-100 text-green-800' };
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Parts Inventory</CardTitle>
          <div className="flex space-x-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {LOCATIONS_DATA.map(location => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Part Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Current Stock</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Min/Max</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Weekly Usage</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Unit Price</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {PARTS_DATA.map((part) => {
                const stockStatus = getStockStatus(part.currentStock, part.minThreshold, part.maxThreshold);
                const weeklyUsage = Math.round(part.currentStock * part.consumptionRatio);
                
                return (
                  <tr key={part.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{part.name}</div>
                      <div className="text-sm text-gray-500">{part.id}</div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{part.category}</td>
                    <td className="py-3 px-4">
                      <div className="text-lg font-semibold">{part.currentStock}</div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {part.minThreshold} / {part.maxThreshold}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={stockStatus.color}>
                        {stockStatus.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{weeklyUsage} units</td>
                    <td className="py-3 px-4 text-sm font-medium">₹{part.unitPrice}</td>
                    <td className="py-3 px-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryTable;
