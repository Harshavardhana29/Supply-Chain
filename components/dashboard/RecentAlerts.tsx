"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TrendingDown, Clock } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'low_stock',
    message: 'Brake pads running low at Delhi Service Center',
    location: 'Delhi Service Center',   
    severity: 'high',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    type: 'forecast_variance',
    message: 'Air filter demand 15% higher than forecast',
    location: 'Mumbai Service Center',
    severity: 'medium',
    timestamp: '4 hours ago'
  },
  {
    id: 3,
    type: 'delayed_shipment',
    message: 'Weekly shipment delayed by 1 day',
    location: 'North Regional Warehouse',
    severity: 'low',
    timestamp: '6 hours ago'
  }
];

const RecentAlerts = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'low_stock':
        return <AlertTriangle className="h-4 w-4" />;
      case 'forecast_variance':
        return <TrendingDown className="h-4 w-4" />;
      case 'delayed_shipment':
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`p-1 rounded-full ${getSeverityColor(alert.severity)}`}>
                {getIcon(alert.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                <p className="text-xs text-gray-500">{alert.location}</p>
                <p className="text-xs text-gray-400">{alert.timestamp}</p>
              </div>
              <Badge className={getSeverityColor(alert.severity)}>
                {alert.severity}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentAlerts;
