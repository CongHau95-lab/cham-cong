# Chấm công Diamond Sky: hướng dẫn đưa app lên máy tính và điện thoại

Phần mềm do **Nguyễn Công Hậu** tạo · ĐT 0964 318 104

Bộ này gồm 1 giao diện web duy nhất (thư mục `web/`) dùng chung một kho dữ liệu trên Firebase.
Từ đó đóng gói thành: web (iPhone, Android, máy tính), file `.apk` (Android), bộ cài `.exe` (Windows), `.dmg` (Mac).

> **Trạng thái kiểm thử.** Phần web (đăng nhập, phân quyền, ẩn dữ liệu cá nhân, đồng bộ, góp ý, sao lưu, mở khi mất mạng) đã chạy thử đủ trên máy chủ Firebase giả lập. **Chưa thử được trên Firebase thật**: file `firestore.rules`, kênh đồng bộ tức thì (mục 8), và các bước tạo `.apk` / `.exe` / `.dmg` bằng GitHub Actions. Làm theo mục 6 để tự kiểm tra rules trước khi dùng thật.

---

## 1. Các mức quyền

| Mức | Ai | Làm được gì |
|---|---|---|
| Khách | Ai tải app, không đăng nhập | Chỉ **xem** dữ liệu công khai. Không thấy CCCD, ngày sinh, hộ khẩu, SĐT, ngân hàng, số tài khoản, đơn giá, lý do nghỉ, chuyên cần, cài đặt. Chỉ xuất được Bảng tổng hợp BCC. |
| Chờ duyệt | Vừa đăng ký | Như khách, cho đến khi Chủ cấp quyền. |
| Xem | Chủ duyệt | Xem đầy đủ (cả thông tin cá nhân, lương, chuyên cần), không sửa. |
| Nhận xét | Chủ duyệt | Như Xem, và gửi đề xuất, góp ý, nhận xét ở tab **Góp ý**. |
| Chỉnh sửa | Chủ duyệt | Như Nhận xét, và chấm công, sửa dữ liệu, trả lời góp ý. |
| **Chủ** | Anh Hậu | Mọi quyền, và vào tab **Tài khoản** để cấp quyền cho từng email. |

**Rời dự án.** Chủ vào tab Tài khoản, mục **Người kế nhiệm**: chọn một tài khoản (đã xác minh email) rồi bấm **Rời dự án: chuyển quyền Chủ ngay** (bấm 2 lần để xác nhận). Người đó thành Chủ; tài khoản cũ về mức anh chọn (Chỉnh sửa, Nhận xét, Xem hoặc Chờ duyệt).

> Lưu ý: ghi chú nhập ở từng ô chấm công (ví dụ "Việc gia đình") là dữ liệu công khai, khách cũng đọc được. Lý do nghỉ trong hồ sơ nhân sự thì riêng tư.

---

## 2. Tạo kho dữ liệu Firebase (làm một lần, miễn phí)

1. Vào https://console.firebase.google.com bằng tài khoản Google → **Add project** → đặt tên (ví dụ `chamcong-diamond-sky`) → tắt Google Analytics → Create.
2. **Build → Authentication → Get started → Sign-in method → Email/Password → Enable → Save.**
3. **Build → Firestore Database → Create database** → chọn **Production mode** → vị trí `asia-southeast1 (Singapore)` → Enable.
4. **Firestore → tab Rules** → xóa nội dung cũ → dán toàn bộ file `firestore.rules` → **Publish**.
5. **Project settings (biểu tượng bánh răng) → General → Your apps → biểu tượng `</>` (Web)** → đặt tên → Register app. Sao chép 2 giá trị `apiKey` và `projectId`.
6. Mở file `web/firebase-config.js`, dán 2 giá trị đó vào chỗ `DIEN-...`, lưu lại.

Gói Spark (miễn phí) có hạn mức đọc ghi mỗi ngày; vượt hạn mức thì dịch vụ tạm dừng chứ **không bị tính tiền**. App chỉ tải lại phần dữ liệu có thay đổi nên thường đủ cho một đội nhỏ.

---

## 3. Tạo tài khoản Chủ đầu tiên

1. Mở bản web (mục 4) → **Đăng nhập → Đăng ký** bằng email của anh. Kiểm tra thư, bấm liên kết xác minh email.
2. Vào Firebase Console → **Firestore Database → Data → users →** tài liệu có email của anh → sửa trường `role` từ `pending` thành `owner` → Update.
3. Quay lại app, đăng xuất rồi đăng nhập lại: anh thấy tab **Tài khoản** và cấp quyền cho người khác từ đó.

Người khác chỉ cần đăng ký trong app, Chủ vào tab Tài khoản chọn mức quyền cho email đó.

---

## 4. Đưa lên mạng và cài trên từng thiết bị

### Đưa web lên GitHub (miễn phí)
1. Tạo tài khoản https://github.com → **New repository** (công khai) → tải toàn bộ nội dung thư mục này lên (nút *Add file → Upload files*; nhớ cả thư mục `.github`).
2. Repo → **Settings → Pages → Source: GitHub Actions**.
3. Tab **Actions → Build → Run workflow**. Khi chạy xong, địa chỉ web hiện ở mục *web → deploy*.

