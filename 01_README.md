# Shirube - プロジェクト管理アプリ

組織向けのプロジェクト管理・タスク管理・進捗管理デスクトップアプリケーションです。

## 機能

### プロジェクト管理
- プロジェクトの作成、編集、削除
- プロジェクト一覧の表示
- プロジェクト詳細情報の管理

### タスク管理
- タスクの作成、編集、削除
- タスクのステータス管理（未着手、進行中、完了）
- 優先度設定（低、中、高）
- 担当者の割り当て
- 期限設定

### 進捗管理
- タスクの進捗状況の可視化
- プロジェクト別のタスク一覧
- ステータス別のタスク管理

### プライベート機能
- プライベートタスクの作成（自分だけが見える）
- プライベートタスクの表示/非表示切り替え

## 今後の拡張予定・必須機能（組織・プロジェクト・タスク管理）

### 1. 組織・プロジェクト管理
- 組織（部署・チーム）単位でのプロジェクト作成・管理
- プロジェクトごとに「管理者」「メンバー」をアサインできる
- プロジェクトの参加・脱退申請、承認フロー
- プロジェクトごとの権限管理（管理者/一般/閲覧のみ等）

### 2. タスク割り当て・担当者管理
- プロジェクト内のタスクを「担当者（組織内ユーザー）」に割り当て
- 担当者は複数人設定可能（サブタスクや共同作業も想定）
- タスクの進捗・担当者変更履歴の記録

### 3. 外部サーバー連携・データ同期
- 「更新」ボタンで外部サーバーから最新のプロジェクト・タスク情報を取得
- 取得したデータはローカルDBに保存し、オフラインでも参照可能
- サーバー連携時の認証（例：メールアドレス＋パスワード、トークン等）
- サーバー側でのプロジェクト・タスク作成/編集/削除API

### 4. UI/UX
- プロジェクト・タスクの「更新」ボタンを明示的に配置
- 組織・プロジェクト・タスクの階層表示（WBS風）
- 担当者・プロジェクトごとのフィルタ・検索
- 通知・アラート（例：自分に新タスクが割り当てられた時など）

## 技術スタック

- **フロントエンド**: React + TypeScript
- **デスクトップ**: Electron
- **スタイリング**: Tailwind CSS
- **データベース**: SQLite
- **アイコン**: Lucide React
- **日付処理**: date-fns

## セットアップ

### 前提条件
- Node.js (v16以上)
- npm または yarn

### インストール

1. 依存関係のインストール
```bash
npm install
```

2. 開発サーバーの起動
```bash
npm run dev
```

3. 本番ビルド
```bash
npm run build
```

4. アプリケーションの配布用パッケージ作成
```bash
npm run dist
```

### 環境変数設定例（.env サンプル）

```env
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_KEY=your-service-role-key
PORT=3001
```

## 使用方法

### プロジェクトの作成
1. サイドバーの「プロジェクト作成」ボタンをクリック
2. プロジェクト名と説明を入力
3. 「作成」ボタンをクリック

### タスクの作成
1. サイドバーの「タスク作成」ボタンをクリック
2. プロジェクトを選択
3. タスク名、説明、ステータス、優先度を設定
4. 必要に応じて担当者、期限、プライベート設定を行う
5. 「作成」ボタンをクリック

### タスクの管理
- タスク一覧でステータスを変更可能
- プライベートタスクの表示/非表示切り替え
- タスクの削除機能

## データベース

アプリケーションのデータは以下の場所に保存されます：
- Windows: `%APPDATA%/shirube/database.sqlite`

## 開発

### プロジェクト構造
```
src/
├── main/           # Electron メインプロセス
│   ├── main.ts     # メインプロセスエントリーポイント
│   ├── preload.ts  # プリロードスクリプト
│   └── database.ts # データベース管理
├── components/     # React コンポーネント
│   ├── Sidebar.tsx
│   ├── ProjectList.tsx
│   ├── TaskList.tsx
│   ├── ProjectForm.tsx
│   └── TaskForm.tsx
├── types/          # 型定義
├── App.tsx         # メインアプリケーション
├── main.tsx        # React エントリーポイント
└── index.css       # スタイル
```

### スクリプト
- `npm run dev`: 開発サーバー起動
- `npm run build`: 本番ビルド
- `npm run dist`: 配布用パッケージ作成

## 🚀 開発状況

### 現在の進捗
- ✅ プロジェクト基盤構築完了
- ✅ 基本機能実装完了
- ✅ GitHubリポジトリ設定完了
- ✅ 共同開発環境構築完了
- ✅ Docker対応完了
- ✅ 情報共有仕組み構築完了

### 次のステップ
- 🔄 テスト実装
- 📋 本番ビルド確認

## 📚 ドキュメント

- [プロジェクト状況](./06_PROJECT_STATUS.md) - 詳細な進捗状況
- [共同開発ガイド](./03_COLLABORATION_GUIDE.md) - チーム開発のルール
- [フォルダ構成](./02_FOLDER_STRUCTURE.md) - プロジェクト構造の説明
- [Docker使用ガイド](./05_DOCKER.md) - Docker環境での開発

## 🐳 Docker対応

Dockerを使用した開発環境も提供しています：

