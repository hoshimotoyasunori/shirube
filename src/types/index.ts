export interface Project {
  id?: number;
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export interface Task {
  id?: number;
  project_id: number;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  is_private: boolean;
  assigned_to?: string;
  due_date?: string;
  created_at?: string;
  updated_at?: string;
} 