(`apiKey` của Firebase không phải mật khẩu. Dữ liệu được bảo vệ bằng Rules ở mục 2.)

### iPhone
Mở địa chỉ web bằng **Safari** → nút Chia sẻ → **Thêm vào Màn hình chính**. App mở toàn màn hình như app thường, không cần Apple Developer ($99/năm). Làm file cài `.ipa` thật cần máy Mac và tài khoản Apple Developer, bộ này chưa làm phần đó.

### Android
- Cách 1: mở địa chỉ web bằng Chrome → menu ⋮ → **Cài đặt ứng dụng / Thêm vào màn hình chính**.
- Cách 2 (file .apk): sau khi workflow xong, vào lần chạy đó → **Artifacts → ChamCong-Android-apk**, tải về, chép sang điện thoại và mở (cho phép "cài từ nguồn không rõ").

### Windows / Mac
Trong **Artifacts** của lần chạy: `ChamCong-Windows-exe` (bộ cài .exe) và `ChamCong-Mac-dmg`. File chưa ký số nên Windows hiện cảnh báo "Windows protected your PC": bấm *More info → Run anyway*. Hoặc không cài gì: dùng thẳng địa chỉ web trên máy tính.

---

## 5. Chuyển dữ liệu cũ sang app mới

1. Mở bản chấm công đang dùng trong Claude → tab **Cài đặt → Sao lưu và khôi phục → Tải bản sao lưu** (ra file `.json`).
2. Mở app mới, đăng nhập tài khoản Chủ → **Cài đặt → Khôi phục từ file…** → chọn file → bấm *Khôi phục* hai lần.

Thông tin cá nhân trong file được tự tách sang vùng riêng tư. **Cất file sao lưu cẩn thận vì có CCCD, số tài khoản.** Nên sao lưu mỗi tháng một lần.

---

## 6. Tự kiểm tra rules (10 phút, nên làm)

Firestore → Rules → **Rules playground**. Thử:
- Đọc `workers_private/w01`, *Authenticated: tắt* → phải **bị từ chối**.
- Đọc `workers/w01`, *Authenticated: tắt* → được phép.
- Ghi `days/2026-01-01`, *Authenticated: tắt* → phải **bị từ chối**.
- Đọc `users/<uid của người khác>` bằng tài khoản thường → **bị từ chối**.

Nếu một dòng khác kết quả này, đừng dùng thật mà báo lại để sửa rules.

---

## 7. Sự cố thường gặp

- **"Chưa cấu hình Firebase"**: chưa dán `apiKey`, `projectId` vào `web/firebase-config.js`, hoặc chưa tải lại trang.
- **"Máy chủ từ chối ghi hồ sơ tài khoản"**: chưa dán rules, hoặc rules chưa Publish.
- **Quên mật khẩu**: màn Đăng nhập → *Quên mật khẩu?*.
- **Chủ mất quyền truy cập**: Firebase Console → Firestore → users → sửa `role` của tài khoản cần làm Chủ thành `owner` (người dùng này phải xác minh email).
- **Không vào được khi mất mạng**: app mở lại được và hiện dữ liệu công khai lần gần nhất, nhưng chưa ghi được cho đến khi có mạng. Thông tin cá nhân không lưu trên máy nên không hiện khi mất mạng.

---

## 8. Đồng bộ tức thì giữa web và app (Realtime Database)

Mặc định app hỏi máy chủ vài giây một lần (`pollMs`). Để máy này sửa là máy kia thấy trong khoảng 1 giây, bật thêm một kênh báo tin rất nhẹ:

1. Firebase Console → **Build → Realtime Database → Create Database** → vị trí `asia-southeast1` → **Start in locked mode** → Enable.
2. Tab **Rules** → xóa nội dung cũ → dán file `database.rules.json` → **Publish**.
3. Chép địa chỉ ở đầu tab Data (dạng `https://TEN-DU-AN-default-rtdb.asia-southeast1.firebasedatabase.app`), dán vào `web/firebase-config.js` ở dòng `databaseURL`.

Kênh này chỉ chứa **một con số** (thời điểm sửa gần nhất), không chứa dữ liệu chấm công hay thông tin cá nhân. Khi con số đổi, app tự tải phần dữ liệu mới từ Firestore, vẫn theo đúng phân quyền.

Chân trang hiện **● Trực tiếp** khi kênh đang nối, **○ Định kỳ** khi chưa nối được (khi đó app tự quay về hỏi theo chu kỳ, không mất dữ liệu). Chạy nền thì app tạm ngắt kênh, mở lại là nối lại và bù phần đã lỡ.

Lưu ý: ai đã đăng nhập và xác minh email đều ghi được con số này. Họ chỉ có thể làm các máy tải lại dữ liệu nhiều hơn, không đọc hay sửa được dữ liệu.

