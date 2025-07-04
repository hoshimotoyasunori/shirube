# 開発状況レポート - Shirube

## プロジェクト概要
**Shirube** - 組織向けプロジェクト管理・タスク管理・進捗管理デスクトップアプリケーション

## 開発日時
- 開始日: 2024年12月19日
- 現在の状況: 初期開発完了

## 実装済み機能

### ✅ 完了済み

#### 1. プロジェクト基盤
- [x] Electron + React + TypeScript プロジェクト構成
- [x] Vite による開発環境構築
- [x] Tailwind CSS によるスタイリング
- [x] SQLite データベース統合

#### 2. データベース設計
- [x] プロジェクトテーブル設計
- [x] タスクテーブル設計
- [x] 外部キー制約設定
- [x] インデックス作成

#### 3. バックエンド機能
- [x] SQLite データベース管理クラス
- [x] プロジェクト CRUD 操作
- [x] タスク CRUD 操作
- [x] IPC 通信設定

#### 4. フロントエンド機能
- [x] メインアプリケーション構造
- [x] サイドバーナビゲーション
- [x] プロジェクト一覧表示
- [x] タスク一覧表示
- [x] プロジェクト作成フォーム
- [x] タスク作成フォーム

#### 5. UI/UX 機能
- [x] レスポンシブデザイン
- [x] モーダルフォーム
- [x] ステータス管理（未着手、進行中、完了）
- [x] 優先度設定（低、中、高）
- [x] プライベートタスク機能
- [x] 日付表示（日本語対応）

## 技術仕様

### 使用技術
- **フロントエンド**: React 18 + TypeScript
- **デスクトップ**: Electron 25
- **ビルドツール**: Vite 4
- **スタイリング**: Tailwind CSS 3
- **データベース**: SQLite 3
- **アイコン**: Lucide React
- **日付処理**: date-fns

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
├── types.ts        # 型定義
├── App.tsx         # メインアプリケーション
├── main.tsx        # React エントリーポイント
└── index.css       # スタイル
```

### データベーススキーマ

#### projects テーブル
```sql
CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### tasks テーブル
```sql
CREATE TABLE tasks (
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
);
```

## 現在の課題

### ✅ 解決済み
1. **Node.js環境のセットアップ**
   - 開発環境にNode.jsがインストール済み
   - npmコマンドが利用可能

### 🟡 改善予定
1. **テストの追加**
   - ユニットテスト
   - 統合テスト
   - E2Eテスト

1. **エラーハンドリングの強化**
   - データベース操作のエラー処理
   - ネットワークエラーの処理

2. **パフォーマンス最適化**
   - 大量データの処理
   - メモリ使用量の最適化

3. **UI/UX改善**
   - ダークモード対応
   - キーボードショートカット
   - ドラッグ&ドロップ機能

## 次のステップ

### 短期目標（1-2週間）
1. **テスト実装**
   - Jest + React Testing Libraryの導入
   - ユニットテストの作成
   - 統合テストの作成

2. **本番ビルド確認**
   - Electronアプリの本番ビルド
   - 配布用パッケージの作成
   - 動作確認

### 中期目標（1ヶ月）
1. **機能拡張**
   - プロジェクト編集機能
   - タスク編集機能
   - 検索・フィルタリング機能

2. **パフォーマンス最適化**
   - データベースクエリの最適化
   - メモリ使用量の削減
   - 起動時間の短縮

### 長期目標（3ヶ月）
1. **高度な機能**
   - チーム管理機能
   - ファイル添付機能
   - 通知機能
   - レポート・分析機能

2. **配布・運用**
   - 自動更新機能
   - バックアップ機能
   - クラウド同期機能

## 開発メモ

### 設計上の決定事項
- **プライベートタスク**: `is_private` フラグで管理
- **データベース**: SQLiteを使用（ローカル保存）
- **UI**: Tailwind CSSでモダンなデザイン
- **状態管理**: React Hooksでシンプルに管理
- **共同開発**: GitHub + Docker環境

### 技術的考慮事項
- **セキュリティ**: contextIsolationを有効化
- **パフォーマンス**: インデックスを適切に設定
- **保守性**: TypeScriptで型安全性を確保
- **共同開発**: 情報共有ドキュメントの整備

## ファイル一覧

### 設定ファイル
- `package.json` - プロジェクト設定・依存関係
- `tsconfig.json` - TypeScript設定
- `vite.config.ts` - Vite設定
- `tailwind.config.js` - Tailwind CSS設定
- `postcss.config.js` - PostCSS設定

### ソースコード
- `src/main/main.ts` - Electronメインプロセス
- `src/main/preload.ts` - プリロードスクリプト
- `src/main/database.ts` - データベース管理
- `src/App.tsx` - メインアプリケーション
- `src/components/` - Reactコンポーネント群

### ドキュメント
- `01_README.md` - プロジェクト概要・セットアップ手順
- `06_PROJECT_STATUS.md` - プロジェクト状況
- `03_COLLABORATION_GUIDE.md` - 共同開発ガイド
- `02_FOLDER_STRUCTURE.md` - フォルダ構成説明
- `05_DOCKER.md` - Docker使用ガイド
- `07_DEVELOPMENT_STATUS.md` - 開発状況レポート（このファイル）

## 開発者情報
- **プロジェクト名**: Shirube
- **バージョン**: 1.0.0
- **ライセンス**: MIT
- **開発言語**: TypeScript/JavaScript
- **プラットフォーム**: Electron (Windows, macOS, Linux)

型定義は src/types/ ディレクトリ配下にまとめて記述してください。 

## 2024-06-13
- プロジェクト作成時に複数ユーザーをメンバーとしてアサインできる機能を追加
- Project型にmemberUserIdsを追加し、DB側でproject_membersテーブルへも自動登録されるように実装
- 組織・ユーザー管理画面で新規作成フォームからDB登録・一覧表示が可能に

## 2024-06-13（続き）
- タスク作成時に複数ユーザーを担当者としてアサインできる機能を追加
- Task型にassignedUserIdsを追加し、DB側でtask_assignmentsテーブルへも自動登録されるように実装 

## クラウドDB・API構成への移行

- 2024-xx-xx: Supabase（PostgreSQLベース）をクラウドDBとして採用。
- ElectronアプリはAPI経由でSupabaseと通信し、データ管理・認証を行う構成に移行。
- システム構成図・DB構成図を参照。

### システム構成図

![システム構成図](./docs/system_architecture.png)

### データベース構成図

![DB構成図](./docs/db_schema.png) 