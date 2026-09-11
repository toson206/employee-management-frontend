import axios from 'axios';

// Đường dẫn Backend FastAPI đang chạy ở cổng 8000
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper bóc tách thông báo lỗi từ backend
export const getErrorMessage = (error) => {
  if (error.response?.data?.detail) {
    if (typeof error.response.data.detail === 'string') {
      return error.response.data.detail;
    }
    if (Array.isArray(error.response.data.detail)) {
      return error.response.data.detail.map((err) => err.msg).join(', ');
    }
  }
  return error.message || 'Có lỗi xảy ra, vui lòng thử lại sau!';
};

// Các hàm gọi API Xác thực (Auth)
export const authService = {
  register: async (username, password) => {
    const response = await api.post('/auth/register', { username, password });
    return response.data;
  },
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },
};

// Các hàm gọi API Quản lý Nhân viên (Employees)
export const employeeService = {
  getAll: async (skip = 0, limit = 100) => {
    const response = await api.get('/employees/', {
      params: { skip, limit },
    });
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
  },
  create: async (employeeData) => {
    const response = await api.post('/employees/', employeeData);
    return response.data;
  },
  update: async (id, employeeData) => {
    const response = await api.put(`/employees/${id}`, employeeData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
  },
};

export default api;
