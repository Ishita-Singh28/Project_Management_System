import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Droplet, Folder, LayoutDashboard, History, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const linkBase =
    'flex items-center gap-3 px-4 py-2 rounded-md text-sm transition-colors';

  const linkClass = ({ isActive }) =>
    `${linkBase} ${isActive
      ? 'bg-gradient-to-r from-[#8521FF] to-[#AB66FF] text-whitw'
      : 'text-white hover:text-white hover:bg-gradient-to-r hover:from-[#8521FF] hover:to-[#AB66FF]'

    }`;

  return (
    <aside className="w-64 h-[85vh] ml-2 mb-2 sticky top-[12vh]  bg-[#2a2a2a] flex flex-col rounded-2xl justify-between p-4">


      <nav className="space-y-1">
        <NavLink to="/home" className={linkClass}>
          <Home size={16} />
          Homescreen
        </NavLink>

        <NavLink to="/usage" className={linkClass}>
          <Droplet size={16} />
          Usage
        </NavLink>

        <NavLink to="/projects" className={linkClass}>
          <Folder size={16} />
          Projects
        </NavLink>

        <NavLink to="/taskboard" className={linkClass}>
          <LayoutDashboard size={16} />
          Taskboard
        </NavLink>

        <NavLink to="/history" className={linkClass}>
          <History size={16} />
          History
        </NavLink>

        {/* {user.role === 'Admin' && (
          <>
          </>
        )} */}
      </nav>

      <button
        onClick={() => {
          logout();
          navigate('/login');
        }}

        className="flex items-center gap-3  px-4 py-2 rounded-md text-white hover:bg-gradient-to-r hover:from-[#8521FF] hover:to-[#AB66FF]"
      >
        <LogOut size={16} />
        Log out
      </button>
    </aside>
  );
}
