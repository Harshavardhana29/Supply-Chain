'use client'
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PARTS_DATA, LOCATIONS_DATA } from '@/types/inventory';

const generateTimeSeriesData = (partName: string, locationId: string, timeHorizon: string) => {
  const weeks = [];
  const baseDate = new Date();
  
  // Find the part and its consumption ratio
  const part = PARTS_DATA.find(p => p.name === partName);
  const consumptionRatio = part?.consumptionRatio || 0.05;
  
  // Base weekly vehicle servicing volume per location
  const baseVehicleVolumePerLocation = 200;
  
  // Calculate demand based on location selection
  let totalLocations;
  if (locationId === 'all') {
    // Aggregate across all locations
    totalLocations = LOCATIONS_DATA.length;
  } else {
    // Single location
    totalLocations = 1;
  }
  
  // Calculate base weekly demand
  const baseWeeklyDemand = Math.round(baseVehicleVolumePerLocation * totalLocations * consumptionRatio);
  
  // Determine weeks based on time horizon
  const horizonWeeks = parseInt(timeHorizon.replace('weeks', ''));
  const historicalWeeks = Math.min(8, horizonWeeks); // Show up to 8 weeks of historical data
  
  for (let i = -historicalWeeks; i <= horizonWeeks; i++) {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + (i * 7));
    
    const week = date.toISOString().split('T')[0];
    const isHistorical = i <= 0;
    
    if (isHistorical) {
      // Historical data with more realistic patterns
      const trendFactor = 1 + (i * 0.02); // Slight upward trend over time
      const seasonalFactor = 1 + 0.15 * Math.sin((i + historicalWeeks) * 0.3); // Seasonal variation
      const randomFactor = 0.85 + Math.random() * 0.3; // Random variation ±15%
      
      const actualDemand = Math.round(baseWeeklyDemand * trendFactor * seasonalFactor * randomFactor);
      weeks.push({
        week,
        actual: actualDemand,
        forecast: null,
        upperBound: null,
        lowerBound: null,
        type: 'historical'
      });
    } else {
      // Forecast data with trend continuation and uncertainty increase
      const trendFactor = 1 + (i * 0.02); // Continue the trend
      const seasonalFactor = 1 + 0.15 * Math.sin((i + historicalWeeks) * 0.3); // Seasonal pattern
      const uncertaintyFactor = 1 + (i * 0.02); // Uncertainty increases with time
      
      const forecasted = Math.round(baseWeeklyDemand * trendFactor * seasonalFactor);
      const variance = Math.round(forecasted * 0.12 * uncertaintyFactor); // Increasing confidence interval
      
      weeks.push({
        week,
        actual: null,
        forecast: forecasted,
        upperBound: forecasted + variance,
        lowerBound: Math.max(0, forecasted - variance),
        type: 'forecast'
      });
    }
  }
  
  return weeks;
};

const ForecastChart = ({ 
  partName = "Engine oil filter", 
  locationId = "all", 
  timeHorizon = "4weeks" 
}: { 
  partName?: string; 
  locationId?: string; 
  timeHorizon?: string; 
}) => {
  const data = generateTimeSeriesData(partName, locationId, timeHorizon);
  
  const getLocationTitle = () => {
    if (locationId === 'all') {
      return 'All Locations';
    }
    const location = LOCATIONS_DATA.find(l => l.id === locationId);
    return location?.name || 'Unknown Location';
  };

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle>Demand Forecast - {partName} ({getLocationTitle()})</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="week" 
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="Actual Consumption"
              connectNulls={false}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="forecast" 
              stroke="#10b981" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Forecasted Demand"
              connectNulls={false}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="upperBound" 
              stroke="#6b7280" 
              strokeWidth={1}
              strokeDasharray="2 2"
              name="Upper Bound"
              connectNulls={false}
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="lowerBound" 
              stroke="#6b7280" 
              strokeWidth={1}
              strokeDasharray="2 2"
              name="Lower Bound"
              connectNulls={false}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ForecastChart;
