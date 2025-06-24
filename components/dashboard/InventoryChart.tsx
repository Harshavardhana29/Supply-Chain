import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PARTS_DATA } from '@/types/inventory';

const InventoryChart = () => {
  // Generate chart data from the parts data
  const chartData = PARTS_DATA.slice(0, 6).map(part => ({
    name: part.name,
    current: part.currentStock,
    minimum: part.minThreshold,
    forecast: Math.round(part.consumptionRatio * 1000) // Weekly forecast based on consumption ratio
  }));

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle>Inventory Levels vs Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={80}
              fontSize={12}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="current" fill="#3b82f6" name="Current Stock" />
            <Bar dataKey="minimum" fill="#ef4444" name="Min Threshold" />
            <Bar dataKey="forecast" fill="#10b981" name="Weekly Forecast" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default InventoryChart;