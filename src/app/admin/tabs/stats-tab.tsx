"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Phone, User } from 'lucide-react';
import type { RepairOrderStatus } from '@/types';

interface RepairOrder {
  _id?: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  status: RepairOrderStatus;
  repairCost: number;
  orderDate: Date;
  estimatedCompletion: Date;
  deviceModel?: {
    name: string;
    brand?: {
      name: string;
    };
  };
  repairService?: {
    price: number;
    repairType?: {
      name: string;
    };
  };
}

interface StatsTabProps {
  repairOrders: RepairOrder[];
}

export function StatsTab({ repairOrders }: StatsTabProps) {
  const pendingOrders = repairOrders.filter(order => order.status === 'pending');
  const totalRevenue = repairOrders
    .filter(order => order.status === 'completed')
    .reduce((sum, order) => sum + order.repairCost, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{repairOrders.length}</div>
          <p className="text-xs text-muted-foreground">
            All repair orders
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingOrders.length}</div>
          <p className="text-xs text-muted-foreground">
            Awaiting confirmation
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <Phone className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€{totalRevenue.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            From completed orders
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
