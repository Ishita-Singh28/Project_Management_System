import React, { useEffect, useState } from 'react';
import { getProjects } from '../../../services/api';
import ProjectList from '../../components/projects/ProjectList';
import RequestAccessDropdown from '../../components/projects/RequestAccessDropdown';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

export default function ClientDashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then(res =>
      setProjects(res.data.projects)
    );
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          Hi {user?.username || 'User'} ! 👋
        </h1>

        <p className="text-gray-400 mt-1">
          {projects.length === 0
            ? "You don’t have access to any projects at the moment. Please request the same by clicking on the button below."
            : "Let’s monitor the product wise useage"}
        </p>
      </div>

      
      <RequestAccessDropdown />


      {projects.length > 0 && (
        <ProjectList projects={projects} />
      )}
    </DashboardLayout>
  );
}
