"use client";

import { useState, useEffect } from "react";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Settings, Package, Info, BarChart3 } from 'lucide-react';
import { getAllRepairOrdersWithRelations } from '@/lib/database-actions';
import { logoutAdmin } from '@/lib/database-actions/admin-actions';
import { useRouter } from 'next/navigation';
import type { RepairOrderStatus } from '@/types';
import { RecentOrdersTab } from './tabs/recent-orders-tab';
import { ContactInfoTab } from './tabs/contact-info-tab';
import { StatsTab } from './tabs/stats-tab';

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

export function AdminDashboardContent() {
  const router = useRouter();
  const [repairOrders, setRepairOrders] = useState<RepairOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllRepairOrdersWithRelations();
        if (result.success) {
          // Serialize the data to convert ObjectId to string
          const serializedOrders = (result.data || []).map(order => ({
            ...order,
            _id: order._id?.toString(),
          }));
          setRepairOrders(serializedOrders);
        } else {
          setError("Failed to load repair orders");
        }
      } catch {
        setError("An error occurred while loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage repair orders and bookings</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-6">
            <TabsTrigger value="orders" className="gap-2">
              <Package className="h-4 w-4" />
              Recent Orders
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2">
              <Info className="h-4 w-4" />
              Contact Info
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Stats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <RecentOrdersTab repairOrders={repairOrders} />
          </TabsContent>

          <TabsContent value="contact">
            <ContactInfoTab />
          </TabsContent>

          <TabsContent value="stats">
            <StatsTab repairOrders={repairOrders} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
