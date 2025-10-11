"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { RepairOrderStatus } from "@/types";

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

interface RecentOrdersTabProps {
  repairOrders: RepairOrder[];
}

export function RecentOrdersTab({ repairOrders }: RecentOrdersTabProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Pending", variant: "secondary" as const },
      confirmed: { label: "Confirmed", variant: "default" as const },
      in_progress: { label: "In Progress", variant: "default" as const },
      completed: { label: "Completed", variant: "default" as const },
      cancelled: { label: "Cancelled", variant: "destructive" as const },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Repair Orders</CardTitle>
        <CardDescription>Latest repair orders and their status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {repairOrders.slice(0, 20).map((order) => (
            <div key={order._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">#{order.orderNumber}</p>
                    <p className="text-sm text-gray-600">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.customerPhone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {order.deviceModel?.brand?.name} {order.deviceModel?.name}
                    </p>
                    <p className="text-sm text-gray-600">{order.repairService?.repairType?.name}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium">€{order.repairCost.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">{new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                {getStatusBadge(order.status)}
              </div>
            </div>
          ))}

          {repairOrders.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No repair orders found</p>
              <p className="text-sm mt-2">Orders will appear here once customers make bookings</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
