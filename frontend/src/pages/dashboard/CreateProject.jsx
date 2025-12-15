import React, { useState } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../../services/api';
import DashboardLayout from '../../components/layout/DashboardLayout';

export default function CreateProject() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: 'Haryana',
    startDate: '',
    endDate: '',
  });

  const submit = async (e) => {
    e.preventDefault();
    await createProject(form);
    alert('Project created');
    navigate('/projects');
  };

  return (
    <DashboardLayout>

    
    <div className="text-gray-200">

    
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4"
      >
        <ArrowLeft size={14} />
        Back
      </button>

    
      <h1 className="text-xl font-semibold mb-6">Create Project</h1>

    
      <div className="bg-[#3a3a3a] rounded-xl p-6 max-w-2xl">
        <form onSubmit={submit} className="space-y-5">

        
          <div>
            <label className="block text-sm mb-1">Project Name</label>
            <input
              type="text"
              placeholder="Enter First Name"
              className="w-full bg-[#2f2f2f] border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Email address</label>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full bg-[#2f2f2f] border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Contact Number</label>
              <input
                type="text"
                placeholder="Enter contact number"
                className="w-full bg-[#2f2f2f] border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />
            </div>
          </div>

          
          <div>
            <label className="block text-sm mb-2">Timeline</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="date"
                  className="w-full bg-[#2f2f2f] border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                  onChange={(e) =>
                    setForm({ ...form, startDate: e.target.value })
                  }
                />
                <Calendar
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>

              <div className="relative">
                <input
                  type="date"
                  className="w-full bg-[#2f2f2f] border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                  onChange={(e) =>
                    setForm({ ...form, endDate: e.target.value })
                  }/>
                <Calendar
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
              </div>
            </div>
          </div>


          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-[#8521FF] to-[#AB66FF] text-black px-6 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition">
            Create Project
          </button>
        </form>
      </div>
    </div>
    </DashboardLayout>
  );
}