```bash
# 開発環境の起動
docker-compose up dev

# 本番ビルド
docker-compose up build
```

詳細は [Docker使用ガイド](./05_DOCKER.md) を参照してください。

## 🏗️ 推奨開発フロー

### 1. Web画面（React部分）の開発・確認
- 全員がDockerで `docker-compose up -d` を実行し、
- ブラウザで [http://localhost:5173](http://localhost:5173) にアクセスしてUIを確認できます。
- DBもDockerで統一されているため、共同開発が容易です。

### 2. Electronデスクトップアプリとしての動作確認・本番ビルド
- Node.js（18系推奨）をローカルにインストールできるメンバーが、
  ```bash
  npm install
  npm run dev
  ```
  でElectronアプリを起動・確認します。
- 本番ビルド・配布は `npm run dist` で行います。
- ElectronのGUIをDockerで直接表示するのは困難なため、ローカルでの動作確認を推奨します。

### 3. 共同開発者がNode.jsをインストールできない場合
- Web画面の開発・確認はDockerだけで参加可能です。
- Electron部分の動作確認や本番ビルドは、Node.jsが使えるメンバーが担当します。

## ライセンス

MIT License

## 貢献

プルリクエストやイシューの報告を歓迎します。

詳細な貢献方法は [共同開発ガイド](./03_COLLABORATION_GUIDE.md) を参照してください。

## クラウドDB・API構成

- 本プロジェクトはSupabase（PostgreSQLベース）をクラウドDBとして採用しています。
- ElectronアプリはAPI経由でSupabaseと通信し、データの取得・更新・認証を行います。
- 認証・ストレージ・リアルタイム機能もSupabaseで一元管理。

### システム構成図


```mermaid
flowchart TD
  subgraph Client["Electronアプリ (Shirube)"]
    UI["UI (React)"]
    UI -->|"APIリクエスト (認証/データ操作)"| API["APIサーバー"]
  end
  API -->|"DBアクセス (REST/GraphQL)"| SUPABASE["Supabase (PostgreSQL/認証/ストレージ)"]
  API <--> SUPABASE
  UI -.->|"ローカルDB (SQLite, 開発時)"| LOCALDB["SQLite (開発用)"]
  style Client fill:#f9f,stroke:#333,stroke-width:2px
  style API fill:#bbf,stroke:#333,stroke-width:2px
  style SUPABASE fill:#bfb,stroke:#333,stroke-width:2px
  style LOCALDB fill:#eee,stroke:#333,stroke-width:1px
```

### データベース構成図

```mermaid
erDiagram
  ORGANIZATIONS {
    int id PK
    string name
    string description
    datetime created_at
    datetime updated_at
  }
  DEPARTMENTS {
    int id PK
    int organization_id FK
    string name
    string description
    datetime created_at
    datetime updated_at
  }
  USERS {
    int id PK
    int organization_id FK
    string name
    string email
    string global_role
    datetime created_at
    datetime updated_at
  }
  DEPARTMENT_MEMBERS {
    int id PK
    int department_id FK
    int user_id FK
    string role
    datetime joined_at
  }
  PROJECTS {
    int id PK
    int organization_id FK
    string name
    string description
    datetime created_at
    datetime updated_at
  }
  PROJECT_MEMBERS {
    int id PK
    int project_id FK
    int user_id FK
    string role
    datetime joined_at
  }
  TASKS {
    int id PK
    int project_id FK
    int department_id FK
    string title
    string description
    string status
    string priority
    string scope
    int created_by FK
    datetime due_date
    datetime created_at
    datetime updated_at
    int parent_task_id FK
    float progress
  }
  TASK_ASSIGNMENTS {
    int id PK
    int task_id FK
    int user_id FK
    datetime assigned_at
  }
  CHANGE_LOGS {
    int id PK
    string entity_type
    int entity_id
    string action
    int changed_by FK
    datetime changed_at
    string details
  }
  
  ORGANIZATIONS ||--o{ DEPARTMENTS : "has"
  ORGANIZATIONS ||--o{ USERS : "has"
  ORGANIZATIONS ||--o{ PROJECTS : "has"
  DEPARTMENTS ||--o{ DEPARTMENT_MEMBERS : "has"
  USERS ||--o{ DEPARTMENT_MEMBERS : "is"
  PROJECTS ||--o{ PROJECT_MEMBERS : "has"
  USERS ||--o{ PROJECT_MEMBERS : "is"
  PROJECTS ||--o{ TASKS : "has"
  DEPARTMENTS ||--o{ TASKS : "has (部署タスク)"
  TASKS ||--o{ TASK_ASSIGNMENTS : "has"
  USERS ||--o{ TASK_ASSIGNMENTS : "is assigned to"
  TASKS ||--o| TASKS : "parent"
  USERS ||--o{ CHANGE_LOGS : "changes"
  PROJECTS ||--o{ CHANGE_LOGS : "changes (project)"
  TASKS ||--o{ CHANGE_LOGS : "changes (task)"
  ORGANIZATIONS ||--o{ CHANGE_LOGS : "changes (org)"
  DEPARTMENTS ||--o{ CHANGE_LOGS : "changes (dept)"
```

**最終更新**: 2025-07-04 08:14:31  
**更新者**: hoshimotoyasunori