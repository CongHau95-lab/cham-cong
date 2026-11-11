/* Cấu hình Firebase của dự án. Dán 2 giá trị lấy từ Firebase Console (xem HUONG-DAN.md).
   apiKey không phải mật khẩu: quyền truy cập do Firestore Rules quyết định.
   pollMs: số mili giây giữa hai lần hỏi dữ liệu mới (4000 = khoảng 4 giây). */
window.FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDmPOA53dlOyiReLgo2rOMi8RrtKk8dMJs',
  projectId: 'quan-ly-cong-dms-israel',
  pollMs: 4000
};
