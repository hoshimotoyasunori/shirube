import * as sqlite3 from 'sqlite3';
import * as path from 'path';

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

export class Database {
  private db: sqlite3.Database;

  constructor() {
    const dbPath = path.join(process.env.APPDATA || '', 'shirube', 'database.sqlite');
    this.db = new sqlite3.Database(dbPath);
  }

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        // プロジェクトテーブル
        this.db.run(`
          CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);

        // タスクテーブル
        this.db.run(`
          CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT DEFAULT 'todo',
            priority TEXT DEFAULT 'medium',
            is_private BOOLEAN DEFAULT 0,
            assigned_to TEXT,
            due_date DATETIME,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
          )
        `);

        // インデックス作成
        this.db.run('CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id)');
        this.db.run('CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status)');
        this.db.run('CREATE INDEX IF NOT EXISTS idx_tasks_private ON tasks(is_private)');

        resolve();
      });
    });
  }

  async getProjects(): Promise<Project[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM projects ORDER BY created_at DESC', (err, rows) => {
        if (err) reject(err);
        else resolve(rows as Project[]);
      });
    });
  }

  async createProject(project: Project): Promise<Project> {
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO projects (name, description) VALUES (?, ?)',
        [project.name, project.description],
        function(err) {
          if (err) reject(err);
          else {
            project.id = this.lastID;
            resolve(project);
          }
        }
      );
    });
  }

  async updateProject(project: Project): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        'UPDATE projects SET name = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [project.name, project.description, project.id],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  async deleteProject(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM projects WHERE id = ?', [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  async getTasks(projectId?: number): Promise<Task[]> {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM tasks';
      let params: any[] = [];

      if (projectId) {
        query += ' WHERE project_id = ?';
        params.push(projectId);
      }

      query += ' ORDER BY created_at DESC';

      this.db.all(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows as Task[]);
      });
    });
  }

  async createTask(task: Task): Promise<Task> {
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO tasks (project_id, title, description, status, priority, is_private, assigned_to, due_date)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [task.project_id, task.title, task.description, task.status, task.priority, task.is_private, task.assigned_to, task.due_date],
        function(err) {
          if (err) reject(err);
          else {
            task.id = this.lastID;
            resolve(task);
          }
        }
      );
    });
  }

  async updateTask(task: Task): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(
        `UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, 
         is_private = ?, assigned_to = ?, due_date = ?, updated_at = CURRENT_TIMESTAMP 
         WHERE id = ?`,
        [task.title, task.description, task.status, task.priority, task.is_private, task.assigned_to, task.due_date, task.id],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  async deleteTask(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM tasks WHERE id = ?', [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
} 