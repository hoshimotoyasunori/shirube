import React, { useState } from 'react';
import { Task, Project } from '../types';
import { CheckSquare, Clock, User, Eye, EyeOff, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface TaskListProps {
  tasks: Task[];
  selectedProject: Project | null;
  onTaskUpdate: () => void;
  onTaskDelete: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  selectedProject,
  onTaskUpdate,
  onTaskDelete
}) => {
  const [showPrivateTasks, setShowPrivateTasks] = useState(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'done': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = async (task: Task, newStatus: Task['status']) => {
    try {
      await window.electronAPI.updateTask({ ...task, status: newStatus });
      onTaskUpdate();
    } catch (error) {
      console.error('タスクの更新に失敗しました:', error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (confirm('このタスクを削除しますか？')) {
      try {
        await window.electronAPI.deleteTask(id);
        onTaskDelete();
      } catch (error) {
        console.error('タスクの削除に失敗しました:', error);
      }
    }
  };

  const filteredTasks = showPrivateTasks 
    ? tasks 
    : tasks.filter(task => !task.is_private);

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">タスク一覧</h2>
            {selectedProject && (
              <p className="text-gray-600 mt-1">
                プロジェクト: {selectedProject.name}
              </p>
            )}
          </div>
          <button
            onClick={() => setShowPrivateTasks(!showPrivateTasks)}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            {showPrivateTasks ? (
              <>
                <EyeOff className="mr-2 h-4 w-4" />
                プライベート非表示
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                プライベート表示
              </>
            )}
          </button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <CheckSquare className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">タスクがありません</h3>
          <p className="mt-1 text-sm text-gray-500">新しいタスクを作成してください</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {task.title}
                    </h3>
                    {task.is_private && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        プライベート
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">
                    {task.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status === 'todo' && '未着手'}
                      {task.status === 'in_progress' && '進行中'}
                      {task.status === 'done' && '完了'}
                    </span>

                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority === 'low' && '低'}
                      {task.priority === 'medium' && '中'}
                      {task.priority === 'high' && '高'}
                    </span>

                    {task.assigned_to && (
                      <div className="flex items-center text-gray-500">
                        <User className="mr-1 h-4 w-4" />
                        {task.assigned_to}
                      </div>
                    )}

                    {task.due_date && (
                      <div className="flex items-center text-gray-500">
                        <Clock className="mr-1 h-4 w-4" />
                        {format(new Date(task.due_date), 'yyyy/MM/dd', { locale: ja })}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task, e.target.value as Task['status'])}
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="todo">未着手</option>
                    <option value="in_progress">進行中</option>
                    <option value="done">完了</option>
                  </select>

                  <button
                    onClick={() => handleDeleteTask(task.id!)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList; 