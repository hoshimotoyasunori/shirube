import { contextBridge, ipcRenderer } from 'electron';

// レンダラープロセスで使用するAPIを定義
contextBridge.exposeInMainWorld('electronAPI', {
  // プロジェクト関連
  getProjects: () => ipcRenderer.invoke('db-get-projects'),
  createProject: (project: any) => ipcRenderer.invoke('db-create-project', project),
  updateProject: (project: any) => ipcRenderer.invoke('db-update-project', project),
  deleteProject: (id: number) => ipcRenderer.invoke('db-delete-project', id),
  
  // タスク関連
  getTasks: (projectId?: number) => ipcRenderer.invoke('db-get-tasks', projectId),
  createTask: (task: any) => ipcRenderer.invoke('db-create-task', task),
  updateTask: (task: any) => ipcRenderer.invoke('db-update-task', task),
  deleteTask: (id: number) => ipcRenderer.invoke('db-delete-task', id),
}); 