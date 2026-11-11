/* Cấu hình Firebase của dự án.
   apiKey không phải mật khẩu: quyền truy cập do Firestore Rules quyết định.
   - databaseURL: Realtime Database, bật đồng bộ tức thì (xem HUONG-DAN.md, mục 8).
   - pollMs: chu kỳ hỏi dữ liệu mới khi kênh tức thì chưa nối được (4000 = khoảng 4 giây). */
window.FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDmPOA53dlOyiReLgo2rOMi8RrtKk8dMJs',
  projectId: 'quan-ly-cong-dms-israel',
  databaseURL: 'https://quan-ly-cong-dms-israel-default-rtdb.asia-southeast1.firebasedatabase.app',
  pollMs: 4000
};
