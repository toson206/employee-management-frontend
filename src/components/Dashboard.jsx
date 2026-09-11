import React, { useState, useEffect } from 'react';
import { employeeService, getErrorMessage } from '../services/api';
import {
  Building2,
  LogOut,
  Plus,
  Search,
  Edit2,
  Trash2,
  User,
  Phone,
  Mail,
  Users,
  Loader2,
  X,
  AlertCircle,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

export default function Dashboard({ user, onLogout }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // State thông báo
  const [toast, setToast] = useState({ show: false, type: '', message: '' });

  // State Modal Thêm / Sửa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // State Modal Xóa
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null, name: '' });
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Hiển thị Toast thông báo
  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: '', message: '' });
    }, 3000);
  };

  // Tải danh sách nhân viên từ Backend
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await employeeService.getAll();
      setEmployees(data);
    } catch (err) {
      showToast('error', getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Mở modal Thêm mới
  const handleOpenAddModal = () => {
    setEditingEmployee(null);
    setFormData({ name: '', phone: '', email: '' });
    setFormError('');
    setIsModalOpen(true);
  };

  // Mở modal Sửa
  const handleOpenEditModal = (emp) => {
    setEditingEmployee(emp);
    setFormData({ name: emp.name, phone: emp.phone, email: emp.email });
    setFormError('');
    setIsModalOpen(true);
  };

  // Submit Form Thêm hoặc Sửa
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setFormError('Vui lòng điền đầy đủ các trường thông tin');
      return;
    }

    setFormLoading(true);
    try {
      if (editingEmployee) {
        // Cập nhật (PUT)
        await employeeService.update(editingEmployee.id, formData);
        showToast('success', 'Cập nhật thông tin nhân viên thành công!');
      } else {
        // Thêm mới (POST)
        await employeeService.create(formData);
        showToast('success', 'Thêm nhân viên mới thành công!');
      }
      setIsModalOpen(false);
      fetchEmployees();
    } catch (err) {
      setFormError(getErrorMessage(err));
    } finally {
      setFormLoading(false);
    }
  };

  // Xác nhận Xóa nhân viên (DELETE)
  const handleDeleteEmployee = async () => {
    if (!deleteConfirm.id) return;
    setDeleteLoading(true);
    try {
      await employeeService.delete(deleteConfirm.id);
      showToast('success', 'Xóa nhân viên thành công!');
      setDeleteConfirm({ open: false, id: null, name: '' });
      fetchEmployees();
    } catch (err) {
      showToast('error', getErrorMessage(err));
    } finally {
      setDeleteLoading(false);
    }
  };

  // Lọc danh sách theo từ khóa tìm kiếm (tên, sđt, email)
  const filteredEmployees = employees.filter((emp) => {
    const term = searchTerm.toLowerCase();
    return (
      emp.name.toLowerCase().includes(term) ||
      emp.phone.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border transition-all text-sm animate-bounce ${
            toast.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600" />
          )}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 leading-none">
                Hệ Thống Quản Lý Nhân Viên
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">Dữ liệu Supabase & FastAPI</p>
            </div>
          </div>

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
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stat Card & Top Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Tổng nhân viên
              </p>
              <p className="text-2xl font-bold text-slate-800">{employees.length}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm tên, SĐT, email..."
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 shadow-xs"
              />
            </div>

            {/* Add Button */}
            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-indigo-500/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm nhân viên</span>
            </button>
          </div>
        </div>

        {/* Employee Table Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-2" />
              <p className="text-sm">Đang tải dữ liệu nhân viên...</p>
            </div>
          ) : filteredEmployees.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400">
              <Users className="w-12 h-12 text-slate-300 mb-3" />
              <p className="text-base font-semibold text-slate-600">Không tìm thấy nhân viên nào</p>
              <p className="text-sm text-slate-400 mt-1">
                {searchTerm ? 'Thử tìm kiếm với từ khóa khác' : 'Hãy bấm nút "Thêm nhân viên" để bắt đầu!'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="py-3.5 px-6">ID</th>
                    <th className="py-3.5 px-6">Họ & Tên</th>
                    <th className="py-3.5 px-6">Số điện thoại</th>
                    <th className="py-3.5 px-6">Email</th>
                    <th className="py-3.5 px-6">Ngày tạo</th>
                    <th className="py-3.5 px-6 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-slate-500">#{emp.id}</td>
                      <td className="py-4 px-6 font-medium text-slate-800">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                            {emp.name.charAt(0).toUpperCase()}
                          </div>
                          <span>{emp.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{emp.phone}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{emp.email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-400 text-xs">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{emp.created_at ? new Date(emp.created_at).toLocaleDateString('vi-VN') : '—'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(emp)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                            title="Chỉnh sửa"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ open: true, id: emp.id, name: emp.name })}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* MODAL THÊM / SỬA NHÂN VIÊN */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">
                {editingEmployee ? 'Chỉnh sửa thông tin nhân viên' : 'Thêm nhân viên mới'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="my-4 flex items-start gap-2.5 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Số điện thoại (10 chữ số)
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Ví dụ: 0912345678"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Ví dụ: vana@example.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-500/20 flex items-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {formLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{editingEmployee ? 'Lưu thay đổi' : 'Thêm mới'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL XÁC NHẬN XÓA */}
      {deleteConfirm.open && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-150 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Xác nhận xóa nhân viên</h3>
            <p className="text-sm text-slate-500 mt-2">
              Bạn có chắc chắn muốn xóa nhân viên <strong className="text-slate-800">{deleteConfirm.name}</strong> không? Hành động này không thể hoàn tác.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => setDeleteConfirm({ open: false, id: null, name: '' })}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleDeleteEmployee}
                disabled={deleteLoading}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-rose-500/20 flex items-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {deleteLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Xóa luôn</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
