# フォルダ構成 - Shirube

## 📁 ルートディレクトリ

```
Shirube/
├── 📁 .git/                    # Gitリポジトリ
├── 📁 .github/                 # GitHub設定
│   ├── 📁 ISSUE_TEMPLATE/      # Issueテンプレート
│   └── 📄 pull_request_template.md
├── 📁 src/                     # ソースコード
│   ├── 📁 components/          # Reactコンポーネント
│   ├── 📁 main/               # Electronメインプロセス
│   ├── 📁 types/             # 型定義（index.tsなどで分割管理）
│   ├── 📄 App.tsx             # メインアプリケーション
│   ├── 📄 main.tsx            # Reactエントリーポイント
│   └── 📄 index.css           # スタイル
├── 📄 .dockerignore           # Docker除外ファイル
├── 📄 .eslintrc.js            # ESLint設定
├── 📄 .gitignore              # Git除外ファイル
├── 📄 .prettierrc             # Prettier設定
├── 📄 04_CONTRIBUTING.md         # コントリビューションガイド
├── 📄 07_DEVELOPMENT_STATUS.md   # 開発状況レポート
├── 📄 05_DOCKER.md               # Docker使用ガイド
├── 📄 Dockerfile.build        # ビルド用Dockerfile
├── 📄 Dockerfile.dev          # 開発用Dockerfile
├── 📄 02_FOLDER_STRUCTURE.md     # このファイル
├── 📄 06_PROJECT_STATUS.md       # プロジェクト状況管理
├── 📄 01_README.md               # プロジェクト概要
├── 📄 docker-compose.yml      # Docker Compose設定
├── 📄 index.html              # HTMLエントリーポイント
├── 📄 package.json            # プロジェクト設定
├── 📄 postcss.config.js       # PostCSS設定
├── 📄 tailwind.config.js      # Tailwind CSS設定
├── 📄 tsconfig.json           # TypeScript設定
├── 📄 tsconfig.main.json      # Electron用TypeScript設定
├── 📄 tsconfig.node.json      # Node.js用TypeScript設定
└── 📄 vite.config.ts          # Vite設定
```

## 📁 詳細説明

### 📁 .github/
GitHubの設定ファイル群

```
.github/
├── 📁 ISSUE_TEMPLATE/         # Issue作成時のテンプレート
│   ├── 📄 bug_report.md       # バグ報告テンプレート
│   └── 📄 feature_request.md  # 機能要求テンプレート
└── 📄 pull_request_template.md # プルリクエストテンプレート
```

### 📁 src/
アプリケーションのソースコード

```
src/
├── 📁 components/             # Reactコンポーネント
│   ├── 📄 ProjectForm.tsx     # プロジェクト作成フォーム
│   ├── 📄 ProjectList.tsx     # プロジェクト一覧
│   ├── 📄 Sidebar.tsx         # サイドバーナビゲーション
│   ├── 📄 TaskForm.tsx        # タスク作成フォーム
│   └── 📄 TaskList.tsx        # タスク一覧
├── 📁 main/                   # Electronメインプロセス
│   ├── 📄 database.ts         # データベース管理
│   ├── 📄 main.ts             # メインプロセスエントリーポイント
│   └── 📄 preload.ts          # プリロードスクリプト
├── 📄 App.tsx                 # メインアプリケーションコンポーネント
├── 📄 main.tsx                # Reactアプリケーションエントリーポイント
├── 📁 types/                 # 型定義（index.tsなどで分割管理）
└── 📄 index.css               # グローバルスタイル
```

## 📄 設定ファイル

### ビルド・開発設定
- **package.json**: プロジェクト設定、依存関係、スクリプト
- **vite.config.ts**: Viteビルドツール設定
- **tsconfig.json**: TypeScript設定
- **tsconfig.main.json**: Electron用TypeScript設定
- **tsconfig.node.json**: Node.js用TypeScript設定

### スタイリング設定
- **tailwind.config.js**: Tailwind CSS設定
- **postcss.config.js**: PostCSS設定
- **index.css**: グローバルスタイル

### コード品質設定
- **.eslintrc.js**: ESLint設定（コード品質チェック）
- **.prettierrc**: Prettier設定（コードフォーマット）
- **.gitignore**: Git除外ファイル設定

### Docker設定
- **Dockerfile.dev**: 開発環境用Dockerfile
- **Dockerfile.build**: ビルド環境用Dockerfile
- **docker-compose.yml**: Docker Compose設定
- **.dockerignore**: Docker除外ファイル設定

### ドキュメント
- **01_README.md**: プロジェクト概要・セットアップ手順
- **04_CONTRIBUTING.md**: 共同開発ガイドライン
- **07_DEVELOPMENT_STATUS.md**: 開発状況レポート
- **06_PROJECT_STATUS.md**: プロジェクト状況管理
- **05_DOCKER.md**: Docker使用ガイド
- **02_FOLDER_STRUCTURE.md**: このファイル

## 🔧 開発時の注意点

### ファイル追加時のルール
1. **コンポーネント**: `src/components/` に配置
2. **型定義**: `src/types/` に追加、または専用ファイルを作成
3. **ユーティリティ**: `src/utils/` を作成して配置
4. **フック**: `src/hooks/` を作成して配置
5. **定数**: `src/constants/` を作成して配置

### 命名規則
- **ファイル名**: PascalCase (コンポーネント), camelCase (その他)
- **フォルダ名**: camelCase
- **コンポーネント**: PascalCase
- **関数・変数**: camelCase
- **定数**: UPPER_SNAKE_CASE

### インポート順序
1. React関連
2. 外部ライブラリ
3. 内部コンポーネント
4. 型定義
5. ユーティリティ
6. スタイル

## 📋 今後の拡張予定

### 追加予定のフォルダ
```
src/
├── 📁 hooks/                  # カスタムフック
├── 📁 utils/                  # ユーティリティ関数
├── 📁 constants/              # 定数定義
├── 📁 services/               # APIサービス
├── 📁 store/                  # 状態管理
└── 📁 tests/                  # テストファイル
```

### 追加予定の設定ファイル
- **jest.config.js**: テスト設定
- **cypress.config.js**: E2Eテスト設定
- **.env.example**: 環境変数テンプレート
- **CHANGELOG.md**: 変更履歴

---

**最終更新**: 2025-07-03 11:56:35  
**更新者**: hoshimotoyasunori 