import React from 'react';
import { FolderOpen, CheckSquare, Plus } from 'lucide-react';

interface SidebarProps {
  currentView: 'projects' | 'tasks';
  onViewChange: (view: 'projects' | 'tasks') => void;
  onCreateProject: () => void;
  onCreateTask: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  onCreateProject,
  onCreateTask
}) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Shirube</h1>
        <p className="text-sm text-gray-600 mt-1">プロジェクト管理</p>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <button
            onClick={() => onViewChange('projects')}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              currentView === 'projects'
                ? 'bg-primary-50 text-primary-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FolderOpen className="mr-3 h-5 w-5" />
            プロジェクト
          </button>

          <button
            onClick={() => onViewChange('tasks')}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              currentView === 'tasks'
                ? 'bg-primary-50 text-primary-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <CheckSquare className="mr-3 h-5 w-5" />
            タスク
          </button>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          <button
            onClick={onCreateProject}
            className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" />
            プロジェクト作成
          </button>

          <button
            onClick={onCreateTask}
            className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-md hover:bg-primary-50 transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" />
            タスク作成
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 