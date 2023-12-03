# AIRship

## 概要

#### 技術スタック

- [Next.js](https://nextjs.org/): `^13.x`
- [Mantine](https://mantine.dev/)
- [aspida](https://github.com/aspida/aspida)

#### ディレクトリ構造

```
./src
├── app     // Next.js 13 App Routeを使用
└── shared  // 共通のコード
    ├── components
    │   ├── common   // Mantineコンポーネントのラップ
    │   └── features // ドメインの知識を持つコンポーネント
    ├── hooks
    ├── lib          // ライブラリのラップなど
    │   └── mantine// 共通のデザイントークン
    └── types
```

## Getting started

#### パッケージインストール

`package.json`が更新されるたびに実行してください。

```
npm ci && npm run prepare && npm run apigen && npm run dev
```

#### OpenAPI

次のコードでOpenAPIの型を自動生成することができます。

```
npm run apigen
```

`swagger.yaml`について生成に失敗した場合は`aspida.config.js`の`inputFile`をバックエンドリポジトリの`/docs/swagger.yaml`の直近のコミットへ書き換えてください。

(例) `https://github.com/Misoten-B/airship-backend/blob/<コミットID>/docs/swagger.yaml`
