import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import { logout } from '../../../services/api';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo_png.png';

export default function Topbar() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed');
    }
  };

  return (
    <header className="h-full bg-[#1e1e1e]  flex items-center px-6 sticky top-0 z-50">
      
    
      <div className="flex items-center gap-2 min-w-[200px] pt-2">
        <img src={logo} alt="Logo" className="w-15 h-15" />
        <span className="text-white font-medium tracking-wide">
          ubiquitous.co
        </span>
      </div>

    
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-3xl">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search quantity control, regulators..."
            className="w-full bg-[#2a2a2a] text-sm text-gray-200 placeholder-gray-400 rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>
      </div>

      
      <div className="flex items-center gap-4 min-w-[200px] justify-end">
        
    
        <button className="text-gray-400 hover:text-white transition">
          <Bell size={18} />
        </button>

    
        {user && (
          <span className="bg-[#2a2a2a] text-gray-200 text-xs px-3 py-1 rounded-full">
            {user.role}
          </span>
        )}

        
        <button
          onClick={handleLogout}
          className="w-8 h-8 rounded-full bg-purple-500 text-black flex items-center justify-center font-semibold text-sm"
          title="Logout"
        >
          {user?.username?.[0]?.toUpperCase()}
        </button>
      </div>
    </header>
  );
}
