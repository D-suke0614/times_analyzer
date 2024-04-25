# Time Analyzer

## 実装済みの機能

- チャンネル検索
  - キーワードを入力することで、検索可能
    - 現状初回にチャンネル情報を取得し、ローカルファイルに保持させておく仕様（デプロイ環境については現状未対応）
  - 検索結果はクリックもしくはキーボードで選択

- 分析
  - 選択したtimesチャンネルの過去6か月間のトーク数を取得し、1か月ごとに比較
    - 分析結果はグラフ表示される
    - 最大5チャンネル同時に分析可能

## Getting Started

<https://api.slack.com/apps> にアクセスしてSlackトークンを取得

Scopesで下記を設定

```txt
- channels:history
- groups:history
- im:history
- mpim:history
```

.envファイルの作成

```bash
TOKEN=取得したトークン
```

channel_info.jsonファイルの作成

```json
[]
```

アプリの起動

```bash
npm install
npm run dev
```
