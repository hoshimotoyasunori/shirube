import React, { useState, useEffect } from 'react';
import { Project, Task } from './types';
import Sidebar from './components/Sidebar';
import ProjectList from './components/ProjectList';
import TaskList from './components/TaskList';
import ProjectForm from './components/ProjectForm';
import TaskForm from './components/TaskForm';

declare global {
  interface Window {
    electronAPI: {
      getProjects: () => Promise<Project[]>;
      createProject: (project: Project) => Promise<Project>;
      updateProject: (project: Project) => Promise<void>;
      deleteProject: (id: number) => Promise<void>;
      getTasks: (projectId?: number) => Promise<Task[]>;
      createTask: (task: Task) => Promise<Task>;
      updateTask: (task: Task) => Promise<void>;
      deleteTask: (id: number) => Promise<void>;
    };
  }
}

defineDummyElectronAPI();

function defineDummyElectronAPI() {
  if (!window.electronAPI) {
    window.electronAPI = {
      getProjects: async () => [
        { id: 1, name: "サンプルプロジェクト", description: "説明" }
      ],
      createProject: async (project) => project,
      updateProject: async () => {},
      deleteProject: async () => {},
      getTasks: async (projectId) => [
        { id: 1, project_id: 1, title: "サンプルタスク", description: "説明", status: "todo", priority: "medium", is_private: false }
      ],
      createTask: async (task) => task,
      updateTask: async () => {},
      deleteTask: async () => {},
    };
  }
}

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [view, setView] = useState<'projects' | 'tasks'>('projects');

  useEffect(() => {
    loadProjects();
    loadTasks();
  }, []);

  const loadProjects = async () => {
    try {
      const projectsData = await window.electronAPI.getProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error('プロジェクトの読み込みに失敗しました:', error);
    }
  };

  const loadTasks = async (projectId?: number) => {
    try {
      const tasksData = await window.electronAPI.getTasks(projectId);
      setTasks(tasksData);
    } catch (error) {
      console.error('タスクの読み込みに失敗しました:', error);
    }
  };

  const handleCreateProject = async (project: Project) => {
    try {
      await window.electronAPI.createProject(project);
      await loadProjects();
      setShowProjectForm(false);
    } catch (error) {
      console.error('プロジェクトの作成に失敗しました:', error);
    }
  };

  const handleCreateTask = async (task: Task) => {
    try {
      await window.electronAPI.createTask(task);
      await loadTasks(selectedProject?.id);
      setShowTaskForm(false);
    } catch (error) {
      console.error('タスクの作成に失敗しました:', error);
    }
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    loadTasks(project.id);
    setView('tasks');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        onViewChange={setView}
        currentView={view}
        onCreateProject={() => setShowProjectForm(true)}
        onCreateTask={() => setShowTaskForm(true)}
      />
      
      <main className="flex-1 overflow-hidden">
        {view === 'projects' && (
          <ProjectList 
            projects={projects}
            onProjectSelect={handleProjectSelect}
            onProjectDelete={loadProjects}
          />
        )}
        
        {view === 'tasks' && (
          <TaskList 
            tasks={tasks}
            selectedProject={selectedProject}
            onTaskUpdate={loadTasks}
            onTaskDelete={loadTasks}
          />
        )}
      </main>

      {showProjectForm && (
        <ProjectForm 
          onSubmit={handleCreateProject}
          onCancel={() => setShowProjectForm(false)}
        />
      )}

      {showTaskForm && (
        <TaskForm 
          projects={projects}
          selectedProject={selectedProject}
          onSubmit={handleCreateTask}
          onCancel={() => setShowTaskForm(false)}
        />
      )}
    </div>
  );
}

export default App; 