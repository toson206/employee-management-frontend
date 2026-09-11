# 🎨 Employee Management - Frontend

Giao diện Web Quản lý nhân viên hiện đại, được xây dựng bằng **React**, **Vite** và **Tailwind CSS**.

---

## 🚀 Tính năng nổi bật

- 🔐 **Xác thực người dùng:** Màn hình Đăng nhập & Đăng ký tài khoản với giao diện trực quan, xác thực hợp lệ đầu vào.
- 👥 **Quản lý nhân viên (CRUD):**
  - Xem danh sách nhân viên đồng bộ trực tiếp từ Database Supabase.
  - Tìm kiếm thời gian thực theo Tên, Số điện thoại, Email.
  - Thêm nhân viên mới qua Modal Popup.
  - Chỉnh sửa thông tin nhân viên nhanh chóng.
  - Xóa nhân viên kèm hộp thoại xác nhận an toàn.
- 🚪 **Đăng xuất:** Quản lý trạng thái phiên đăng nhập với `localStorage`.

---

## 🛠️ Công nghệ sử dụng

- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **HTTP Client:** [Axios](https://axios-http.com/)

---

## ⚙️ Hướng dẫn cài đặt và chạy Local

### 1. Yêu cầu hệ thống
- Đã cài đặt [Node.js](https://nodejs.org/) (khuyên dùng bản LTS)

### 2. Cài đặt thư viện
```bash
npm install
```

### 3. Cấu hình Backend URL
Mặc định ứng dụng kết nối tới Backend FastAPI tại: `http://127.0.0.1:8000/api`.
Nếu Backend chạy ở cổng khác, bạn có thể chỉnh sửa trong file `src/services/api.js`.

### 4. Khởi động môi trường phát triển
```bash
npm run dev
```
Trình duyệt sẽ mở tại: `http://localhost:5173/`
