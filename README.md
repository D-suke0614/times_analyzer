# Time Analyzer

## 実装済みの機能

- チャンネル検索
  - APIを叩く処理も実装してあるが、処理に時間がかかるためローカルでチャンネル情報を持っている
- 分析
  - 選択したtimesチャンネルの過去6か月間のトーク数を取得して、1か月ごとに比較
    - 最大5チャンネル同時に分析可能

## Getting Started

### envファイルの作成

<https://api.slack.com/apps> にアクセスしてトークンを取得

Scopesで下記を設定

- channels:history
- groups:history
- im:history
- mpim:history

```bash
#.env
SLACK_CONVERSATIONS_HISTORY_URL=https://slack.com/api/conversations.history
TOKEN=取得したトークン
```

```bash
npm install
npm run dev
```
