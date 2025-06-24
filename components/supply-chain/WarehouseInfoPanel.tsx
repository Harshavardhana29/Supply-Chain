'use client';

import { useState, ReactNode } from 'react';
import { Warehouse, Store, Part } from './warehouse';
import {
    X, User, MapPin, Clock, Package, Activity,
    Wrench, Phone, Mail, FileText, AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaWarehouse } from "react-icons/fa";
import Link from 'next/link'

interface WarehouseInfoPanelProps {
    warehouse?: Warehouse;
    store?: Store;
    onClose: () => void;
}

const InfoRow = ({ label, value, icon }: { label: string; value: string; icon?: ReactNode }) => (
    <div className="flex items-start space-x-2">
        {icon && <div className="mt-1 text-primary">{icon}</div>}
        <div>
            <p className="text-muted-foreground text-sm font-medium">{label}</p>
            <p className="text-foreground font-semibold break-all">{value}</p>
        </div>
    </div>
);

const WarehouseInfoPanel = ({ warehouse, store, onClose }: WarehouseInfoPanelProps) => {
    const [activeTab, setActiveTab] = useState<string | null>("contact");

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Critical':
                return 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-800';
            case 'Normal':
                return 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800';
            case 'Active':
                return 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-800';
            default:
                return 'text-muted-foreground bg-muted border-border';
        }
    };

    const currentEntity = store || warehouse;
    const isStore = !!store;

    if (!currentEntity) return null;

    return (
        <div className="absolute top-0 h-[92vh] overflow-y-auto custom-scrollbar overflow-x-hidden right-0 w-[20rem] bg-background/95 backdrop-blur-sm rounded-sm border shadow-sm z-40 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b space-x-3">
                <div className="flex items-center space-x-3 flex-1">
                    <div className="min-w-0">
                        <div className="flex gap-2 items-center">
                            {activeTab ? (
                                <button
                                    onClick={() => setActiveTab(null)}
                                    className="text-foreground font-semibold hover:underline transition"
                                    title="Back to General Info"
                                >
                                    {isStore ? store.storeName : warehouse!.warehouseName}
                                </button>
                            ) : (
                                <h3 className="text-foreground font-semibold">
                                    {isStore ? store.storeName : warehouse!.warehouseName}
                                </h3>
                            )}

                            <span className="text-xs text-gray-800">
                                ({isStore ? store.storeId : warehouse!.warehouseId})
                            </span>
                        </div>
                        {
                            isStore &&
                            <div className={`inline-flex items-center px-1 py-1 rounded-full text-xs font-medium border ${getStatusColor(isStore ? 'Active' : warehouse!.operationalStatus)
                                }`}>
                                Store
                            </div>
                        }
                    </div>
                </div>
                <div className="flex items-center">
                    {isStore ? (
                        <MapPin className="w-8 h-8 text-green-500" />
                    ) : (
                        <FaWarehouse className="w-8 h-8 text-blue-500" />
                    )}
                </div>
                <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Tabs */}
            <div className="py-3 px-3 border-b">
                <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" onClick={() => setActiveTab('contact')}>
                        <Phone className="w-4 h-4 mr-1" /> Contact
                    </Button>
                    <Link href="/inventory">
                        <Button variant="outline" size="sm" onClick={() => setActiveTab('inventory')}>
                            <Package className="w-4 h-4 mr-1" /> Inventory
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Dynamic Content */}
            <div className="p-4 space-y-4">

                {/* Inventory Tab */}
                {/* {activeTab === 'inventory' && (
                    <div className="space-y-3">
                        <h4 className="font-medium text-sm">Parts Inventory</h4>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {(isStore ? store.parts : warehouse!.partsRequirements.slice(0, 10)).map((part: any) => (
                                <div key={part.partId} className="p-2 border rounded-lg">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-sm font-medium">{part.partName}</span>
                                        <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(part.status)}`}>
                                            {part.status}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                                        {isStore ? (
                                            <>
                                                <div>Inventory: {part.inventory}</div>
                                                <div>Required: {part.requiredCount}</div>
                                                <div>Consumed: {part.consumed}</div>
                                            </>
                                        ) : (
                                            <>
                                                <div>Current: {part.currentStock}</div>
                                                <div>Required: {part.requiredCount}</div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )} */}

                {/* Contact Tab */}
                {activeTab === 'contact' && (
                    <div className="space-y-4 text-sm ">
                        <div className="grid grid-cols-2 gap-4">
                            {isStore ? (
                                <>
                                    <InfoRow label="Location" value={store.location} icon={<MapPin className="w-4 h-4 text-blue-500" />} />
                                    <InfoRow label="Manager" value={store.manager} icon={<User className="w-4 h-4 text-sky-500" />} />
                                    <InfoRow label="Contact" value={store.contact} icon={<Phone className="w-4 h-4 text-green-600" />} />
                                    <InfoRow label="Total Parts Required" value={String(store.totalPartsRequired)} icon={<Package className="w-4 h-4 text-orange-500" />} />
                                    <InfoRow label="Parts in Stock" value={String(store.parts.length)} icon={<Package className="w-4 h-4 text-purple-500" />} />
                                    <InfoRow label="Phone" value={store.contact} icon={<Phone className="w-4 h-4 text-green-500" />} />
                                    <InfoRow label="Store ID" value={store.storeId} icon={<FileText className="w-4 h-4 text-purple-500" />} />
                                </>
                            ) : (
                                <>
                                    <InfoRow label="City" value={warehouse!.location?.city} icon={<MapPin className="w-4 h-4 text-blue-500" />} />
                                    <InfoRow label="State" value={warehouse!.location.state} icon={<MapPin className="w-4 h-4 text-sky-500" />} />
                                    <InfoRow label="Manager" value={warehouse!.warehouseManager.name} icon={<User className="w-4 h-4 text-green-600" />} />
                                    <InfoRow label="Total Parts Required" value={String(warehouse!.totalPartsRequired)} icon={<Package className="w-4 h-4 text-orange-500" />} />
                                    <InfoRow label="Manager ID" value={warehouse!.warehouseManager.id} icon={<FileText className="w-4 h-4 text-sky-500" />} />
                                    <InfoRow label="Manager Phone" value={warehouse!.warehouseManager.contact} icon={<Phone className="w-4 h-4 text-green-500" />} />
                                    <InfoRow
                                        label={
                                            warehouse!.type === 'warehouse'
                                                ? 'Warehouse Contact'
                                                : warehouse!.type === 'service'
                                                    ? 'Service Center Contact'
                                                    : 'Store Contact'
                                        }
                                        icon={<Phone className="w-4 h-4 text-orange-500" />}
                                        value={
                                            <>
                                                <span>{warehouse!.contact.phone}</span>
                                                <span className="mt-1 text-purple-700 truncate">{warehouse!.contact.email}</span>
                                            </>
                                        }
                                    />

                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WarehouseInfoPanel;