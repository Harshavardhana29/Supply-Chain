'use client'

import React, { useState } from 'react';
// import Header from '@/components/shared/Header';
// import Sidebar from '@/components/shared/Sidebar';
import ForecastChart from '@/components/forecast/ForecastChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { PARTS_DATA, LOCATIONS_DATA } from '@/types/inventory';
import { TrendingUp, BarChart3, Calendar } from 'lucide-react';

const Forecast = () => {
    const [selectedPart, setSelectedPart] = useState(PARTS_DATA[0].name);
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [timeHorizon, setTimeHorizon] = useState('4weeks');
    const userRole = 'oem_planner' as const;
    const userName = 'Arjun Mehta';

    const forecastAccuracy = 87.3;
    const avgError = 12.7;

    // Generate forecast summary based on selected part's consumption ratio, location, and time horizon
    const generateForecastSummary = () => {
        const part = PARTS_DATA.find(p => p.name === selectedPart);
        const consumptionRatio = part?.consumptionRatio || 0.05;
        const baseVehicleVolumePerLocation = 200;

        // Calculate total locations for demand calculation
        let totalLocations;
        if (selectedLocation === 'all') {
            totalLocations = LOCATIONS_DATA.length;
        } else {
            totalLocations = 1;
        }

        const baseWeeklyDemand = Math.round(baseVehicleVolumePerLocation * totalLocations * consumptionRatio);

        const horizonWeeks = parseInt(timeHorizon.replace('weeks', ''));
        const dates = [];
        const baseDate = new Date();

        // Generate dates for the selected time horizon
        for (let i = 1; i <= horizonWeeks; i++) {
            const date = new Date(baseDate);
            date.setDate(date.getDate() + (i * 7));
            dates.push(date.toISOString().split('T')[0]);
        }

        return dates.map((date, index) => {
            const weekNumber = index + 1;
            const trendFactor = 1 + (weekNumber * 0.02); // Slight upward trend
            const seasonalFactor = 1 + 0.15 * Math.sin(weekNumber * 0.3); // Seasonal variation
            const uncertaintyFactor = 1 + (weekNumber * 0.02); // Increasing uncertainty

            const forecasted = Math.round(baseWeeklyDemand * trendFactor * seasonalFactor);
            const variance = Math.round(forecasted * 0.12 * uncertaintyFactor);

            return {
                week: date,
                demand: forecasted,
                lower: Math.max(0, forecasted - variance),
                upper: forecasted + variance,
                stock: Math.round(forecasted * 1.2), // 20% buffer
                status: 'Good'
            };
        });
    };

    const forecastSummary = generateForecastSummary();

    return (
        <div className="flex h-screen bg-gray-100">
            {/* <Sidebar userRole={userRole} /> */}

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* <Header 
          title="Demand Forecasting" 
          userRole={userRole} 
          userName={userName} 
        /> */}
                <div className="absolute h-10 top-0 left-0 right-0 z-20 bg-background/95 backdrop-blur-sm border-b">
                    <div className="flex items-center justify-between px-3 h-10">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                <h1 className="text-sm font-bold text-foreground">Demand Forecast</h1>
                            </div>
                        </div>

                    </div>
                </div>

                <main className="flex-1 overflow-y-auto px-3 py-6 mt-5">
                    {/* Controls */}
                    <div className="bg-white px-6 py-3 rounded-lg shadow-sm mb-3">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold">Forecast Parameters</h3>
                            <Button>Update Forecasts</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Part</label>
                                <Select value={selectedPart} onValueChange={setSelectedPart}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {PARTS_DATA.map(part => (
                                            <SelectItem key={part.id} value={part.name}>
                                                {part.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                                    <SelectTrigger>
                                        <SelectValue />
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
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Time Horizon</label>
                                <Select value={timeHorizon} onValueChange={setTimeHorizon}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2weeks">2 Weeks</SelectItem>
                                        <SelectItem value="4weeks">4 Weeks</SelectItem>
                                        <SelectItem value="8weeks">8 Weeks</SelectItem>
                                        <SelectItem value="12weeks">12 Weeks</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Forecast Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                        {/* Forecast Accuracy Card */}
                        <div className="bg-white rounded-lg border p-3 shadow-sm">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="text-xs font-medium text-gray-700">Forecast Accuracy</h3>
                                <TrendingUp className="h-5 w-5  text-green-600" />
                            </div>
                            <div className="text-lg font-bold text-green-600">{forecastAccuracy}%</div>
                            <p className="text-[10px] text-gray-500 mt-0.5">Last 12 weeks average</p>
                        </div>

                        {/* Average Error Card */}
                        <div className="bg-white rounded-lg border p-3 shadow-sm">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="text-xs font-medium text-gray-700">Average Error</h3>
                                <BarChart3 className="h-5 w-5  text-orange-600" />
                            </div>
                            <div className="text-lg font-bold text-orange-600">{avgError}%</div>
                            <p className="text-[10px] text-gray-500 mt-0.5">Mean Absolute Error</p>
                        </div>

                        {/* Next Update Card */}
                        <div className="bg-white rounded-lg border p-3 shadow-sm">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="text-xs font-medium text-gray-700">Next Update</h3>
                                <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="text-lg font-bold text-blue-600">Mon</div>
                            <p className="text-[10px] text-gray-500 mt-0.5">Weekly auto-update</p>
                        </div>
                    </div>
                    
                    {/* Forecast Chart */}
                    <ForecastChart
                        partName={selectedPart}
                        locationId={selectedLocation}
                        timeHorizon={timeHorizon}
                    />

                    {/* Forecast Summary Table */}
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>{timeHorizon.replace('weeks', '')}-Week Forecast Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4">Week Starting</th>
                                            <th className="text-left py-3 px-4">Forecasted Demand</th>
                                            <th className="text-left py-3 px-4">Confidence Interval</th>
                                            <th className="text-left py-3 px-4">Recommended Stock</th>
                                            <th className="text-left py-3 px-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {forecastSummary.map((row, index) => (
                                            <tr key={index} className="border-b hover:bg-gray-50">
                                                <td className="py-3 px-4 font-medium">{row.week}</td>
                                                <td className="py-3 px-4">{row.demand} units</td>
                                                <td className="py-3 px-4">{row.lower} - {row.upper}</td>
                                                <td className="py-3 px-4">{row.stock} units</td>
                                                <td className="py-3 px-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        {row.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
};

export default Forecast;
