# AIRship

## 概要

#### 技術スタック

- [Next.js](https://nextjs.org/): `^13.x`
- [Ant Design](https://ant.design/)

#### ディレクトリ構造

```
./src
├── app     // Next.js 13 App Routeを使用
├── lib     // ライブラリのラップなど(ドメインの知識を持たない)
└── shared  // 共通のコード
    ├── components
    │   ├── common   // Ant Designコンポーネントのラップ
    │   └── features // ドメインの知識を持つコンポーネント
    ├── hooks
    ├── lib          // ライブラリのラップなど(ドメインの知識を持つ)
    │   ├── antd     // デザイントークンなど
    │   └── zod      // restapi共通hook
    └── types
```

## Getting started

#### パッケージインストール

`package.json`が更新されるたびに実行してください。

```
npm ci
```

#### OpenAPI

未実装です。
