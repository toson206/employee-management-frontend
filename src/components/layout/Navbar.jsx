import React from 'react';
import { Building2, User, LogOut, LayoutDashboard, Users } from 'lucide-react';

export default function Navbar({ user, activeTab, onTabChange, onLogout }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Navigation Tabs */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 leading-none">
                HR Management
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">FastAPI & Supabase</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => onTabChange('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Tổng quan</span>
            </button>

            <button
              onClick={() => onTabChange('employees')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'employees'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Nhân viên</span>
            </button>
          </nav>
        </div>

        {/* User Info & Logout Button */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-slate-700 text-sm">
            <User className="w-4 h-4 text-indigo-600" />
            <span className="font-semibold">{user?.username || 'Admin'}</span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Đăng xuất"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Đăng xuất</span>
          </button>
        </div>

      </div>

      {/* Mobile Nav Tabs */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 py-2 bg-slate-50 px-4">
        <button
          onClick={() => onTabChange('dashboard')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold ${
            activeTab === 'dashboard' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Tổng quan</span>
        </button>
        <button
          onClick={() => onTabChange('employees')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold ${
            activeTab === 'employees' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Nhân viên</span>
        </button>
      </div>
    </header>
  );
}
