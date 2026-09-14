import React, { useState, useEffect } from 'react';
import { employeeService, getErrorMessage } from '../services/api';
import {
  Users,
  Building2,
  Activity,
  ArrowRight,
  Plus,
  Calendar,
  Phone,
  Mail,
  Loader2,
  Clock
} from 'lucide-react';

export default function DashboardPage({ user, onNavigateToEmployees, onOpenAddEmployee }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await employeeService.getAll();
        setEmployees(data);
      } catch (err) {
        console.error(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const recentEmployees = [...employees].slice(-5).reverse();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-500/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md mb-3">
            <Clock className="w-3.5 h-3.5" />
            Hệ thống quản trị nhân sự 2026
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold">
            Xin chào, {user?.username || 'Admin'}! 👋
          </h2>
          <p className="text-indigo-100 text-sm mt-1 max-w-xl">
            Chào mừng bạn quay trở lại. Dưới đây là tổng quan tình hình nhân sự và dữ liệu đồng bộ trực tiếp từ Supabase Database.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToEmployees}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-indigo-700 font-semibold text-sm rounded-xl shadow-md hover:bg-indigo-50 transition-all cursor-pointer"
          >
            <span>Xem danh sách</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Tổng nhân viên */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Tổng nhân viên
            </p>
            <h3 className="text-3xl font-bold text-slate-800 mt-0.5">
              {loading ? <Loader2 className="w-6 h-6 animate-spin text-indigo-600" /> : employees.length}
            </h3>
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              Đồng bộ Supabase
            </p>
          </div>
        </div>

        {/* Card 2: Phòng ban */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Phòng ban / Bộ phận
            </p>
            <h3 className="text-3xl font-bold text-slate-800 mt-0.5">
              Sắp ra mắt
            </h3>
            <p className="text-xs text-purple-600 font-semibold mt-1">
              Đang chuẩn bị cập nhật
            </p>
          </div>
        </div>

        {/* Card 3: Trạng thái hệ thống */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <Activity className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Trạng thái hệ thống
            </p>
            <h3 className="text-xl font-bold text-slate-800 mt-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Trực tuyến (Online)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              FastAPI port 8000
            </p>
          </div>
        </div>
      </div>

      {/* Recent Employees Table Preview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Nhân viên mới cập nhật gần đây
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Danh sách 5 nhân sự được thêm gần nhất trong cơ sở dữ liệu
            </p>
          </div>
          <button
            onClick={onNavigateToEmployees}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-600 mb-2" />
            <p className="text-xs">Đang tải dữ liệu...</p>
          </div>
        ) : recentEmployees.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-600">Chưa có nhân viên nào</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-400 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3 px-6">Họ và tên</th>
                  <th className="py-3 px-6">Số điện thoại</th>
                  <th className="py-3 px-6">Email</th>
                  <th className="py-3 px-6">Ngày tham gia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-6 font-medium text-slate-800 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                        {emp.name.charAt(0).toUpperCase()}
                      </div>
                      <span>{emp.name}</span>
                    </td>
                    <td className="py-3.5 px-6 text-slate-600">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{emp.phone}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 text-slate-600">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{emp.email}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 text-slate-400 text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{emp.created_at ? new Date(emp.created_at).toLocaleDateString('vi-VN') : '—'}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
