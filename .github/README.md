# AIRship

## 概要

#### 技術スタック

- [Next.js](https://nextjs.org/): `^13.x`
- [Ant Design](https://ant.design/)

#### ディレクトリ構造

```
./src
├── app     // Next.js 13 App Routeを使用
├── lib     // ライブラリのラップなど
└── shared  // 共通のコード
    ├── component
    │   ├── common   // Ant DesignのData Entry, Layout以外
    │   ├── forms    // Ant DesignのData Entry
    │   ├── guards   // 認証が必要なページで使用
    │   └── layouts  // Ant DesignのLayout
    ├── hooks
    │   ├── auth     // 認証に関する共通hook
    │   └── restapi  // restapi共通hook
    ├── schemas      // zodのスキーマ定義など
    └── types        // 共通の型
```

## Getting started

#### パッケージインストール

`package.json`が更新されるたびに実行してください。

```
npm ci
```

#### OpenAPI

未実装です。
