import React, { useState, useEffect } from 'react';
import { employeeService, getErrorMessage } from '../services/api';
import Toast from '../components/common/Toast';
import ConfirmModal from '../components/common/ConfirmModal';
import EmployeeTable from '../components/employees/EmployeeTable';
import EmployeeModal from '../components/employees/EmployeeModal';


export default function EmployeesPage({ user, onLogout }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // State Toast
  const [toast, setToast] = useState({ show: false, type: '', message: '' });

  // State Modal Thêm / Sửa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // State Modal Xóa
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null, name: '' });
  const [deleteLoading, setDeleteLoading] = useState(false);

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: '', message: '' });
    }, 3000);
  };

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

  const handleOpenAddModal = () => {
    setEditingEmployee(null);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (emp) => {
    setEditingEmployee(emp);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setFormError('');
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setFormError('Vui lòng điền đầy đủ các trường thông tin');
      return;
    }

    setFormLoading(true);
    try {
      if (editingEmployee) {
        await employeeService.update(editingEmployee.id, formData);
        showToast('success', 'Cập nhật thông tin nhân viên thành công!');
      } else {
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

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Toast thông báo */}
      <Toast toast={toast} />


      {/* Nội dung chính */}
      <main className="w-full">
        <EmployeeTable
          employees={employees}
          loading={loading}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onOpenAddModal={handleOpenAddModal}
          onOpenEditModal={handleOpenEditModal}
          onOpenDeleteModal={(emp) => setDeleteConfirm({ open: true, id: emp.id, name: emp.name })}
        />
      </main>

      {/* Modal Thêm / Sửa */}
      <EmployeeModal
        isOpen={isModalOpen}
        editingEmployee={editingEmployee}
        loading={formLoading}
        error={formError}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
      />

      {/* Modal Xác nhận Xóa */}
      <ConfirmModal
        isOpen={deleteConfirm.open}
        itemName={deleteConfirm.name}
        loading={deleteLoading}
        onConfirm={handleDeleteEmployee}
        onCancel={() => setDeleteConfirm({ open: false, id: null, name: '' })}
      />
    </div>
  );
}
