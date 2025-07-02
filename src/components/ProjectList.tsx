import React from 'react';
import { Project } from '../types';
import { FolderOpen, Calendar, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface ProjectListProps {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
  onProjectDelete: () => void;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onProjectSelect,
  onProjectDelete
}) => {
  const handleDeleteProject = async (id: number) => {
    if (confirm('このプロジェクトを削除しますか？')) {
      try {
        await window.electronAPI.deleteProject(id);
        onProjectDelete();
      } catch (error) {
        console.error('プロジェクトの削除に失敗しました:', error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">プロジェクト一覧</h2>
        <p className="text-gray-600 mt-1">管理しているプロジェクトの一覧です</p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">プロジェクトがありません</h3>
          <p className="mt-1 text-sm text-gray-500">新しいプロジェクトを作成してください</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onProjectSelect(project)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="mr-1 h-4 w-4" />
                    {project.created_at && format(new Date(project.created_at), 'yyyy/MM/dd', { locale: ja })}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProject(project.id!);
                  }}
                  className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList; 