'use client'

import React from 'react';
import MetricsCard from '@/components/dashboard/MetricsCard';
import InventoryChart from '@/components/dashboard/InventoryChart';
import RecentAlerts from '@/components/dashboard/RecentAlerts';
import ForecastChart from '@/components/forecast/ForecastChart';
import { Package, TrendingUp, AlertTriangle, Truck } from 'lucide-react';

const Dashboard = () => {

    const userRole = 'oem_planner' as const;
    const userName = 'Arjun Mehta';

    return (
        <div className="flex h-screen bg-gray-100">

            <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
                <div className="absolute h-10 top-0 left-0 right-0 z-20 bg-background/95 backdrop-blur-sm border-b">
                    <div className="flex items-center justify-between px-3 h-10">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                <h1 className="text-sm font-bold text-foreground">Supply Chain Dashboard</h1>
                            </div>
                        </div>

                    </div>
                </div>

                <main className="flex-1 overflow-y-auto p-6 mt-5">
                    {/* Metrics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <MetricsCard
                            title="Total Parts"
                            value="2,847"
                            subtitle="Across all locations"
                            icon={Package}
                            trend={{ value: 5.2, isPositive: true }}
                        />
                        <MetricsCard
                            title="Low Stock Alerts"
                            value="12"
                            subtitle="Requiring attention"
                            icon={AlertTriangle}
                            trend={{ value: -15.3, isPositive: true }}
                        />
                        <MetricsCard
                            title="Weekly Demand"
                            value="1,284"
                            subtitle="Units forecasted"
                            icon={TrendingUp}
                            trend={{ value: 8.7, isPositive: true }}
                        />
                        <MetricsCard
                            title="Active Locations"
                            value="24"
                            subtitle="Warehouses & Centers"
                            icon={Truck}
                        />
                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <InventoryChart />
                        <ForecastChart />
                    </div>

                    {/* Recent Alerts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <RecentAlerts />

                        {/* Quick Actions */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                    <div className="font-medium text-blue-900">Generate Weekly Plan</div>
                                    <div className="text-sm text-blue-700">Create shipment plan for next week</div>
                                </button>
                                <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                                    <div className="font-medium text-green-900">Update Forecasts</div>
                                    <div className="text-sm text-green-700">Refresh demand predictions</div>
                                </button>
                                <button className="w-full text-left p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
                                    <div className="font-medium text-yellow-900">Review Alerts</div>
                                    <div className="text-sm text-yellow-700">Check critical inventory levels</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
