"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { PARTS_DATA, LOCATIONS_DATA } from '@/types/inventory';
import { Calendar, Package, Truck, CheckCircle } from 'lucide-react';

const Planning = () => {
    const [selectedWeek, setSelectedWeek] = useState('2025-06-30');
    const userRole = 'oem_planner' as const;
    const userName = 'Arjun Mehta';

    const planningData = [
        { locationId: 'W001', locationName: 'North Regional Warehouse', partId: 'P001', partName: 'Engine oil filter', plannedQty: 1200, actualShipped: 1150, status: 'shipped' },
        { locationId: 'W001', locationName: 'North Regional Warehouse', partId: 'P002', partName: 'Air filter', plannedQty: 800, actualShipped: 820, status: 'shipped' },
        { locationId: 'W002', locationName: 'South Regional Warehouse', partId: 'P001', partName: 'Engine oil filter', plannedQty: 950, actualShipped: 0, status: 'planned' },
        { locationId: 'SC001', locationName: 'Delhi Service Center', partId: 'P003', partName: 'Brake pads', plannedQty: 150, actualShipped: 150, status: 'delivered' },
        { locationId: 'SC002', locationName: 'Mumbai Service Center', partId: 'P004', partName: 'Fuel filter', plannedQty: 200, actualShipped: 195, status: 'shipped' },
    ];

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            planned: { color: 'bg-blue-100 text-blue-800', icon: Calendar },
            shipped: { color: 'bg-orange-100 text-orange-800', icon: Truck },
            delivered: { color: 'bg-green-100 text-green-800', icon: CheckCircle }
        };

        const config = statusConfig[status as keyof typeof statusConfig];
        const Icon = config.icon;

        return (
            <Badge className={config.color}>
                <Icon className="w-3 h-3 mr-1" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="absolute h-10 top-0 left-0 right-0 z-20 bg-background/95 backdrop-blur-sm border-b">
                    <div className="flex items-center justify-between px-3 h-10">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                <h1 className="text-sm font-bold text-foreground">Weekly Planning</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <main className="flex-1 mt-5 overflow-y-auto p-6">
                    {/* Planning Controls */}
                    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Planning Overview</h3>
                            <div className="flex gap-2">
                                <Button variant="outline">Export Plan</Button>
                                <Button>Generate New Plan</Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Week Starting</label>
                                <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2025-06-23">June 23, 2025</SelectItem>
                                        <SelectItem value="2025-06-30">June 30, 2025</SelectItem>
                                        <SelectItem value="2025-07-07">July 7, 2025</SelectItem>
                                        <SelectItem value="2025-07-14">July 14, 2025</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Planning Status</label>
                                <div className="text-lg font-semibold text-green-600">85% Complete</div>
                                <p className="text-xs text-gray-500">23 of 27 locations planned</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Total Value</label>
                                <div className="text-lg font-semibold text-blue-600">₹12,45,000</div>
                                <p className="text-xs text-gray-500">Planned shipments</p>
                            </div>
                        </div>
                    </div>

                    {/* Planning Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Planned</CardTitle>
                                <Package className="h-4 w-4 text-blue-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">2,500</div>
                                <p className="text-xs text-gray-500">Units this week</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Shipped</CardTitle>
                                <Truck className="h-4 w-4 text-orange-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">1,865</div>
                                <p className="text-xs text-gray-500">74.6% of planned</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Delivered</CardTitle>
                                <CheckCircle className="h-4 w-4 text-green-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">1,420</div>
                                <p className="text-xs text-gray-500">56.8% of planned</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                                <Calendar className="h-4 w-4 text-gray-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">635</div>
                                <p className="text-xs text-gray-500">25.4% remaining</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Planning Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Weekly Planning Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4">Location</th>
                                            <th className="text-left py-3 px-4">Part</th>
                                            <th className="text-left py-3 px-4">Planned Qty</th>
                                            <th className="text-left py-3 px-4">Actual Shipped</th>
                                            <th className="text-left py-3 px-4">Variance</th>
                                            <th className="text-left py-3 px-4">Status</th>
                                            <th className="text-left py-3 px-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {planningData.map((row, index) => {
                                            const variance = row.actualShipped - row.plannedQty;
                                            return (
                                                <tr key={index} className="border-b hover:bg-gray-50">
                                                    <td className="py-3 px-4 font-medium">{row.locationName}</td>
                                                    <td className="py-3 px-4">{row.partName}</td>
                                                    <td className="py-3 px-4">{row.plannedQty}</td>
                                                    <td className="py-3 px-4">{row.actualShipped}</td>
                                                    <td className="py-3 px-4">
                                                        <span className={variance >= 0 ? 'text-green-600' : 'text-red-600'}>
                                                            {variance > 0 ? '+' : ''}{variance}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">{getStatusBadge(row.status)}</td>
                                                    <td className="py-3 px-4">
                                                        <Button variant="outline" size="sm">View Details</Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
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

export default Planning;
