import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { Database } from './database';

let mainWindow: BrowserWindow | null = null;
let db: Database;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../assets/icon.png')
  });

  // 開発環境ではローカルサーバーを、本番環境ではビルドされたファイルを読み込み
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  // データベース初期化
  db = new Database();
  db.init();

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC通信の設定
ipcMain.handle('db-get-projects', async () => {
  return await db.getProjects();
});

ipcMain.handle('db-create-project', async (event, project) => {
  return await db.createProject(project);
});

ipcMain.handle('db-update-project', async (event, project) => {
  return await db.updateProject(project);
});

ipcMain.handle('db-delete-project', async (event, id) => {
  return await db.deleteProject(id);
});

ipcMain.handle('db-get-tasks', async (event, projectId?: number) => {
  return await db.getTasks(projectId);
});

ipcMain.handle('db-create-task', async (event, task) => {
  return await db.createTask(task);
});

ipcMain.handle('db-update-task', async (event, task) => {
  return await db.updateTask(task);
});

ipcMain.handle('db-delete-task', async (event, id) => {
  return await db.deleteTask(id);
}); 