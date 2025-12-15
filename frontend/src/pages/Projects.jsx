import React from 'react';
import AdminDashboard from './dashboard/AdminDashboard';
import ClientDashboard from './dashboard/ClientDashboard';
import { useAuth } from '../context/AuthContext';

export default function Projects() {
  const { user } = useAuth();
  return user.role === 'Admin'
    ? <AdminDashboard />
    : <ClientDashboard />;
}
