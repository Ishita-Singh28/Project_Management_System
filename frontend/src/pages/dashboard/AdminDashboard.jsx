import React, { useEffect, useState } from 'react';
import { getAllProjectsAdmin, getAllUsers } from '../../../services/api';
import ProjectList from '../../components/projects/ProjectList';
import PendingRequests from '../../components/projects/PendingRequests';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import UsersList from '../../components/users/UsersList';


export default function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const res = await getAllProjectsAdmin();
    setProjects(res.data.projects);
  };

  const fetchUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.data.users);
  };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);



  useEffect(() => {
    getAllProjectsAdmin().then(res =>
      setProjects(res.data.projects)
    );
  }, []);

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Hi Admin! 👋</h1>
          <p className="text-gray-400">
            Let’s monitor the product wise usage
          </p>
        </div>

        <button
          onClick={() => navigate('/projects/create')}
          className="border border-gray-500 px-4 py-2 rounded text-sm hover:bg-[#2a2a2a]"
        >
          Create Project
        </button>

      </div>


      <ProjectList projects={projects} />

      <PendingRequests projects={projects} refetch={fetchProjects} />
      <UsersList users={users} />

    </DashboardLayout>
  );
}
