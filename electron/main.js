// Vỏ máy tính (Windows / macOS) cho bản web trong thư mục web/.
const { app, BrowserWindow, Menu, session, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280, height: 860, minWidth: 380, minHeight: 600,
    backgroundColor: '#233064', title: 'Chấm công Diamond Sky',
    icon: path.join(__dirname, '..', 'web', 'icon-512.png'),
    webPreferences: { contextIsolation: true, sandbox: true, nodeIntegration: false }
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, '..', 'web', 'index.html'));
  // liên kết ngoài mở bằng trình duyệt, không mở trong cửa sổ app
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
}

app.whenReady().then(() => {
  // Trang nạp từ file:// nên cần thêm tiêu đề CORS cho các lệnh gọi tới Google (Firebase).
  session.defaultSession.webRequest.onHeadersReceived((details, cb) => {
    const h = {};
    for (const k of Object.keys(details.responseHeaders || {})) if (!/^access-control-/i.test(k)) h[k] = details.responseHeaders[k];
    if (/^https:\/\/([a-z0-9-]+\.)?googleapis\.com\//.test(details.url)) {
      h['Access-Control-Allow-Origin'] = ['*'];
      h['Access-Control-Allow-Headers'] = ['Content-Type, Authorization'];
      h['Access-Control-Allow-Methods'] = ['GET, POST, PATCH, OPTIONS'];
    }
    cb({ responseHeaders: h });
  });
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
