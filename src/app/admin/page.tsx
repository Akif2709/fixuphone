"use client";

import { AdminAuthGuard } from '@/components/admin-auth-guard';
import {AdminDashboardContent} from './admin-dashboard-content';

export default function AdminDashboard() {
  return (
    <AdminAuthGuard>
      <AdminDashboardContent />
    </AdminAuthGuard>
  );
}