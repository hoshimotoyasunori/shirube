# コントリビューションガイド - Shirube

## 開発フロー

### ブランチ戦略
- `main`: 本番環境用の安定ブランチ
- `develop`: 開発用の統合ブランチ
- `feature/*`: 新機能開発用ブランチ
- `bugfix/*`: バグ修正用ブランチ
- `hotfix/*`: 緊急修正用ブランチ

### 開発手順

#### 1. 新機能開発
```bash
# developブランチから開始
git checkout develop
git pull origin develop

# 機能ブランチを作成
git checkout -b feature/新機能名

# 開発・コミット
git add .
git commit -m "feat: 新機能の説明"

# developブランチにマージ
git checkout develop
git merge feature/新機能名
git push origin develop
```

#### 2. バグ修正
```bash
# developブランチから開始
git checkout develop
git pull origin develop

# 修正ブランチを作成
git checkout -b bugfix/修正内容

# 修正・コミット
git add .
git commit -m "fix: 修正内容の説明"

# developブランチにマージ
git checkout develop
git merge bugfix/修正内容
git push origin develop
```

#### 3. リリース準備
```bash
# developブランチの内容をmainブランチにマージ
git checkout main
git merge develop
git tag v1.0.0
git push origin main --tags
```

## コミットメッセージ規約

### 形式
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント更新
- `style`: コードスタイル修正
- `refactor`: リファクタリング
- `test`: テスト追加・修正
- `chore`: その他の変更

### 例
```
feat(project): プロジェクト編集機能を追加

- プロジェクト名の編集機能
- プロジェクト説明の編集機能
- バリデーション機能

Closes #123
```

## コードレビュー

### プルリクエスト作成前のチェックリスト
- [ ] コードがプロジェクトのコーディング規約に従っている
- [ ] 必要なテストが追加されている
- [ ] ドキュメントが更新されている
- [ ] コミットメッセージが規約に従っている

### レビュー依頼
1. GitHubでプルリクエストを作成
2. タイトル: `[Type] 変更内容の概要`
3. 説明: 変更内容の詳細、テスト方法、関連するIssue番号
4. レビュアーを指定

## 開発環境セットアップ

### 前提条件
- Node.js 16以上
- Git
- 推奨: VS Code

### セットアップ手順
```bash
# リポジトリをクローン
git clone https://github.com/YOUR_USERNAME/shirube.git
cd shirube

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

## コーディング規約

### TypeScript
- 厳密な型チェックを有効にする
- インターフェースは `I` プレフィックスを付けない
- 関数は可能な限り純粋関数にする

### React
- 関数コンポーネントを使用
- Propsの型定義を必ず行う
- カスタムフックは `use` プレフィックスを付ける

### CSS
- Tailwind CSSクラスを優先使用
- カスタムCSSは最小限に留める
- レスポンシブデザインを考慮

## Issue管理

### Issue作成時のテンプレート
```markdown
## 概要
[変更内容の概要]

## 詳細
[詳細な説明]

## 期待される動作
[期待される動作]

## 再現手順
1. [手順1]
2. [手順2]
3. [手順3]

## 環境
- OS: [OS名]
- Node.js: [バージョン]
- ブラウザ: [ブラウザ名]

## その他
[その他の情報]
```

## リリースプロセス

### バージョニング
- セマンティックバージョニング (MAJOR.MINOR.PATCH)
- `package.json` のバージョンを更新
- リリースノートを作成

### リリース手順
1. `develop` ブランチの内容を `main` にマージ
2. タグを作成: `git tag v1.0.0`
3. GitHubでリリースを作成
4. リリースノートを記載

## トラブルシューティング

### よくある問題
1. **依存関係のエラー**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **TypeScriptエラー**
   ```bash
   npm run build
   ```

3. **Electronビルドエラー**
   ```bash
   npm run build:main
   ```

## 連絡先
- プロジェクト管理者: [連絡先情報]
- 技術的な質問: GitHub Issues
- 緊急時: [緊急連絡先] 

型定義は src/types/ ディレクトリ配下にまとめて記述してください。 