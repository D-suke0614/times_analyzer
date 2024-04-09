# Time Analyzer

## 実装済みの機能

- チャンネル検索
  - APIを叩く処理も実装してあるが、処理に時間がかかるためローカルでチャンネル情報を持っている
- 分析
  - 選択したチャンネルの過去6か月間のトーク数を取得して、1か月ごとに比較
    - シングルセレクトのみでマルチセレクトは現状未対応

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
