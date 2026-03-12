import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, LogOut, User } from 'lucide-react';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-700/60 bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-md shadow-violet-500/30">
            <CheckSquare className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">TaskFlow</span>
        </div>

        {/* User info + logout */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-1.5 text-sm text-slate-300">
            <User className="h-4 w-4 text-violet-400" />
            <span>{user?.username}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-lg border border-slate-600 bg-slate-800 px-3 py-1.5 text-sm text-slate-300 transition hover:border-red-500/60 hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
