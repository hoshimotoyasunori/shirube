# Docker 使用ガイド - Shirube

## 概要

Shirubeプロジェクトでは、Dockerを使用して開発環境とビルド環境を統一できます。

## 前提条件

- Docker Desktop がインストールされている
- Docker Compose が利用可能

## 使用方法

### 開発環境の起動

```bash
# 開発環境を起動
npm run docker:dev

# または直接実行
docker-compose up shirube-dev
```

### ビルド環境でのビルド

```bash
# ビルドを実行
npm run docker:build

# または直接実行
docker-compose up shirube-build
```

### コンテナの停止

```bash
# すべてのコンテナを停止
npm run docker:down

# または直接実行
docker-compose down
```

### クリーンアップ

```bash
# コンテナ、ボリューム、イメージを削除
npm run docker:clean

# または直接実行
docker-compose down -v --rmi all
```

## サービス構成

### shirube-dev
- **用途**: 開発環境
- **ポート**: 5173
- **特徴**: ホットリロード対応、ソースコードの変更が即座に反映

### shirube-build
- **用途**: 本番ビルド
- **特徴**: マルチステージビルドで最適化されたイメージを生成

### shirube-db
- **用途**: PostgreSQLデータベース（開発用）
- **ポート**: 5432
- **データ**: 永続化ボリュームで保存

## 開発ワークフロー

### 1. 初回セットアップ

```bash
# 開発環境を起動
npm run docker:dev
```

### 2. 開発作業

- ソースコードを編集
- ブラウザで http://localhost:5173 にアクセス
- 変更が自動的に反映される

### 3. ビルド

```bash
# 本番用ビルド
npm run docker:build
```

### 4. クリーンアップ

```bash
# 開発終了時
npm run docker:down
```

## トラブルシューティング

### ポートが使用中の場合

```bash
# 使用中のポートを確認
netstat -ano | findstr :5173

# 別のポートを使用
docker-compose up -p 5174:5173 shirube-dev
```

### ボリュームの問題

```bash
# ボリュームを削除して再作成
docker-compose down -v
docker-compose up shirube-dev
```

### イメージの再ビルド

```bash
# イメージを強制的に再ビルド
docker-compose build --no-cache shirube-dev
```

## 注意事項

- ElectronアプリケーションはGUIが必要なため、Docker内での実行は開発・ビルド用途に限定
- 本番環境では、ビルドされたアプリケーションを直接実行
- データベースは開発用のPostgreSQLを提供（本番ではSQLiteを使用）

## 環境変数

### 開発環境
- `NODE_ENV=development`
- `VITE_DEV_SERVER_URL=http://localhost:5173`

### 本番環境
- `NODE_ENV=production`

## カスタマイズ

### ポート変更
`docker-compose.yml`の`ports`セクションを編集：

```yaml
ports:
  - "8080:5173"  # ホストの8080ポートにマッピング
```

### 環境変数の追加
`docker-compose.yml`の`environment`セクションに追加：

```yaml
environment:
  - NODE_ENV=development
  - CUSTOM_VAR=value
```

詳細は [フォルダ構成](./02_FOLDER_STRUCTURE.md) を参照してください。 